//PUERTO
process.env.PORT = process.env.PORT || 3002;
// Declaracion de entorno, funcion que nos dara en que ambiente estamos
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//Conexion a la base de datios 
let urlDB;

if (process.env.NODE_ENV === 'dev') { //Son todas las funciones y procesos que tienen el amibiente del desarrollo que es local 
    urlDB = 'mongodb://localhost:27017/Biblioteca';
} else { //Ambiente de produccion nube = Heroku
    urlDB = 'mongodb+srv://admin:WsLgybDun0V1DwtE@cluster0-idtoj.mongodb.net/Biblioteca';
}

//Tenemos dos ambientes el de produccion y el de desarrollo 

//env = entorno  
process.env.URLDB = urlDB;

// firma de jwt 

process.env.SGIN = process.env.SGIN || 'firma_super_secreta';
// tiempo de esperacion 

process.env.CADUCIDAD = process.env.CADUCIDAD || '3h';