import express from "express";
import User from "../models/user.js";
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';
import { getAllUsers, updateUserRole, deleteUser } from '../controller/userController.js';

const router = express.Router(); // Estamos criando uma variavel router que vai receber um novo objeto express.Router(), que serve para criar rotas.

// Rota para criar um usuário (existente)
router.post('/', async (requisicao, resposta)=>{
    try{
        const {name, email, password, role} = requisicao.body // agora estamos desestruturando o objeto requisicao.body, e estamos atribuindo as variaveis name, email, password e role aos respectivos valores
        const user = await User.create({name, email, password, role}); // agora estamos criando uma variável user que vai receber um novo objeto User.create, esse objeto User.create vai receber os valores das variaveis name, email, password e role.
        resposta.status(201).json(user); // agora estamos criando uma variável resposta que vai receber um novo objeto resposta.status(201).json(user); esse objeto resposta.status(201).json(user) vai receber os valores da variável user.
    }catch(error){
        resposta.status(500).json({error: error.message})
    }
})


router.get('/', authMiddleware, adminMiddleware, getAllUsers);


router.put('/:id/role', authMiddleware, adminMiddleware, updateUserRole);


router.delete('/:id', authMiddleware, adminMiddleware, deleteUser);

export default router;