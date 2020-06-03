import app  from './app';
//IMPORTANTE: se requiere importar el modulo de babel pollyfil para hacer el build a la aplicacion
import '@babel/polyfill';

async function main(){
  await app.listen(4000);
  console.log("server on port 4000");
};

main();