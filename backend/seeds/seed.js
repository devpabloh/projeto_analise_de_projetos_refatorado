import bcrypt from "bcrypt";
import sequelize from "../config/database.js";
import User from "../models/user.js";
import '../models/associations.js'; // Importa as associações entre os modelos

async function seed(){
  try {
    // Força a recriação de todas as tabelas
    await sequelize.sync({force: true});

    const passwordAdmin = await bcrypt.hash('senhaAdmin', 10);
    const passwordCommon = await bcrypt.hash('senhaComun', 10);

    // Cria os usuários iniciais
    await User.bulkCreate([
      {name: 'administrador', email: "admin@exemple.com", password: passwordAdmin, role: 'admin'},
      {name: 'comum', email: "comun@exemple.com", password: passwordCommon, role: 'common'}
    ]);

    console.log("Seed concluído!");
    process.exit();
  } catch (error) {
    console.error('erro no seed', error);
    process.exit(1);
  }
}

seed();