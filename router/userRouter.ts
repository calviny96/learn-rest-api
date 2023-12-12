import express, {Application, Response, Request, NextFunction, Router} from "express"
// const express = require("express")
// const app = express()

const router : Router = express.Router()


router.get("/", (req : Request, res : Response) => {
    res.send({
        
    })
})


export default express