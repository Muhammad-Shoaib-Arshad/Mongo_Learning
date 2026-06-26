require("dotenv").config();

const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

async function run() {
    try {

        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db("college");
        const collection = db.collection("students");

        const result = await collection.aggregate([

           {
                $group: {
                    _id: "$city",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 2
            }
        ]).toArray();

    console.log(result);
} catch (error) {
    console.log(error);

} finally {
    await client.close();
}
}

run();




