"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const joi_1 = __importDefault(require("joi"));
const ProductsService_1 = require("../services/ProductsService");
const loginMiddleware_1 = require("../loginMiddleware");
// cake - put get
router.post("/cake", async (req, res) => {
    try {
        let joiSchema = joi_1.default.object({
            img: joi_1.default.string(),
            name: joi_1.default.string(),
            tags: joi_1.default.string(),
            rating: joi_1.default.string(),
            price: joi_1.default.string(),
            bakingTime: joi_1.default.string(),
            location: joi_1.default.string(),
            veg: joi_1.default.boolean(),
        });
        let { value, error } = joiSchema.validate(req.body, { stripUnknown: true });
        if (error)
            return res.status(400).json({ msg: "Please provide all values" });
        let result = await (ProductsService_1.ProductService === null || ProductsService_1.ProductService === void 0 ? void 0 : ProductsService_1.ProductService.putCakes({
            img: value.img,
            name: value.name,
            tags: value.tags,
            rating: value.rating,
            price: value.price,
            bakingTime: value.bakingTime,
            location: value.location,
            veg: value.veg,
        }));
        return res.status(200).json({ msg: result });
    }
    catch (e) {
        res.status(400).json({ msg: e });
    }
});
router.get("/cake", async (req, res) => {
    try {
        // console.log("result");
        let result = await ProductsService_1.ProductService.getCakes();
        console.log(result);
        return res.status(200).json({ data: result });
    }
    catch (e) {
        res.status(400).json({ msg: e });
    }
});
router.get("/details/:item/:id", loginMiddleware_1.authMiddleware, async (req, res) => {
    const id = req.params.id;
    const item = req.params.item;
    if (!id || !item) {
        return res.status(400).json({ msg: "Item or Id  is missing" });
    }
    try {
        let result = await ProductsService_1.ProductService.getDetail(id, item);
        return res.status(200).json({ data: result });
    }
    catch (e) {
        res.status(400).json({ msg: e });
    }
});
// speaker
router.post("/others", async (req, res) => {
    try {
        let joiSchema = joi_1.default.object({
            img: joi_1.default.string(),
            name: joi_1.default.string(),
            tags: joi_1.default.string(),
            rating: joi_1.default.string(),
            price: joi_1.default.string(),
            location: joi_1.default.string(),
            deliveryTime: joi_1.default.string(),
            decoration: joi_1.default.boolean(),
        });
        let { value, error } = joiSchema.validate(req.body, { stripUnknown: true });
        if (error)
            return res.status(400).json({ msg: "Please provide all values" });
        let result = await ProductsService_1.ProductService.putOthers(value);
        return res.status(200).json({ msg: result });
    }
    catch (e) {
        res.status(400).json({ msg: e });
    }
});
router.get("/others", async (req, res) => {
    try {
        let result = await ProductsService_1.ProductService.getOthers();
        return res.status(200).json({ data: result });
    }
    catch (e) {
        res.status(400).json({ msg: e });
    }
});
// balloons
router.post("/decoration", async (req, res) => {
    try {
        let joiSchema = joi_1.default.object({
            img: joi_1.default.string(),
            name: joi_1.default.string(),
            tags: joi_1.default.string(),
            rating: joi_1.default.string(),
            price: joi_1.default.string(),
            location: joi_1.default.string(),
            deliveryTime: joi_1.default.string(),
            decoration: joi_1.default.boolean(),
        });
        let { value, error } = joiSchema.validate(req.body, { stripUnknown: true });
        if (error)
            return res.status(400).json({ msg: "Please provide all values" });
        let result = await (ProductsService_1.ProductService === null || ProductsService_1.ProductService === void 0 ? void 0 : ProductsService_1.ProductService.putDecoration({
            img: value.img,
            name: value.name,
            tags: value.tags,
            rating: value.rating,
            price: value.price,
            location: value.location,
            deliveryTime: value.deliveryTime,
            decoration: value.decoration,
        }));
        return res.status(200).json({ msg: result });
    }
    catch (e) {
        res.status(400).json({ msg: e });
    }
});
router.get("/decoration", async (req, res) => {
    try {
        let result = await ProductsService_1.ProductService.getDecoration();
        return res.status(200).json({ data: result });
    }
    catch (e) {
        res.status(400).json({ msg: e });
    }
});
exports.default = router;
