import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { getAccomodations } from "utils/fetchers";

dotenv.config();

const PORT = process.env.PORT || 3001;
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/accomodations", async (req, res) => {
  const search = typeof req.query.search === "string" ? req.query.search : "";

  const data = await getAccomodations(search);

  res.send(data);
});

app.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`);
});
