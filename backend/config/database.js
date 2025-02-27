import {Sequelize} from 'sequelize' // importando sequelize que serve para trabalhar com banco de dados 

// aqui estamos criando uma variavel sequalize que vai receber um novo objeto sequalize
const sequelize = new Sequelize('analiseDeProjetos', 'postgres', '@Tais84671514', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false, // Add this to reduce console noise
    pool: {         // Add connection pool settings
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

export default sequelize