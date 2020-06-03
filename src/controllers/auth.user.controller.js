import User from '../models/Users';
import bcrypt from 'bcrypt';
import passport from 'passport';
import jwt from 'jsonwebtoken';

// import clase error
import {
    HttpError,
    HttpNotFound,
    HttpInternalServerError,
    HttpBadRequest,
    HttpUnauthorized,
    HttpForbidden
} from '../utils/clases_error';

export async function register(req,res,next){

     

    try {
        const userName =  await User.findOne({
            attributes:['username'],
            where:{
                username:req.body.username
            }
        });
        if(userName){
            next(new Error('Mi Error buscar'));
        }

        const hashPass = bcrypt.hashSync(req.body.password,parseInt(process.env.BCRYPT_ROUNDS));

        let newUser  =  await User.create({
        username: req.body.username,
        first_name: req.body.first_name || '',
        last_name: req.body.last_name || '',
        email: req.body.email || '',
        password: hashPass,
        login_count: 0
        },{
            fields:[
             'username'
            ,'first_name'
            ,'last_name'
            ,'email'
            ,'password'
            ,'login_count']        
        });

        console.log('Se Inserto correctamente',newUser);
        return res.json({
            message:'Usuario Registrado exitosamente',
            data:newUser
        });


    } catch (error) {
        // const errorInterno =  new HttpInternalServerError('Error al Registrar',{});
        console.log('Mensaje Test',error);
        next(error);
        // next(res.respond.internalServerError(errorInterno,{}));
    }


}

export async function login(req,res,next){

    passport.authenticate('local',{session:false},(error,user)=>{
        try {
        if(error||!user){
            next(res.respond.notFound(error,{data:'Error:login'}));
        }
        //carga util o payload
        
        const payload = {
            sub:user.id,
            exp:Date.now() + parseInt(process.env.JWT_LIFETIME),
            username:user.username
        };

        //crear token  con el metodo .sign(payload,llave_privada,{tipo_de_algoritmo})
        const token = jwt.sign(JSON.stringify(payload),process.env.JWT_SECRET,{algorithm:process.env.JWT_ALGORITHM});

        res.json({
            data:{
                token:token
            }
        });

        return;
        } catch (error) {
            res.status(404).json({error: "endpoint not found", codeError:error});
            return;
        }
    })(req,res);

}