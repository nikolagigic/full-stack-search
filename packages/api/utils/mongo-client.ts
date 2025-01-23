import { MongoClient as BaseMongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

class MongoClientSingleton {
  private static instance: BaseMongoClient;

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
}

const mongoClient = await MongoClientSingleton.getInstance();

process.on("SIGINT", async () => {
  await MongoClientSingleton.close();
  process.exit(0);
});

export default mongoClient;
