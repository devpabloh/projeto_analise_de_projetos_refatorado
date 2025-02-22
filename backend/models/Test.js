import { DataTypes } from "sequelize"; // importando o DataTypes do sequelize, que serve para trabalhar com os tipos de dados do banco de dados
import sequelize from "../config/database.js"; // importando o Sequelize do arquivo database.js, que serve para trabalhar com o banco de dados, nele definimos as configurações do banco de dados, lá definimos configurações como host, usuário, senha, banco de dados, etc.
import Project from "./project.js"; // importando o model do projeto, que é o modelo do projeto, nele definimos os campos do projeto, como nome, descrição, fase, data de início, data de entrega, etc. Também definimos as relações entre os projetos e os usuários. Aqui vamos utilizar para definir a relação entre testes e projetos.

const Test = sequelize.define('Test', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    testType: {type: DataTypes.STRING}, // tipo do teste
    tools: {type: DataTypes.STRING}, // ferramentas utilizadas
    frequency: {type: DataTypes.STRING} // frequência do teste
})

Test.belongsTo(Project, {foreignKey: 'projectId', as: 'project'}); // belongsTo é um método que define que um teste pertence a um projeto. foreignKey é o nome do campo que vai armazenar o id do projeto. as é o nome do campo que vai armazenar o projeto.

export default Test;