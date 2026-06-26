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

        const courses= db. collection("courses");

        const courseResult = await courses.insertOne({

            title: "Backened Development",
            instructor: "Shoaib"


        });

    console.log("Course created, _id:", courseResult.insertedId);

    await students.updateOne(
        { name:"Shoaib" },
        {$set: { courseId: courseResult.insertedId}}
    );

    console.log("Student updated with courseId");
               

    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }

}

run();
