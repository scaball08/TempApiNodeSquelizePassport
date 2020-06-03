import Sequelize from 'sequelize';
import {sequelize} from '../database/database';
import Role from './Roles';



const User = sequelize.define('user',{
    id:{type:Sequelize.INTEGER, primaryKey:true},
    username:{type:Sequelize.TEXT},
    first_name:{type:Sequelize.TEXT},
    last_name:{type:Sequelize.TEXT},
    email:{type:Sequelize.TEXT},
    password:{type:Sequelize.TEXT},
    login_count:{type:Sequelize.INTEGER}
},{
    timestamps:false
});


User.belongsToMany(Role,{as:'roles_user',through:'usuario_roles',foreignKey:'user_id',otherKey:'role_id'});
Role.belongsToMany(User,{as:'users_role',through:'usuario_roles',foreignKey:'role_id',otherKey:'user_id'});


// Crear tablas pendientes:
sequelize.sync();
export default User;