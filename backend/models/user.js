import { DataTypes } from "sequelize"; // importando o DataTypes do sequelize, que serve para trabalhar com os tipos de dados do banco de dados
import sequelize from "../config/database.js"; // importando o Sequilize do arquivo database.js, que serve para trabalhar com o banco de dados, nele definimos as configurações do banco de dados

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {type: DataTypes.STRING, allowNull: false}, // allowNull: false significa que o campo não pode ser nulo
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false}
})

