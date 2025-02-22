import { DataTypes } from "sequelize"; // importando o DataTypes do sequelize, que serve para trabalhar com os tipos de dados do banco de dados
import sequelize from "../config/database.js"; // importando o Sequilize do arquivo database.js, que serve para trabalhar com o banco de dados, nele definimos as configurações do banco de dados

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {type: DataTypes.STRING, allowNull: false}, // allowNull: false significa que o campo não pode ser nulo
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.ENUM('common', 'admin'), defaultValue: 'common' } // enum é um tipo de dado que permite que o campo tenha apenas um valor definido, no caso, 'common' ou 'admin'. defaultValue é o valor padrão do campo, no caso, 'common' ou usuário comum.
});

export default User;
