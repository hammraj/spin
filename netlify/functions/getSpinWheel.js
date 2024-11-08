const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI; // MongoDB URI stored in environment variable
const client = new MongoClient(uri);

exports.handler = async () => {
    try {
        await client.connect();
        const database = client.db("spinWheelDB");
        const collection = database.collection("spinWheelOptions");
        const options = await collection.find().toArray();

        return {
            statusCode: 200,
            body: JSON.stringify(options),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to retrieve spin wheel options" }),
        };
    } finally {
        await client.close();
    }
};
