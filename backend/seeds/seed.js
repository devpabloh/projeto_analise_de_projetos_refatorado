import bcrypt from "bcrypt";
import sequelize from "../config/database.js";
import User from "../models/user.js";
import '../models/associations.js'; // Importa as associações entre os modelos

async function seed(){
  try {
    // Força a recriação de todas as tabelas
    await sequelize.sync({force: true});

    const passwordAdmin = await bcrypt.hash('senhaAdmin', 10);
    const passwordCommon = await bcrypt.hash('senhaComum', 10); // Fixed typo: senhaComun -> senhaComum

    // Cria os usuários iniciais
    await User.bulkCreate([
      {name: 'administrador', email: "admin@example.com", password: passwordAdmin, role: 'admin'}, // Fixed typo: exemple -> example
      {name: 'comum', email: "comun@example.com", password: passwordCommon, role: 'common'} // Fixed typo: exemple -> example
    ]);

    console.log("Seed concluído!");
    process.exit();
  } catch (error) {
    console.error('erro no seed', error);
    process.exit(1);
  }
}

seed();