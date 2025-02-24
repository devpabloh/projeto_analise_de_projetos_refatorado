
import dotenv from 'dotenv'; // importando o dotenv que serve para carregar as variaveis de ambiente
dotenv.config() // carregando as variaveis de ambiente

import express from "express"; // importando o express que serve para criar o servidor node.js
import bodyParser from "body-parser"; // importando o body-parser que serve para trabalhar com o corpo da requisição HTTP
import cors from 'cors'; // importando o cors que serve para trabalhar com o cabeçalho CORS
import sequelize from "./config/database.js"; // importando a conexão com o banco de dados que está em database.js
import authRoutes from "./routes/auth.js"; // importando as rotas de autenticação que estão em auth.js, nesse arquivo auth que estamos importando foi o arquivo de rotas criado anteriormente. Aqui nós vamos utilizar para definir as rotas de autenticação.


// importando os modelos para a sicronização do banco de dados
import User from "./models/User.js"; // importando o modelo User que está em User.js, nesse arquivo User que estamos importando foi o modelo de tabela criado anteriormente. Aqui nós vamos utilizar para definir a relação entre usuário e projeto.
import Test from "./models/Test.js"; // importando o modelo Test que está em Test.js, nesse arquivo Test que estamos importando foi o modelo de tabela criado anteriormente. Aqui nós vamos utilizar para definir a relação entre teste e projeto.
import Team from "./models/Team.js"; // importando o modelo Team que está em Team.js, nesse arquivo Team que estamos importando foi o modelo de tabela criado anteriormente. Aqui nós vamos utilizar para definir a relação entre equipe e projeto.
import Security from "./models/Security.js";
import Project from "./models/project.js"
import Environment from "./models/Environment.js";
import Documentation from "./models/Documentation.js";
import AdditionalInfo from "./models/AdditionalInfo.js";

// Importando as rotas
import userRoutes from "./routes/users.js";
import projectRoutes from "./routes/projects.js";



const PORT = process.env.PORT || 3000; // definindo a porta que o servidor vai rodar, se a porta for 3000, se a porta for diferente de 3000, vamos usar a porta que estiver sendo passada pela variavel de ambiente que está no arquivo .env

const app = express(); // aqui estamos criando uma variavel app que vai receber um novo objeto express(), esse objeto é utilizado para criar o servidor node.js

app.use(cors()); // aqui estamos usando o cors() que é um middleware que permite que o servidor aceite requisicoes de qualquer origem
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true })); // aqui estamos usando o bodyParser.urlencoded() que é um middleware que permite que o servidor receba dados no formato x-www-form-urlencoded
app.use(bodyParser.json()); // aqui estamos usando o bodyParser.json() que é um middleware que permite que o servidor receba dados no formato JSON

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