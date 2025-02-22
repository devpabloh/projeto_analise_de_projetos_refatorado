import {DataTypes} from "sequelize"; // Importando o módulo DataTypes do Sequelize que serve para definir os tipos de dados das colunas do banco de dados
import sequelize from "../config/database.js" // Importando a conexão com o banco de dados que está em database.js, nesse arquivo sequilize que estamos importando é a conexão com o banco de dados, aonde definimos o nome do banco de dados, o usuário, a senha, o host e o banco de dados que vamos usar
import Project from "./project.js"; // Importando o modelo Project que está em Project.js, nesse arquivo Project que estamos importando é o modelo que vai ser usado para criar a tabela no banco de dados, aonde definimos o nome da tabela, os campos da tabela e o tipo de dados de cada campo

// Aqui estamos criando uma variavel Documentation que vai receber um novo objeto sequelize.define, nesse objeto estamos passando o nome da tabela que vai ser criada no banco de dados, nesse caso a tabela vai ser chamada de documentations
const Documentation = sequelize.define('documentations', { 
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.ENUM('Técnica', 'Funcional')},
    status: { type: DataTypes.STRING },
    link: { type: DataTypes.STRING },
    lastUpdated: { type: DataTypes.DATE }
})

Documentation.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });
Project.hasMany(Documentation, { foreignKey: 'projectId', as: 'documentations' });

export default Documentation;
