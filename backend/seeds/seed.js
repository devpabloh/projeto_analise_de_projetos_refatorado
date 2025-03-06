import bcrypt from "bcrypt";
import sequelize from "../config/database.js";
import User from "../models/user.js";
import '../models/associations.js'; 

async function seed(){
  try {
    
    await sequelize.sync({force: true});

    const passwordAdmin = await bcrypt.hash('senhaAdmin', 10);
    const passwordCommon = await bcrypt.hash('senhaComum', 10); 

    // Cria os usuários iniciais
    await User.bulkCreate([
      {name: 'administrador', email: "admin@example.com", password: passwordAdmin, role: 'admin'}, 
      {name: 'comum', email: "comun@example.com", password: passwordCommon, role: 'common'} 
    ]);

    console.log("Seed concluído!");
    process.exit();
  } catch (error) {
    console.error('erro no seed', error);
    process.exit(1);
  }
}

seed();