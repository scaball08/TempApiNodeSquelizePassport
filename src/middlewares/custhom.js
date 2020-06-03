import passport from 'passport';


export function ensureAuthenticated(req,res,next){

    passport.authenticate('jwt',{session:false},(error,user,info)=>{
        if(info) next(new Error('Interl Error'));

        if(error) next(new Error('Interl Password incorrecto'));

        if(error) next(new Error('Interl Isuario incorrecto'));

        // inyectamos los datos del usuario en el req
        req.user = user;
        next();
    })(req,res,next);

}