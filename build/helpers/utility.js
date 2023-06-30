"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mail = exports.transporter = exports.generateRandomOtp = void 0;
// const nodemailer = require('nodemailer');
const nodemailer_1 = __importDefault(require("nodemailer"));
function generateRandomOtp() {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < 4; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
}
exports.generateRandomOtp = generateRandomOtp;
exports.transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: "yatin300701@gmail.com",
        pass: "guyetrpqmyoulntz",
    },
});
const mail = async (to, subject, txt) => {
    const mailOptions = {
        from: "yatin300701@gmail.com",
        to: to,
        subject: subject,
        text: txt,
    };
    await exports.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error:", error);
        }
        else {
            console.log("Email sent:", info.response);
        }
    });
};
exports.mail = mail;
