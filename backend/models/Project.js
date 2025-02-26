// os models são os schemas do banco de dados, eles definem como os dados serão armazenados no banco de dados, e são usados para fazer as consultas no banco de dados. Os schemas são definidos no arquivo database.js, e são usados no arquivo user.js, que é o model do usuário.

import {DataTypes} from "sequelize"; // importando o DataTypes do sequelize, que serve para trabalhar com os tipos de dados do banco de dados
import sequelize from "../config/database.js"; // importando o Sequilize do arquivo database.js, que serve para trabalhar com o banco de dados, nele definimos as configurações do banco de dados, lá definimos configurações como host, usuário, senha, banco de dados, etc.

const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    projectName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    projectDescription: {
        type: DataTypes.TEXT
    },
    responsibleFillingOut: {
        type: DataTypes.STRING,
        allowNull: false
    },
    responsibleContact: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fillingDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    developmentPhase: {
        type: DataTypes.STRING
    },
    carriedOutTests: {
        type: DataTypes.STRING
    },
    selectedTests: {
        type: DataTypes.JSON // For array storage
    },
    otherTestsDescription: {
        type: DataTypes.TEXT
    },
    frequencyAndAutomation: {
        type: DataTypes.STRING
    },
    testingToolsUsed: {
        type: DataTypes.TEXT
    },
    developmentEnvironment: {
        type: DataTypes.STRING
    },
    approvalEnvironment: {
        type: DataTypes.STRING
    },
    productionEnvironment: {
        type: DataTypes.STRING
    },
    deploymentEnvironmentNotes: {
        type: DataTypes.TEXT
    },
    hasDocumentation: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    documentationType: {
        type: DataTypes.STRING
    }
})

export default Project; // exportando o model do projeto, que é o model do projeto, nele definimos os campos do projeto, como nome, descrição, fase, data de início, data de entrega, etc. Também definimos as relações entre os projetos e os usuários.