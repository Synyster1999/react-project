const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const {
  processFiles,
  getPaginatedData,
  getTotalDocumentsCount,
} = require("./node.js");

const app = express();
const mongoURI = "mongodb://localhost:27017";
const dbName = "desadv";

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(cors());

async function initializeMongoDB() {
  const client = new MongoClient(mongoURI, { useUnifiedTopology: true });
  try {
    await client.connect();
    return client.db(dbName);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
}

app.get("/api/desadv-data", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  try {
    const db = await initializeMongoDB();

    const data = await getPaginatedData(db, page);

    res.json(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

app.get("/api/pages", async (req, res) => {
  try {
    const db = await initializeMongoDB();
    const totalDocuments = await getTotalDocumentsCount(db);
    const pageSize = 8;
    const totalPages = Math.ceil(totalDocuments / pageSize);

    res.json({ totalPages });
  } catch (err) {
    console.error("Error fetching page count:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching page count" });
  }
});
app.get("/api/desadv-data/:id", async (req, res) => {
  const documentId = req.params.id;
  try {
    const db = await initializeMongoDB();
    const collection = db.collection("data");

    const document = await collection.findOne({
      _id: new ObjectId(documentId),
    });
    if (document) {
      res.send(document);
    } else {
      res.status(404).json({ error: "Document not found" });
    }
  } catch (err) {
    console.error("Error fetching document:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching document" });
  }
});

// Start the server and initiate the data processing
const port = 3000; // You can use any available port
app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await processFiles(); // Start the data processing
});
