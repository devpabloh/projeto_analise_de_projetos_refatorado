import { DataTypes } from "sequelize"; // importando o DataTypes do sequelize, que serve para trabalhar com os tipos de dados do banco de dados
import sequelize from "../config/database.js"; // importando a conexão com o banco de dados que está em database.js
import Project from "./project.js"; // importando o modelo Project que está em Project.js, nesse arquivo Project que estamos importando foi o modelo de tabela criado anteriormente. Aqui nós vamos utilizar para definir a relação entre informações adicionais e projetos.

// Aqui estamos criando uma variável AdditionalInfo que vai receber um novo objeto sequelize.define, nesse objeto estamos passando o nome da tabela que vai ser criada no banco de dados, os campos que vamos utilizar e suas configurações de tipo de dados.
const AdditionalInfo = sequelize.define('AdditionalInfo', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, // aqui estamos definindo o id da tabela, o id é o primaryKey e o autoIncrement é o que vai gerar o id automaticamente
    integrations: {type: DataTypes.TEXT}, // aqui estamos definindo o campo integrations, o tipo de dados é o TEXT, o TEXT é o tipo de dados para armazenar texto longo.
    scalability: {type: DataTypes.STRING},
    userFeedback: {type: DataTypes.TEXT},
    maturityScore: {type: DataTypes.FLOAT}, // aqui estamos definindo o campo maturityScore, o tipo de dados é o FLOAT, o FLOAT é o tipo de dados para armazenar numeros decimais.
    checklist: {type: DataTypes.TEXT}
})

AdditionalInfo.belongsTo(Project, {foreignKey: 'projectId', as: 'project'}) // belongsTo é um método que define que um additionalInfo pertence a um project. foreignKey é o nome do campo que vai armazenar o id do project. as é o nome do campo que vai armazenar o project.
Project.hasMany(AdditionalInfo, { foreignKey: 'projectId', as: 'additionalInfos' }) // hasMany é um método que define que um project tem muitos additionalInfos. foreignKey é o nome do campo que vai armazenar o id do project. as é o nome do campo que vai armazenar o project.

export default AdditionalInfo