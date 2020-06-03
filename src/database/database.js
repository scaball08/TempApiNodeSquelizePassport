import Sequelize from 'sequelize';  

// Crear cadena de conexion 
 export const sequelize =  new Sequelize(
    'postgres',
    'postgres',
    'sergio',
    {
        host:'localhost',
        dialect:'postgres',
        pool:{
            max:5,
            min:0,
            require:30000,
            idle:10000
        },
        loggin:false
    }
);