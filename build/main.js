"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = require("./helpers/connection");
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const productsRoutes_1 = __importDefault(require("./routes/productsRoutes"));
const commentsRoutes_1 = __importDefault(require("./routes/commentsRoutes"));
dotenv_1.default.config();
const port = process.env.port;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// products
app.use("/api", loginRoutes_1.default);
app.use("/api/products", productsRoutes_1.default);
app.use("/api/comments", commentsRoutes_1.default);
// people bought pre
// review and comment
app.listen(port, () => {
    (0, connection_1.createConnection)().then((_) => {
        console.log("listening..", port);
    });
});
