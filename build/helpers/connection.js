"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConnection = exports.db = void 0;
const mongodb_1 = require("mongodb");
const createConnection = async () => {
    try {
        const uri = process.env.uri;
        if (!uri)
            throw Error("Mongo connection string is missing");
        const client = new mongodb_1.MongoClient(uri);
        await client.connect();
        exports.db = client.db("Db");
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    catch (e) {
        console.log(e.message);
    }
};
exports.createConnection = createConnection;
