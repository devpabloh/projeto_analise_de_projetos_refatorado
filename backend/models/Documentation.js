import {DataTypes} from "sequelize"; // Importando o módulo DataTypes do Sequelize que serve para definir os tipos de dados das colunas do banco de dados
import sequelize from "../config/database.js" // Importando a conexão com o banco de dados que está em database.js, nesse arquivo sequilize que estamos importando é a conexão com o banco de dados, aonde definimos o nome do banco de dados, o usuário, a senha, o host e o banco de dados que vamos usar

// Aqui estamos criando uma variavel Documentation que vai receber um novo objeto sequelize.define, nesse objeto estamos passando o nome da tabela que vai ser criada no banco de dados, nesse caso a tabela vai ser chamada de documentations
const Documentation = sequelize.define('documentations', { 
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
    technicalDocumentation: {
        type: DataTypes.TEXT
    },
    linkTechnicalDocumentation: {
        type: DataTypes.STRING
    },
    updatingTechnicalDocumentation: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    updateTechnicalVersion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    functionalDocumentation: {
        type: DataTypes.TEXT
    },
    linkFunctionalDocumentation: {
        type: DataTypes.STRING
    },
    updatingFunctionalDocumentation: {
        type: DataTypes.DATEONLY
    },
    updateFunctionalVersion: {
        type: DataTypes.STRING
    }
})

export default Documentation;
