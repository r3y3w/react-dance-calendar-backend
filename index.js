/** Import libraries express, cors, mongodb, dotenv **/
import express from "express";
import cors from "cors";
import { Compressor, MongoClient, ObjectId } from "mongodb";
import "dotenv/config";

/** Set up URI **/
const URI = process.env.MONGO_URI;
const client = new MongoClient(URI);
const database = client.db("where2dancedb");
const venuecollection = database.collection("venuecollection");
client.connect();
console.log("Mongo connected");

/** Set up PORT  **/
const PORT = process.env.PORT;

/** Set up app.use cors || express || app.listen   **/
const app = express();
app.use(cors());
app.use(express.json());
app.listen(PORT, () => console.log(" API listening on port: 4040"));

//Test app.get
// app.get('/', (req, res) => res.json('Hello from my API 👍 !!'))

//GET (GET)
app.get("/", async (req, res) => {
  const allVenues = await venuecollection.find().toArray();
  // console.log(allVenues)
  res.send(allVenues);
});

//POST route(ADD)

app.post("/add", async (req, res) => {
  await venuecollection.insertOne(req.body);
  res.send("Item was added to MongoDB");
});

//DELETE route (DELETE)

app.delete("/delete", async (req, res) => {
  const id = new ObjectId(req.query._id)
  await venuecollection.findOneAndDelete({ _id: id });
  res.json("Item was deleted")
});

//PUT route (Update)
app.put("/update", async (req, res) => {
  await venuecollection.findOneAndUpdate(req.query, { $set: req.body });
  res.json("Event Was Updated");
  // console.log(req.query)
  // console.log(req.body)
});
