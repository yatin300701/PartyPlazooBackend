"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const express_1 = __importDefault(require("express"));
const CommentsServices_1 = require("../services/CommentsServices");
const loginMiddleware_1 = require("../loginMiddleware");
const router = express_1.default.Router();
router.put("/comments", loginMiddleware_1.authMiddleware, async (req, res) => {
    const joiSchema = joi_1.default.object({
        comment: joi_1.default.string().required(),
        userId: joi_1.default.string().required(),
        stars: joi_1.default.string().required(),
        productsId: joi_1.default.string().required(),
    });
    try {
        const { value, error } = joiSchema.validate(req.body, {
            stripUnknown: true,
        });
        if (error)
            return res.status(400).json({ msg: error });
        console.log("commenting ....");
        const result = await CommentsServices_1.CommentServices.addComments(value);
        res.status(200).json({ data: result });
    }
    catch (e) {
        res.status(400).json({ msg: e.message });
    }
});
router.get("/comments/:item", loginMiddleware_1.authMiddleware, async (req, res) => {
    const item = req.params.item;
    try {
        if (!item) {
            return res.status(400).json({ msg: "id or item not given" });
        }
        const result = await CommentsServices_1.CommentServices.allComments({ productsId: item });
        res.status(200).json({ data: result });
    }
    catch (e) {
        res.status(400).json({ msg: e });
    }
});
router.get("/reply/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await CommentsServices_1.CommentServices.allReples(id);
        res.status(200).json({ data: result });
    }
    catch (e) {
        res.status(400).json({ msg: e.message });
    }
});
router.post("/reply/:id", async (req, res) => {
    const id = req.params.id;
    const joiSchema = joi_1.default.object({
        comment: joi_1.default.string(),
        to: joi_1.default.string(),
        by: joi_1.default.string()
    });
    try {
        const { value, error } = joiSchema.validate(req.body, { stripUnknown: true });
        if (error)
            res.status(400).json({ msg: "req body is not proper" });
        const result = await CommentsServices_1.CommentServices.addReply(value, id);
        res.status(200).json({ data: result });
    }
    catch (e) {
        res.status(400).json({ msg: e.message });
    }
});
exports.default = router;
