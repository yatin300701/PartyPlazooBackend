"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentServices = void 0;
const mongodb_1 = require("mongodb");
const DbServices_1 = require("./DbServices");
class CommentServices {
  static async addComments(payload) {
    let find = await DbServices_1.DataBase.commentsCollection.findOne({
      $and: [
        { userId: new mongodb_1.ObjectId(payload.userId) },
        { productsId: new mongodb_1.ObjectId(payload.productsId) },
      ],
    });
    if (!find) {
      let result = await DbServices_1.DataBase.commentsCollection.insertOne({
        userId: new mongodb_1.ObjectId(payload.userId),
        productsId: new mongodb_1.ObjectId(payload.productsId),
        stars: payload.stars,
        comment: payload.comment,
      });
      if (!result) throw Error("Mongodb not working properly");
    } else {
      let result = await DbServices_1.DataBase.commentsCollection.updateOne(
        {
          $and: [
            { userId: new mongodb_1.ObjectId(payload.userId) },
            { productsId: new mongodb_1.ObjectId(payload.productsId) },
          ],
        },
        {
          $set: {
            userId: new mongodb_1.ObjectId(payload.userId),
            productsId: new mongodb_1.ObjectId(payload.productsId),
            stars: payload.stars,
            comment: payload.comment,
          },
        }
      );
      if (!result) throw Error("Mongodb not working properly");
    }
    return "Added Cake";
  }
  static async allComments(payload) {
    // console.log("all data", payload.productsId);
    let aggregatePipeline = [
      {
        $match: {
          productsId: new mongodb_1.ObjectId(payload.productsId),
        },
      },
      {
        $lookup: {
          from: "loginOtps",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
    ];
    let result = await DbServices_1.DataBase.commentsCollection
      .aggregate(aggregatePipeline)
      .toArray();
    return result;
  }
  static async allReples(id) {
    let result = await DbServices_1.DataBase.replyCollection
      .find({ commentId: new mongodb_1.ObjectId(id) })
      .toArray();
    return result;
  }
  static async addReply(payload, id) {
    let result = await DbServices_1.DataBase.replyCollection.insertOne({
      commentId: new mongodb_1.ObjectId(id),
      comment: payload.comment,
      to: payload.to,
      by: payload.by,
    });
    return "Successfully added";
  }
}
exports.CommentServices = CommentServices;
