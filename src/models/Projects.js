import Sequelize  from 'sequelize';
import {sequelize}  from '../database/database' 
import Task from './Tasks';


const Project = sequelize.define('project',
{
    id:{
    type: Sequelize.INTEGER,
    primaryKey:true
    },
    name:{
        type:Sequelize.TEXT

    },
    priority:{
        type: Sequelize.INTEGER
    },
    description:{
        type:Sequelize.TEXT
    },
    deliverydate:{
        type:Sequelize.DATE
    }
},{
    timestamps:false
});

// hasMany() : definimos que esta relacionados a muchos
//parametros(modeloraRelacionado,{foreingKey:'CampoDeTablaRelacionada',sourceKey:'campoTablaActual'})
Project.hasMany(Task,{foreignKey:'project_id',sourceKey:'id'});
Task.belongsTo(Project,{foreignKey:'project_id',sourceKey:'id'});

export default Project;