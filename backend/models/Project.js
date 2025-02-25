// os models são os schemas do banco de dados, eles definem como os dados serão armazenados no banco de dados, e são usados para fazer as consultas no banco de dados. Os schemas são definidos no arquivo database.js, e são usados no arquivo user.js, que é o model do usuário.

import {DataTypes} from "sequelize"; // importando o DataTypes do sequelize, que serve para trabalhar com os tipos de dados do banco de dados
import sequelize from "../config/database.js"; // importando o Sequilize do arquivo database.js, que serve para trabalhar com o banco de dados, nele definimos as configurações do banco de dados, lá definimos configurações como host, usuário, senha, banco de dados, etc.
import User from "./User.js"; // importando o model do usuário, que é o modelo do usuário, nele definimos os campos do usuário, como nome, email, senha, etc. que aqui vamos usar para definir os projetos que serão armazenados no banco de dados de acordo com o modelo do usuário.

const Project = sequelize.define('Project', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    projectName: { type: DataTypes.STRING, allowNull: false }, // nome do projeto
    projectDescription: { type: DataTypes.TEXT }, // descrição do projeto
    responsibleFillingOut: { type: DataTypes.STRING }, // responsável pelo preenchimento do formulário
    responsibleContact: { type: DataTypes.STRING }, // contato do responsável pelo preenchimento do formulário
    fillingDate: { type: DataTypes.DATE }, // data de preenchimento do formulário
    currentPhaseProject: {type: DataTypes.STRING }, // fase atual do projeto
    startDate: {type: DataTypes.DATE},
    deadline: {type: DataTypes.DATE}
})

Project.belongsTo(User, { foreignKey: 'userId', as: 'Owner' });  // belongsTo é um método que define que um projeto pertence a um usuário. foreignKey é o nome do campo que vai armazenar o id do usuário. as é o nome do campo que vai armazenar o usuário.
User.hasMany(Project, { foreignKey: 'userId', as: 'projects'});  // hasMany é um método que define que um usuário tem muitos projetos. foreignKey é o nome do campo que vai armazenar o id do usuário. as é o nome do campo que vai armazenar os projetos.

export default Project; // exportando o model do projeto, que é o model do projeto, nele definimos os campos do projeto, como nome, descrição, fase, data de início, data de entrega, etc. Também definimos as relações entre os projetos e os usuários.