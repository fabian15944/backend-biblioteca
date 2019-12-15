require('./config/config');
const express = require('express');
const moongose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

// Habilita CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, token'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});

//Parse aplicacion /x-www-from-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//Parse de formato  a application/json 
app.use(bodyParser.json());

//Archivo agrupador de dutas
app.use(require('./routes/index'));

//Conexion a la base de datos
moongose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err, resp) => {
    if (err) throw err;
    console.log('Base de datos de Biblioteca');
});
//Puerto de escucha de la pliccion
app.listen(process.env.PORT, () => {
    console.log('Escuchando por el puerto ', process.env.PORT)
});