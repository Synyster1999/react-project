const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const iconv = require("iconv-lite");
const { MongoClient } = require("mongodb");

const directoryPath = path.join(__dirname, "DATA");

const app = express();

app.use(cors());

const countFilesInDirectory = () => {
  try {
    const files = fs.readdirSync(directoryPath);
    return files.length;
  } catch (error) {
    console.error("Error reading directory:", error);
    return -1;
  }
};

// Function to insert data into MongoDB
async function insertDataIntoMongoDB() {
  const mongoUri = "mongodb://localhost:27017"; // Replace with your MongoDB connection string
  const databaseName = "desadv";
  const collectionName = "data";

  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);

    const files = fs.readdirSync(directoryPath);
    const dataToInsert = [];

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);

      const fileContentBuffer = fs.readFileSync(filePath, "utf-8");

      fileContentBuffer.forEach((line) => {
        if (line.trim() !== "") {
          const data = line.split("|");
          if (data.length > 0) {
            const keyNames = [
              "material",
              "quantity",
              "delivery_id",
              "document_id",
              "tracking_number",
              "hwb",
              "contract_number",
              "ponr_line",
              "sonr",
              "invoice_number",
              "despatch_date",
              "arrival_date",
              "inco_term",
              "da_packages",
              "pack_list_nr",
              "transport_mode",
              "carrier",
              "van_id",
              "interchange_control_reference",
              "message_date",
              "lig1",
              "ctr1",
              "fv1",
              "lig2",
              "ctr2",
              "fv2",
              "lig3",
              "ctr3",
              "fv3",
              "supplier_material",
              "weight",
              "key",
              "line",
            ];

            const obj = Object.fromEntries(
              keyNames.map((key, i) => [key, data[i]])
            );

            dataToInsert.push(obj);
          }
        }
      });
    });

    await collection.insertMany(dataToInsert);
    console.log("Data successfully inserted into MongoDB!");
  } catch (error) {
    console.error("Error inserting data into MongoDB:", error);
    throw error;
  } finally {
    client.close();
  }
}

app.get("/", (req, res) => {
  res.send("Welcome to the root path!");
});

app.get("/api/desadv-data", async (req, res) => {
  try {
    const results = await fetchDataFromMongoDB(req);

    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    const startIndex = (page - 1) * limit;

    res.setHeader("Content-Type", "application/json");
    res.json(results.slice(startIndex, startIndex + limit));
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/files", async (req, res) => {
  const fileCount = countFilesInDirectory();
  if (fileCount !== -1) {
    res.json({ count: fileCount });
  } else {
    res.status(500).json({ error: "Error reading directory" });
  }
});

async function fetchDataFromMongoDB(req) {
  const mongoUri = "mongodb://localhost:27017"; // Replace with your MongoDB connection string
  const databaseName = "desadv";
  const collectionName = "data";

  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);

    // Query the data from MongoDB based on the req.query or other conditions
    // For example, if req.query contains filters, use them in the MongoDB query
    const query = {};

    // Modify the query based on the endpoint and req.query

    return await collection.find(query).toArray();
  } catch (error) {
    console.error("Error while fetching data from MongoDB:", error);
    throw error;
  } finally {
    // Close the connection to MongoDB
    client.close();
  }
}

// Uncomment the next line to run the data insertion into MongoDB when the server starts
insertDataIntoMongoDB();

app.listen(3000, () => {
  console.log("Started");
});
