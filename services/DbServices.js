"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBase = void 0;
const connection_1 = require("../helpers/connection");
class DataBase {
    static get loginOtpCollection() {
        return connection_1.db === null || connection_1.db === void 0 ? void 0 : connection_1.db.collection("loginOtps");
    }
    static get cakeCollection() {
        return connection_1.db === null || connection_1.db === void 0 ? void 0 : connection_1.db.collection("cakes");
    }
    static get decorationCollection() {
        return connection_1.db === null || connection_1.db === void 0 ? void 0 : connection_1.db.collection("decoration");
    }
    static get othersCollection() {
        return connection_1.db === null || connection_1.db === void 0 ? void 0 : connection_1.db.collection("others");
    }
    static get commentsCollection() {
        return connection_1.db === null || connection_1.db === void 0 ? void 0 : connection_1.db.collection("comments");
    }
    static get replyCollection() {
        return connection_1.db === null || connection_1.db === void 0 ? void 0 : connection_1.db.collection("reply");
    }
}
exports.DataBase = DataBase;
