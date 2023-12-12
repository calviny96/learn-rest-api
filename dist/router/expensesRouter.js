"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const router = express_1.default.Router();
//GET ALl DATA
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenses = yield axios_1.default.get("http://localhost:3000/expenses");
        res.status(200).send({
            data: expenses.data
        });
    }
    catch (err) {
        res.status(400).send({
            message: JSON.stringify(err)
        });
    }
}));
//GET DETAIL EXPENSES
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const response = yield axios_1.default.get(`http://localhost:3000/expenses/${id}`);
        //jika tidak ditemukan
        if (response.data) {
            res.status(200).send(response.data);
        }
        else {
            res.status(404).send({ message: 'Expense not found' });
        }
    }
    catch (err) {
        res.status(500).send({
            message: JSON.stringify(err)
        });
    }
}));
//CREATE NEW DATA
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Mengambil data dari body permintaan dengan tipe yang ditentukan
        const dataToSend = req.body;
        // Mengirim data ke server lain
        const response = yield axios_1.default.post("http://localhost:3000/expenses", dataToSend);
        // Mengirim respons ke client
        res.status(200).send(response.data);
    }
    catch (err) {
        res.status(400).send({
            message: JSON.stringify(err)
        });
    }
}));
//EDIT DATA
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id; // Mengambil ID dari URL
        const dataToEdit = req.body; // Data yang akan di-edit
        // URL harus mencakup ID dari expense yang ingin di-edit
        const response = yield axios_1.default.patch(`http://localhost:3000/expenses/${id}`, dataToEdit);
        // Mengirim respons ke client
        res.status(200).send(response.data);
    }
    catch (err) {
        res.status(400).send({
            message: JSON.stringify(err)
        });
    }
}));
//DELETE DATA
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id; // Mengambil ID dari URL
        const response = yield axios_1.default.delete(`http://localhost:3000/expenses/${id}`);
        // Mengirim respons ke client
        res.status(200).send({
            message: `Data dari ID : ${id} berhasil di hapus`
        });
    }
    catch (err) {
        res.status(400).send({
            message: JSON.stringify(err)
        });
    }
}));
//Filter Category
router.get("/:category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.params.category;
        const response = yield axios_1.default.get(`http://localhost:3000/expenses/${category}`);
        const expenses = response.data;
        // Menghitung total expense untuk kategori tersebut
        const total = expenses
            .filter((expense) => expense.category === category);
        //jika tidak ditemukan
        if (response.data) {
            res.status(200).send({ category, total });
        }
        else {
            res.status(404).send({ message: 'Expense not found' });
        }
    }
    catch (err) {
        res.status(500).send({
            message: JSON.stringify(err)
        });
    }
}));
exports.default = router;
