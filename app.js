const {MongoClient}=  require("mongodb");

const uri ="mongodb+srv://shoaib:123qwe@cluster0.j8agbhc.mongodb.net/?appName=Cluster0"
const client = new MongoClient(uri)

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db("college");
        const collection = db.collection("students");

        await collection.insertOne({
            name: "Shoaib",
            age: 22,
            city: "Okara"
        });

        console.log("Data Inserted");

    } catch (error) {
        console.log(error);
    }
}

connectDB()