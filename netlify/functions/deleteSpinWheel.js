const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

exports.handler = async (event) => {
    try {
        const { label } = JSON.parse(event.body);
        await client.connect();
        const database = client.db("spinWheelDB");
        const collection = database.collection("spinWheelOptions");

        const result = await collection.deleteOne({ label });

        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to delete option" }),
        };
    } finally {
        await client.close();
    }
};
