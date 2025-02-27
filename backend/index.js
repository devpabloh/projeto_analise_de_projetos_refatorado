console.log('Ambiente carregado:', {
    hasJwtSecret: !!process.env.JWT_SECRET,
    hasSecretKey: !!process.env.SECRET_KEY
});


import dotenv from 'dotenv'; // importando o dotenv que serve para carregar as variaveis de ambiente
dotenv.config() // carregando as variaveis de ambiente
import { errorHandler } from './middlewares/errorHandler.js';

import express from "express"; 
import bodyParser from "body-parser"; 
import cors from 'cors'; 
import sequelize from "./config/database.js"; 
import './models/associations.js';

// Importando as rotas
import authRoutes from "./routes/auth.js"; 
import userRoutes from "./routes/users.js";
import projectRoutes from "./routes/projects.js";



const PORT = process.env.PORT || 3000; // definindo a porta que o servidor vai rodar, se a porta for 3000, se a porta for diferente de 3000, vamos usar a porta que estiver sendo passada pela variavel de ambiente que está no arquivo .env

const app = express(); // aqui estamos criando uma variavel app que vai receber um novo objeto express(), esse objeto é utilizado para criar o servidor node.js

app.use(cors()); // aqui estamos usando o cors() que é um middleware que permite que o servidor aceite requisicoes de qualquer origem
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true })); // aqui estamos usando o bodyParser.urlencoded() que é um middleware que permite que o servidor receba dados no formato x-www-form-urlencoded
app.use(bodyParser.json()); // aqui estamos usando o bodyParser.json() que é um middleware que permite que o servidor receba dados no formato JSON
app.use(errorHandler);

// Rotas
app.use('/analiseDeProjetos/auth', authRoutes); // estamos utilizando o app.use() que é um middleware que permite que o servidor aceite requisicoes de qualquer origem, authRoutes é a rota que estamos utilizando para o modelo de tabela User
app.use('/analiseDeProjetos/users', userRoutes); // estamos utilizando o app.use() que é um middleware que permite que o servidor aceite requisicoes de qualquer origem, userRoutes é a rota que estamos utilizando para o modelo de tabela User
app.use('/analiseDeProjetos/projects', projectRoutes);

// sincroniza o banco de dados, force: false significa que o banco de dados não vai ser limpo, caso o banco de dados ja esteja criado, ele não vai ser limpo e sim atualizado
sequelize.sync({force: false})
    .then(()=>{
        console.log('Banco de dados sincronizado com sucesso')
        app.listen(PORT, ()=>{
            console.log(`O servidor está rodando na porta ${PORT}`)
        })
    })
    .catch(error => console.error(`Erro ao sincronizar o banco de dados ${error}`))