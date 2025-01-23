import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
  getAccomodations,
  getCityById,
  getCountryById,
  getHotelById,
} from "utils/fetchers";

dotenv.config();

const PORT = process.env.PORT || 3001;
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/accomodations", async (req, res) => {
  const search = typeof req.query.search === "string" ? req.query.search : "";
  if (search.length < 3) {
    return;
  }

  const data = await getAccomodations(search);

  res.send(data);
});

app.get("/country/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send("Invalid ID");
    return;
  }

  const data = await getCountryById(id);

  res.send(data);
});

app.get("/city/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send("Invalid ID");
    return;
  }

  const data = await getCityById(id);

  res.send(data);
});

app.get("/hotel/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send("Invalid ID");
    return;
  }

  const data = await getHotelById(id);

  res.send(data);
});

app.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`);
});
