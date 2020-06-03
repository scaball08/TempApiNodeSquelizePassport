import responseCodes from './types_errors';


export class HttpError extends Error {

    constructor({message,name,statusCode,data}){
        super(message);

        this.name =  name;
        this.statusCode = statusCode;
        this.data = data;
        
        // la propieda stack contiene la pila de llamada de mi objeto
        // mientras que con el metodo(captureStackTrace.(this,contextoActual))
        // omite la llamada de la funcion actual
        // asi solo obtenemos  el origen real del error
        Error.captureStackTrace(this,HttpError);
    }


}

export class HttpBadRequest extends HttpError{
    constructor(message = ' Error en la  Peticion SC', data){

        super({
            message,
            name:'HttpBadRequest',
            statusCode:responseCodes.BAD_REQUEST,
            data
        });

    }
}

export class HttpNotFound extends HttpError {

    constructor(message='No encontrado SC',data){
        super({
            message,
            name:'HttpNotFound',
            statusCode:responseCodes.NO_ENCONTRADO,
            data
        });
    }
}

export class HttpInternalServerError extends HttpError {

    constructor(message='Internal Server Error SC',data){
        super({
            message,
            name:'HttpInternalServerError',
            statusCode:responseCodes.INTERNAL_SERVER_ERROR,
            data
        });
    }
}

export class HttpUnauthorized extends HttpError {

    constructor(message='Error usuario no autorizado SC',data){
        super({
            message,
            name:'HttpUnauthorized',
            statusCode:responseCodes.NO_AHUTORIZADO,
            data
        });
    }
}

export class HttpForbidden extends HttpError {

    constructor(message='Acceso Prohibido SC',data){
        super({
            message,
            name:'HttpForbidden',
            statusCode:responseCodes.PROHIBIDO,
            data
        });
    }
}

