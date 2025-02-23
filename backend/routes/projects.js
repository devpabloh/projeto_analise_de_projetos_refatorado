import express from "express"; // importando o express que serve para criar o servidor node.js
import Project from "../models/project.js"; // importando o modelo de tabela project.js, que contém os dados, tipos de dados e relações entre os modelos de tabela.

const router = express.Router(); // estamos criando uma variavel router que vai receber um novo objeto express.Router(), que serve para criar rotas.

router.post("/", async (requisicao, resposta) => {
    try {
        const {name, description, phase, startDate, deadLine, userId} = requisicao.body;
        const project = await Project.create({name, description, phase, startDate, deadLine, userId})
        resposta.status(201).json(project);
    } catch (error) {
        resposta.status(500).json({ error: error.message });
    }
})

router.get("/", async (requisicao, resposta)=>{
    try {
        const projects = await Project.findAll()
        resposta.json(projects)
    } catch (error) {
        resposta.status(500).json({ error: error.message });
    }
})

export default router;