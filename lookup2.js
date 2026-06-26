require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("college");
    const students = db.collection("students");

    const result = await students.aggregate([
      { $match: { name: "Shoaib" } },   
      {
        $lookup: {
          from: "courses",        
          localField: "courseId", 
          foreignField: "_id",    
          as: "courseInfo"        
        }
      }
    ]).toArray();

    console.log(JSON.stringify(result, null, 2));

  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

run();