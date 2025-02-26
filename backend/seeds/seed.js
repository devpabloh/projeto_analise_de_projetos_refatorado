import bcrypt from "bcrypt";
import sequelize from "../config/database.js";
import User from "../models/User.js";

async function seed(){
  try {
    
    await sequelize.sync({force: true})

    const passwordAdmin = await bcrypt.hash('senhaAdmin', 10)
    const passwordCommon = await bcrypt.hash('senhaComun', 10)

    await User.bulkCreate([
      {name: 'administrador', email: "admin@exemple.com", password: passwordAdmin, role: 'admin'},
      {name: 'comum', email: "  ", password: passwordCommon, role: 'common'}
    ])
    console.log("Seed concluído!")
    process.exit()
  } catch (error) {
    console.error('erro no seed', error)
    process.exit(1)
  }
}

seed()