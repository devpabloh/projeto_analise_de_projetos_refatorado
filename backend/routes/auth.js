import express from "express";
import {register, login} from "../controller/authController.js"

const router = express.Router() // estamos criando uma variavel router que vai receber um novo objeto express.Router(), que serve para criar rotas.

router.post('/register', register)

router.post('/login', login)


export default router