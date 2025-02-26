import User from './user.js';
import Project from './Project.js';
import Documentation from './Documentation.js';
import Environment from './Environment.js';
import Security from './Security.js';
import Team from './Team.js';
import Test from './Test.js';
import AdditionalInfo from './AdditionalInfo.js';

// User <-> Project associations
User.hasMany(Project, { foreignKey: 'userId', as: 'projects' });
Project.belongsTo(User, { foreignKey: 'userId', as: 'Owner' });

// Project <-> Documentation associations
Project.hasMany(Documentation, { foreignKey: 'projectId', as: 'documentations' });
Documentation.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

// Project <-> Environment associations
Project.hasMany(Environment, { foreignKey: 'projectId', as: 'environments' });
Environment.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

// Project <-> Security associations
Project.hasMany(Security, { foreignKey: 'projectId', as: 'security' });
Security.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

// Project <-> Team associations
Project.hasMany(Team, { foreignKey: 'projectId', as: 'Teams' });
Team.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

// Project <-> Test associations
Project.hasMany(Test, { foreignKey: 'projectId', as: 'tests' });
Test.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

// Project <-> AdditionalInfo associations
Project.hasMany(AdditionalInfo, { foreignKey: 'projectId', as: 'additionalInfos' });
AdditionalInfo.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

export { User, Project, Documentation, Environment, Security, Team, Test, AdditionalInfo };