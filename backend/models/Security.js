import {DataTypes} from "sequelize";
import sequelize from "../config/database.js"
import Project from "./project.js";

const Security = sequelize.define('Security', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    measures: {type: DataTypes.STRING},
    compliance: {type: DataTypes.STRING}, // compliance recebe um valor de um array de strings, exemplo: ['ISO 27001', 'NIST 800-53']
    tools: {type: DataTypes.STRING}
})

Security.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });
Project.hasMany(Security, { foreignKey: 'projectId', as: 'security' });

export default Security;