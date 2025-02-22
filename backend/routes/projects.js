import express from "express";
import Project from "../models/project.js";

const router = express.Router();

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