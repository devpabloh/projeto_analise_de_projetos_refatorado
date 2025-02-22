import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Project from "./Project.js";

const AdditionalInfo = sequelize.define('AdditionalInfo', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    integrations: {type: DataTypes.TEXT},
    scalability: {type: DataTypes.STRING},
    userFeedback: {type: DataTypes.TEXT},
    maturityScore: {type: DataTypes.FLOAT},
    checklist: {type: DataTypes.TEXT}
})

AdditionalInfo.belongsTo(Project, {foreignKey: 'projectId', as: 'project'})
Project.hasMany('AdditionalInfo', {foreignKey: 'productId', as: 'AdditionalInfo'})

export default AdditionalInfo