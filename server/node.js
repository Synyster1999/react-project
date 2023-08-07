const fs = require("fs");
const path = require("path");
const { parse, addDays, format } = require("date-fns");
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
  "dispatch_date",
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

const vanIdToSupplierMap = {
  138128942: "SPA",
  STMEUR: "STM",
  STMZ: "STM",
  OSRAMOSRBG: "OSR",
  OSRAMOSRBGTEST: "OSR",
  SCGPROD: "ONS",
  SCGTEST: "ONS",
  NATLSEMI: "NSC",
  "52290567S081": "FME",
  "52290567S080": "FME",
  FAIRCHILD: "FAI",
  "001325463EMEA": "FSL",
  ATMELBOX1: "ATM",
  "VISHAY-EU": "VIS",
  "VISHAY-EU-TEST": "VIS",
  "DEKTOSHC.DETOEL01": "TOS",
  "DEKTOSHC.DETOEL03": "TOS",
  "IFX.B2B.PROD": "INF",
  "IFX.B2B.TEST": "INF",
  "001325463EMEA": "FSL",
  HRS0004: "INC",
  NATLSEMI: "ALT",
  BSI: "BSI",
  5013546104076: "NXP",
  608208245: "ISS",
  "084963177GSPGN": "AVA",
  "AVAGO-MA": "AVA",
  "084963177GSPGNT": "AVA",
  NUMONYXEMEA: "NUM",
  SNWEUR: "STE",
  KAMINO: "14",
  SAMSUNGSEMNT: "SAM",
  "GBTXI.TXI002US": "TID",
  "093120871": "MIC",
  "093120871T": "MIC",
  4399902104579: "EVL",
  4399902104579: "EVL",
  "102108446WP:01": "CYP",
  "102108446WP": "CYP",
  IDTEDIUS: "IDT",
  IDTB2BPRD: "IDT",
  IDTB2BTST: "IDT",
  IDTEDITST: "IDT",
  MCHPPROD: "MCH",
  MCHPTEST: "MCH",
  MAXIMACTG: "MXM",
  WEENVANP: "WEN",
  WEENVANT: "WEN",
  "491683766VANP": "AMP",
  "491683766VANT": "AMP",
  "492020517VANP": "NEX",
  "492020517VANT": "NEX",
  "492020517AS2P": "NEX",
  5013546104069: "NXP",
  5013546104076: "NXP",
  9255838400: "BRI",
  "9255838400T": "BRI",
  9494501080: "BRO",
  ALTERAINT: "ALT",
  ALTERAIRL: "ALT",
  ANALOGDEVICES: "ADI",
  ANALOGASAP: "ADI",
  MAXIMACTGTEST: "MXM",
  MAXIMACTGMXM: "MXM",
};

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

      const dataObject = {};

      keyNames.forEach((key, index) => {
        dataObject[key] = fields[index] || "";
      });

      if (dataObject["van_id"]) {
        const vanId = dataObject["van_id"].trim();
        if (vanIdToSupplierMap[vanId]) {
          dataObject["supplier"] = vanIdToSupplierMap[vanId];
        }
      }

      if (!dataObject["arrival_date"] && dataObject["dispatch_date"]) {
        const dispatchDate = parse(
          dataObject["dispatch_date"],
          "dd.MM.yyyy",
          new Date()
        );

        if (!isNaN(dispatchDate.getTime())) {
          const arrivalDate = addDays(dispatchDate, 7);
          dataObject["arrival_date"] = format(
            arrivalDate,
            "dd-MM-yyyy"
          ).replace(/-/g, ".");
        }
      }

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
