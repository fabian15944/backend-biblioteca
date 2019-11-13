require('./config/config');
const express = require('express');
const moongose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

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
    console.log('Base de datos oline');
});
//Puerto de escucha de la pliccion
app.listen(process.env.PORT, () => {
    console.log('Escuchando por el puerto ', process.env.PORT)
});