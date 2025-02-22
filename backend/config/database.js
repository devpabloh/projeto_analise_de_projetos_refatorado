import {Sequelize} from 'sequelize' // importando sequelize que serve para trabalhar com banco de dados 

// aqui estamos criando uma variavel sequalize que vai receber um novo objeto sequalize
const sequelize = new Sequelize('analiseDeProjetos', 'postgres', '@Tais84671514', {
    host: 'localhost', // especificando o host do banco de dados, host é o computador que vai rodar o banco de dados
    dialect: 'postgres' // especificando o banco de dados que vai ser usado
})

export default sequelize