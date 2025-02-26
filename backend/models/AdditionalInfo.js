import { DataTypes } from "sequelize"; // importando o DataTypes do sequelize, que serve para trabalhar com os tipos de dados do banco de dados
import sequelize from "../config/database.js"; // importando a conexão com o banco de dados que está em database.js

// Aqui estamos criando uma variável AdditionalInfo que vai receber um novo objeto sequelize.define, nesse objeto estamos passando o nome da tabela que vai ser criada no banco de dados, os campos que vamos utilizar e suas configurações de tipo de dados.
const AdditionalInfo = sequelize.define('AdditionalInfo', {
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
    }, // aqui estamos definindo o id da tabela, o id é o primaryKey e o autoIncrement é o que vai gerar o id automaticamente
    challengesFaced: {
        type: DataTypes.TEXT
    },
    identifiedRisks: {
        type: DataTypes.TEXT
    },
    additionalComments: {
        type: DataTypes.TEXT
    }
})

export default AdditionalInfo