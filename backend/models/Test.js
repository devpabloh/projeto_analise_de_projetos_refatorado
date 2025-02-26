import { DataTypes } from "sequelize"; // importando o DataTypes do sequelize, que serve para trabalhar com os tipos de dados do banco de dados
import sequelize from "../config/database.js"; // importando o Sequelize do arquivo database.js, que serve para trabalhar com o banco de dados, nele definimos as configurações do banco de dados, lá definimos configurações como host, usuário, senha, banco de dados, etc.

const Test = sequelize.define('Test', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    projectId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Projects',
            key: 'id'
        }
    },
    carriedOutTests: {
        type: DataTypes.STRING
    },
    selectedTests: {
        type: DataTypes.JSON,  // Using JSON type for array storage
        defaultValue: []
    },
    otherTestsDescription: {
        type: DataTypes.TEXT
    },
    frequencyAndAutomation: {
        type: DataTypes.STRING
    },
    testingToolsUsed: {
        type: DataTypes.TEXT
    }
})

export default Test;