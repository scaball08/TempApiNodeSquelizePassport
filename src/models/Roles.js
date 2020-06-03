import Sequelize from 'sequelize';
import {sequelize} from '../database/database'


const Role = sequelize.define('role',
{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    nombre:{
        type:Sequelize.TEXT
    }
},{
    timestamps:false
}
); 

export default Role;