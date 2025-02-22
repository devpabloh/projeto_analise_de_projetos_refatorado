import { DataTypes} from "sequelize";
import sequelize from "../config/database.js";
import Project from "./Project.js";

const Team = sequelize.define('Team', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    memberName: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING },
    contact: {type: DataTypes.STRING},
})

Team.belongsTo(Project, {foreignKey: 'projectId', as: 'project'})
Project.hasMany(Team, {foreignKey: 'projectId', as: 'teams'})

export default Team;
