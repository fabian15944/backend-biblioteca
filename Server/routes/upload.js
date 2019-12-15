const express = require('express');
const fileUpload = require('express-fileupload');
const uniqid = require('uniqid');
const path = require('path');
const fs = require('fs');
const app = express();
const { verificatoken } = require('../middlewares/autentificacion');
const Usuario = require('../models/usuario');
const Libro = require('../models/libro');

app.use(fileUpload());

app.put('/upload/:ruta/:id', [verificatoken], (req, res) => {
    let id = req.params.id;
    let ruta = req.params.ruta;
    let archivo = req.files.archivo;
    let nombre = uniqid() + path.extname(archivo.name); //Path va a traer la extension del archivo.name

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se a seleccionado ningun archivo'
            }
        })
    }

    let validExtensions = ['image/png', 'image/jpg', 'image/gif', 'image/jpeg'];
    if (!validExtensions.includes(archivo.mimetype)) { //Funcion que checa que la extencion este en el array, mimetype va a lanzar el tipo de la extension del archivo
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Solo las extensiones <png, jpg, gif, jpeg> son validas'
            }
        });
    }

    archivo.mv(`uploads/${ruta}/${nombre}`, (err) => { //Es todo el path de la imagen
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
    });

    switch (ruta) { //Es como un if, evaluara la variable, acttualizamos una collecion 
        case 'libro':
            imagenLibro(id, res, nombre)
            break;

        case 'usuario':
            imagenUsuario(id, res, nombre);
            break;
        default:
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Ruta no valida'
                }
            });
            break;
    }

});

function imagenUsuario(id, res, nombreImagen) { //Actualizar el modelo usuario El hilo del usuario 
    Usuario.findById(id, (err, usr) => {
        if (err) {
            borrarArchivo(nombreImagen, 'usuario');
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usr) {
            borrarArchivo(nombreImagen, 'usuario');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no existe'
                }
            });
        }
        usr.img = nombreImagen;

        usr.save((err, usrDB) => {
            if (err) {
                borrarArchivo(nombreImagen, 'usuario');
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.status(200).json({
                ok: true,
                usrDB
            });
        });

    });
}

function imagenLibro(id, res, nombreImagen) { //Actualizar el modelo producto  Relaciona la imagen con una colleccion 
    Libro.findById(id, (err, prod) => {
        if (err) {
            borrarArchivo(nombreImagen, 'libro');
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!prod) {
            borrarArchivo(nombreImagen, 'libro');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'libro no existe'
                }
            });
        }
        prod.img = nombreImagen;

        prod.save((err, prodDB) => {
            if (err) {
                borrarArchivo(nombreImagen, 'libro');
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.status(200).json({
                ok: true,
                prodDB
            });
        });

    });
}

function borrarArchivo(nombreImagen, ruta) {
    let pathImg = path.resolve(__dirname, `../../uploads/${ruta}/${nombreImagen}`); //Resolvera la ruta donde se encuentra la imagen 
    if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg);

    }
    console.log('Imagen borrada con exito');
}

module.exports = app;