import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoClient from "utils/mongo-client";

dotenv.config();

const PORT = process.env.PORT || 3001;
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/hotels", async (req, res) => {
  const db = mongoClient.db();
  const collection = db.collection("hotels");
  res.send(await collection.find().toArray());
});

app.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`);
});
