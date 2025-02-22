import dotenv from 'dotenv';
dotenv.config()

import express from "express"; // importando o express que serve para criar o servidor node.js
import bodyParser from "body-parser"; // importando o body-parser que serve para trabalhar com o corpo da requisição HTTP
import cors from 'cors';
import sequelize from "./config/database.js";


// importando os modelos para a sicronização do banco de dados
import User from "./models/User.js";
import Test from "./models/Test.js";
import Team from "./models/Team.js";
import Security from "./models/Security.js";
import Project from "./models/project.js"
import Environment from "./models/Environment.js";
import Documentation from "./models/Documentation.js";
import AdditionalInfo from "./models/AdditionalInfo.js";

// Importando as rotas
import userRoutes from "./routes/users.js";
import projectRoutes from "./routes/projects.js";



const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/analiseDeProjetos/users', userRoutes);
app.use('/analiseDeProjetos/projects', projectRoutes);

sequelize.sync({force: false})
    .then(()=>{
        console.log('Banco de dados sincronizado com sucesso')
        app.listen(PORT, ()=>{
            console.log(`O servidor está rodando na porta ${PORT}`)
        })
    })
    .catch(error => console.error(`Erro ao sincronizar o banco de dados ${error}`))