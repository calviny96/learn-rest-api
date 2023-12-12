import express, { Application, Request, Response } from "express"
import expensesRouter from "./router/expensesRouter"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"

import userRouter from "./router/userRouter"

const app: Application = express()

app.use(cookieParser())

// body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use("/users", userRouter)
app.use("/expenses", expensesRouter)



const PORT: number = 1234

console.log("calvin");


app.get("/", (req: Request, res: Response) => {

    // Cookies that have not been signed
    console.log("Cookies:", req.cookies)

    // Cookies that have been signed
    console.log("Signed Cookies:", req.signedCookies)


    res.send({
        "hello": "world"
    })
})

app.post("/", (req: Request, res: Response) => {
    res.send({
        "hello": "world2",
        "method": "ini post"
    })
})



app.listen(PORT, () => {
    console.log("application run on port =>", PORT);

})