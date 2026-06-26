const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://shoaib:123qwe@cluster0.j8agbhc.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("college");
    const collection = db.collection("students");

    const result = await collection.insertMany([
      { name: "Ali", age: 21, city: "Lahore" },
      { name: "Sara", age: 23, city: "Karachi" },
      { name: "Hamza", age: 20, city: "Okara" },
      { name: "Bilal", age: 25, city: "Lahore" }
    ]);

    console.log("Inserted count:", result.insertedCount);

  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

run();