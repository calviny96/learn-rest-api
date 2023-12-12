import express, { Application, Response, Request, Router, } from "express";
import axios from "axios";

interface ExpenseData {
    name: string;
    nominal: number;
    category: string;
}

const router: Router = express.Router();

//GET ALl DATA
router.get("/", async (req: Request, res: Response) => {
    try {
        const expenses = await axios.get("http://localhost:3000/expenses");

        res.status(200).send({
            data: expenses.data
        });
    } catch (err) {
        res.status(400).send({
            message: JSON.stringify(err)
        });
    }
});

//GET DETAIL EXPENSES

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const response = await axios.get(`http://localhost:3000/expenses/${id}`)

        //jika tidak ditemukan
        if (response.data) {
            res.status(200).send(response.data)
        } else {
            res.status(404).send({ message: 'Expense not found' })
        }
    } catch (err) {
        res.status(500).send({
            message: JSON.stringify(err)
        });

    }
})

//CREATE NEW DATA
router.post("/", async (req: Request, res: Response) => {
    try {
        // Mengambil data dari body permintaan dengan tipe yang ditentukan
        const dataToSend: ExpenseData = req.body;

        // Mengirim data ke server lain
        const response = await axios.post("http://localhost:3000/expenses", dataToSend);

        // Mengirim respons ke client
        res.status(200).send(response.data);
    } catch (err) {
        res.status(400).send({
            message: JSON.stringify(err)
        });
    }
});

//EDIT DATA
router.patch('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id; // Mengambil ID dari URL
        const dataToEdit: ExpenseData = req.body; // Data yang akan di-edit

        // URL harus mencakup ID dari expense yang ingin di-edit
        const response = await axios.patch(`http://localhost:3000/expenses/${id}`, dataToEdit);

        // Mengirim respons ke client
        res.status(200).send(response.data);
    } catch (err) {
        res.status(400).send({
            message: JSON.stringify(err)
        });
    }
});

//DELETE DATA
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id; // Mengambil ID dari URL

        const response = await axios.delete(`http://localhost:3000/expenses/${id}`);

        // Mengirim respons ke client
        res.status(200).send({
            message: `Data dari ID : ${id} berhasil di hapus`
        });
    } catch (err) {
        res.status(400).send({
            message: JSON.stringify(err)
        });
    }
});

//Filter Category (masi error)

router.get("/:category", async (req: Request, res: Response) => {

    try {
        const category = req.params.category

        const response = await axios.get(`http://localhost:3000/expenses/${category}`)

        const expenses = response.data

        // Menghitung total expense untuk kategori tersebut
        const total = expenses
            .filter((expense: any) => expense.category === category);


        //jika tidak ditemukan
        if (response.data) {
            res.status(200).send({ category, total });
        } else {
            res.status(404).send({ message: 'Expense not found' })
        }
    } catch (err) {
        res.status(500).send({
            message: JSON.stringify(err)
        });

    }
})


export default router;

