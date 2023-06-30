"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const mongodb_1 = require("mongodb");
const DbServices_1 = require("./DbServices");
class ProductService {
    static async putCakes(cake) {
        let result = await DbServices_1.DataBase.cakeCollection.insertOne(cake);
        if (!result)
            throw Error("Mongodb not working properly");
        return "Added Cake";
    }
    static async getDetail(id, item) {
        let collection;
        if (item == "cake") {
            collection = DbServices_1.DataBase.cakeCollection;
        }
        else if (item == "decoration") {
            collection = DbServices_1.DataBase.decorationCollection;
        }
        else {
            collection = DbServices_1.DataBase.othersCollection;
        }
        let result = await collection.find({ _id: new mongodb_1.ObjectId(id) }).toArray();
        return { result };
    }
    static async getCakes() {
        let result = await DbServices_1.DataBase.cakeCollection.find({}).toArray();
        return result;
    }
    static async putOthers(payload) {
        await DbServices_1.DataBase.othersCollection.insertOne(payload);
        return "Added Others";
    }
    static async getOthers() {
        let result = await DbServices_1.DataBase.othersCollection.find({}).toArray();
        // console.log(result)
        return result;
    }
    static async putDecoration(cake) {
        let result = await DbServices_1.DataBase.decorationCollection.insertOne(cake);
        if (!result)
            throw Error("Mongodb not working properly");
        return "Added Decoration";
    }
    static async getDecoration() {
        let result = await DbServices_1.DataBase.decorationCollection.find({}).toArray();
        return result;
    }
}
exports.ProductService = ProductService;
