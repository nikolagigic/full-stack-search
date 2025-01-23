import { MongoClient as BaseMongoClient, Document, WithId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

export class MongoClientSingleton {
  private static instance: BaseMongoClient;
  private static cache: Map<string, any> = new Map(); // In-memory cache

  private constructor() {}

  public static async getInstance(): Promise<BaseMongoClient> {
    if (!MongoClientSingleton.instance) {
      if (!process.env.DATABASE_URL) {
        await import("../db/startAndSeedMemoryDB");
      }

      MongoClientSingleton.instance = await MongoClientSingleton.connect();
    }

    return MongoClientSingleton.instance;
  }

  private static async connect(): Promise<BaseMongoClient> {
    try {
      MongoClientSingleton.instance = new BaseMongoClient(
        process.env.DATABASE_URL!
      );

      const client = await MongoClientSingleton.instance.connect();
      console.log("Successfully connected to MongoDB!");

      return client;
    } catch (error) {
      console.error("Failed to connect to MongoDB", error);
      throw error;
    }
  }

  public static async close(): Promise<void> {
    if (MongoClientSingleton.instance) {
      await MongoClientSingleton.instance.close();
      console.log("MongoDB connection closed.");
    }
  }

  /**
   * Perform a cached query on a MongoDB collection.
   * @param collectionName Name of the MongoDB collection.
   * @param query Query object to execute.
   * @param options Query options (optional).
   * @param cacheKey Unique key for caching the result.
   * @param ttl Cache time-to-live in milliseconds (optional).
   */
  public static async cachedQuery<T extends Document>(
    collectionName: string,
    query: Record<string, any>,
    options: Record<string, any> = {},
    cacheKey: string,
    ttl?: number
  ): Promise<WithId<T>[]> {
    const cachedResult = MongoClientSingleton.cache.get(cacheKey);
    if (cachedResult) {
      console.log(`Cache hit for key: ${cacheKey}`);
      return cachedResult.result;
    }

    console.log(`Cache miss for key: ${cacheKey}`);
    const client = await MongoClientSingleton.getInstance();
    const db = client.db();
    const collection = db.collection<T>(collectionName);
    const result = await collection.find(query, options).toArray();

    MongoClientSingleton.cache.set(cacheKey, {
      result,
      expiry: ttl ? Date.now() + ttl : null,
    });

    MongoClientSingleton.cleanupCache();

    return result;
  }

  /**
   * Removes expired items from the cache.
   */
  private static cleanupCache(): void {
    const now = Date.now();
    MongoClientSingleton.cache.forEach((value, key) => {
      if (value.expiry && value.expiry < now) {
        MongoClientSingleton.cache.delete(key);
        console.log(`Cache expired for key: ${key}`);
      }
    });
  }
}

const mongoClient = await MongoClientSingleton.getInstance();

process.on("SIGINT", async () => {
  await MongoClientSingleton.close();
  process.exit(0);
});

export default mongoClient;
