"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const DbServices_1 = require("../services/DbServices");
const utility_1 = require("../helpers/utility");
const router = express_1.default.Router();
router.get("/signup", async (req, res) => {
    res.json({ working: "yes!!" });
});
router.post("/signup", async (req, res) => {
    try {
        const joiSchema = joi_1.default.object({
            username: joi_1.default.string().required(),
            email: joi_1.default.string().required(),
            phoneNo: joi_1.default.string().required(),
        });
        let { value, error } = joiSchema.validate(req.body, {
            stripUnknown: true,
        });
        if (error)
            return res.status(400).json({ msg: "Please provide all values" });
        const otp = (0, utility_1.generateRandomOtp)();
        let check = await DbServices_1.DataBase.loginOtpCollection.findOne({
            email: value === null || value === void 0 ? void 0 : value.email,
        });
        if (check != undefined) {
            if ((check === null || check === void 0 ? void 0 : check.status) == true) {
                throw new Error("Email already registered");
            }
            else {
                await DbServices_1.DataBase.loginOtpCollection.deleteOne({ email: value.email });
                return;
            }
        }
        await DbServices_1.DataBase.loginOtpCollection.insertOne({
            username: value.username,
            email: value.email,
            phoneNo: value.phoneNo,
            otp: otp,
            status: false,
        });
        (0, utility_1.mail)(value.email, `PartyPlazoo Login Otp Mail`, `Your otp for PartyPlazoo is ${otp}`);
        console.log("Mail sent with otp ", otp);
        return res.status(200).json({ data: `Mail Send with otp` });
    }
    catch (e) {
        return res.status(400).json({ msg: e || "somthing unexpected occured" });
    }
});
router.post("/signupotp", async (req, res) => {
    const joiSchema = joi_1.default.object({
        username: joi_1.default.string().required(),
        email: joi_1.default.string().required(),
        phoneNo: joi_1.default.string().required(),
        otp: joi_1.default.string().required(),
    });
    try {
        let { value, error } = joiSchema.validate(req.body, { stripUnknown: true });
        if (error)
            return res
                .status(400)
                .json({ msg: "Please provide all values correctly" });
        let check = await DbServices_1.DataBase.loginOtpCollection.findOne({
            phoneNo: value.phoneNo,
        });
        if (!check)
            throw Error("Email not signed up");
        if ((check === null || check === void 0 ? void 0 : check.otp) != value.otp) {
            console.log(`Wrong otp : in db ${check.otp} and  given ${value.otp}`);
            throw Error(`Wrong Otp `);
        }
        await DbServices_1.DataBase.loginOtpCollection.updateOne({ phoneNo: value.phoneNo }, { $set: { otp: "", status: true } });
        return res.status(200).json({ data: "Sign In Successfull" });
    }
    catch (e) {
        res.status(400).json({ msg: e || "somthing unexpected occured" });
    }
});
router.post("/login", async (req, res) => {
    try {
        const joiSchema = joi_1.default.object({
            email: joi_1.default.string(),
        });
        let { value, error } = joiSchema.validate(req.body, { stripUnknown: true });
        if (error)
            res.status(400).json({ msg: "Body not correct" });
        let check = await DbServices_1.DataBase.loginOtpCollection.find({
            phoneNo: value.phoneNo,
        });
        if (!check)
            res.status(400).json({ msg: "Not signed in" });
        const otp = (0, utility_1.generateRandomOtp)();
        (0, utility_1.mail)(value.email, `PartyPlazoo Login Otp Mail`, `Your otp for PartyPlazoo is ${otp}`);
        await DbServices_1.DataBase.loginOtpCollection.updateOne({ email: value.email }, { $set: { otp: otp, status: true } });
        return res.status(200).json({ data: `Mail Send with otp ${otp}` });
    }
    catch (e) {
        res.status(400).json({ msg: e });
    }
});
router.post("/loginotp", async (req, res) => {
    try {
        const joiSchema = joi_1.default.object({
            email: joi_1.default.string(),
            otp: joi_1.default.string(),
        });
        let { value, error } = joiSchema.validate(req.body, { stripUnknown: true });
        if (error)
            return res
                .status(400)
                .json({ msg: "Please provide all values correctly" });
        let check = await DbServices_1.DataBase.loginOtpCollection.findOne({
            email: value.email,
        });
        if (!check)
            throw Error("Email not signed up");
        if ((check === null || check === void 0 ? void 0 : check.otp) != value.otp) {
            throw Error("Wrong Otp");
        }
        await DbServices_1.DataBase.loginOtpCollection.updateOne({ email: value.email }, { $set: { otp: "", status: true } });
        const token = jsonwebtoken_1.default.sign(check, process.env.Token);
        return res.status(200).send([token, check]);
    }
    catch (e) {
        res.status(400).json({ msg: e });
    }
});
exports.default = router;
