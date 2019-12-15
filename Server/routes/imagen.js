const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.get('/imagen/:ruta/:img', (req, res) => {
    let ruta = req.params.ruta;
    let img = req.params.img;
    let rutaImagen = path.resolve(__dirname, `../../uploads/${ruta}/${img}`);
    let noImage = path.resolve(__dirname, '../acess/noimgen.jpg');

    if (fs.existsSync(rutaImagen)) {
        return res.sendFile(rutaImagen);
    } else {
        return res.sendFile(noImage);

    }

});

module.exports = app;