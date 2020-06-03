// configurar paquete para variables de entorno
import 'dotenv/config';

import express,{json} from 'express';
import morgan from 'morgan';
import bodyparser from 'body-parser';

//importar  paraquetes  authentication
import passport      from 'passport';
import JwtStrategy   from 'passport-jwt/lib/strategy';
import LocalStrategy from 'passport-local/lib/strategy';
import ExtractJwt    from 'passport-jwt/lib/extract_jwt';
import bcrypt        from 'bcrypt';

//importing Routes
import projectRoutes from './routes/projects';
import taskRoutes from './routes/tasks';
import authRoutes from './routes/users';

//models Auth
import User from './models/Users';
import Role from './models/Roles';

// implementacion de captura de error para middleware
import { createResponder } from './utils/implements.errors'

// import clase error
import {
    HttpError,
    HttpNotFound,
    HttpInternalServerError,
    HttpBadRequest,
    HttpUnauthorized,
    HttpForbidden
} from './utils/clases_error';

import responseCodes from './utils/types_errors';

//intialization
const app = express();

//MIDDLEWARES

/** config de estrategia local de passport ******/
passport.use( new LocalStrategy(
    {usernameField:'username',
    passwordField:'password',
    session:'false'
    },async (username,password,done)=>{
        console.log('Ejecutando callbak Verify "Estrategia local" ');

        try {

           let usuario =  await User.findOne({
               attributes:['username','id','password'],
               where:{
                   username:username
               }
            });

            console.log('Usuario encontrado:',usuario);

            if (usuario==null || usuario==undefined ) return done(null,false);// usuario incorrecto
            else if(!bcrypt.compareSync(password,usuario.password)){
                return done(null,false);// password incorrecto
            }

            return done(null,usuario);
            
        } catch (e) {
            console.log(`ocurrio el error: ${e}`);
            return done(e,null);
        }

    }));

/** config de estrategia jwt de passport ******/
    let opts = {};

    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.JWT_SECRET;
    opts.algorithms = process.env.JWT_ALGORITHM

passport.use(new JwtStrategy(opts,async (jwt_payload, done)=>{
    console.log("ejecutando *callback verify* de estategia jwt");

    let iduser = jwt_payload.sub;
    try {

        let usuario = await User.findOne({
            where:{
                id:iduser
            }
        });

        if(usuario==null || usuario==undefined)
        return done(null,false);
        else
        return done(null,usuario);
        
    } catch (e) {
        return done(e,null);
    }
}));

// middlewar para captura de errores
const attachResponder  =  (req,res,next)=>{
    // console.log('Ejecutando primera middle ware y el objeto res.respond: ');
    // console.log(createResponder(req,res,next));
    res.respond =  createResponder(req,res,next);
    console.log('Metodo para Retornar Error',res.respond);
    next();
}

const errorHandler =  (error,req,res,next)=>{
    console.log('Ejecutando ultima middleware y el objeto error: ');
    console.log(error);
    if(error instanceof HttpError){
        res.status(error.statusCode).json(error.data);
    }
    else{
        res.status(responseCodes.INTERNAL_SERVER_ERROR);
    }
}

//conectamos todos los middleware de terceros
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use(attachResponder);

app.use(passport.initialize());

//.use(morgan('dev')) : muestra por consola las peticiones http
app.use(morgan('dev'));

// use(json()) : middleware para que el servidor web puede entender los json enviados del cliente
app.use(json());


// definir las routes de mi aplicacion
// para usar las rutas se llama al metodo .use('/rutaPredefinida/miruta/',objetoRouter)
app.use('/api/auth',authRoutes);
app.use('/api/projects',projectRoutes);
app.use('/api/tasks',taskRoutes);

// middleware captador de error final
// app.use(errorHandler);

export default app;