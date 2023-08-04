const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");

const dataFolderPath = "./DATA";
const processedFlagPath = path.join(dataFolderPath, ".processed");
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

const mongoURI = "mongodb://localhost:27017";

async function processFile(filePath, db) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");

    const lines = fileContent.split("\n");

    for (const [index, line] of lines.entries()) {
      if (!line.trim()) {
        continue;
      }

      const fields = line.match(/(?<=\||^)[^|]*(?=\||$)/g);
      if (!fields) {
        continue;
      }

      const dataObject = {};

      keyNames.forEach((key, index) => {
        dataObject[key] = fields[index] || "";
      });

      await db.collection("data").insertOne(dataObject);
    }
  } catch (err) {
    console.error("Error processing file:", err);
  }
}

async function processFiles() {
  if (fs.existsSync(processedFlagPath)) {
    console.log("Files have already been processed. Skipping...");
    return;
  }

  const client = new MongoClient(mongoURI, { useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db("desadv");

    const files = fs.readdirSync(dataFolderPath);

    for (const file of files) {
      const filePath = path.join(dataFolderPath, file);
      await processFile(filePath, db);
    }

    fs.writeFileSync(processedFlagPath, "processed");
    console.log("Files processed successfully.");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  } finally {
    client.close();
  }
}
async function getPaginatedData(db, page) {
  const pageSize = 8;
  const skip = (page - 1) * pageSize;

  const data = await db
    .collection("data")
    .find()
    .skip(skip)
    .limit(pageSize)
    .toArray();

  return data;
}

async function getTotalDocumentsCount(db) {
  const count = await db.collection("data").countDocuments();
  return count;
}

module.exports = {
  processFile,
  processFiles,
  getPaginatedData,
  getTotalDocumentsCount,
};
