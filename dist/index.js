"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expensesRouter_1 = __importDefault(require("./router/expensesRouter"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
// body parser
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use("/users", userRouter_1.default);
app.use("/expenses", expensesRouter_1.default);
const PORT = 1234;
console.log("calvin");
app.get("/", (req, res) => {
    // Cookies that have not been signed
    console.log("Cookies:", req.cookies);
    // Cookies that have been signed
    console.log("Signed Cookies:", req.signedCookies);
    res.send({
        "hello": "world"
    });
});
app.post("/", (req, res) => {
    res.send({
        "hello": "world2",
        "method": "ini post"
    });
});
app.listen(PORT, () => {
    console.log("application run on port =>", PORT);
});
