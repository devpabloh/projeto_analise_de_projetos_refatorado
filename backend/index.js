import dotenv from 'dotenv';

// Carrega o .env e verifica se houve erro
const result = dotenv.config();
if (result.error) {
    console.error('Erro ao carregar o .env:', result.error);
} else {
    console.log('Arquivo .env carregado com sucesso');
}

console.log('Ambiente carregado:', {
    hasJwtSecret: !!process.env.JWT_SECRET,
    jwtSecretValue: process.env.JWT_SECRET || 'não definido',
    hasSecretKey: !!process.env.SECRET_KEY,
    secretKeyValue: process.env.SECRET_KEY || 'não definido'
});

// Resto do código...
import { errorHandler } from './middlewares/errorHandler.js';
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import sequelize from "./config/database.js";
import './models/associations.js';

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import projectRoutes from "./routes/projects.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(errorHandler);

app.use('/analiseDeProjetos/auth', authRoutes);
app.use('/analiseDeProjetos/users', userRoutes);
app.use('/analiseDeProjetos/projects', projectRoutes);

sequelize.sync({ force: true })
    .then(() => {
        console.log('Banco de dados sincronizado com sucesso');
        app.listen(PORT, () => {
            console.log(`O servidor está rodando na porta ${PORT}`);
        });
    })
    .catch(error => {
        console.error(`Erro ao sincronizar o banco de dados: ${error}`);
        process.exit(1);
    });