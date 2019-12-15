const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { verificatoken } = require('../middlewares/autentificacion');
const Libro = require('../models/libro');
const app = express();

app.post('/libro', [verificatoken], (req, res) => {
    let body = req.body;
    let libro = new Libro({
        nombre: body.nombre,
        categoria: body.categoria,
        img: body.img,
        usuario: body.usuario
    });

    libro.save((err, proDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err

            });
        }
        return res.status(200).json({
            ok: true,
            proDB
        });
    });
});

app.put('/libro', [verificatoken], (req, res) => {
    let id = req.body.id;
    let body = _.pick(req.body, ['id', 'nombre', 'categoria', 'img', 'usuario']);

    Libro.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, prodDB) => {
        if (err) {
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

app.get('/libro', [verificatoken], (req, res) => {
    Libro.find({ disponible: true })
        .exec((err, Libro) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: Libro.length,
                Libro
            });

        });
});

app.delete('/libro', [verificatoken], (req, res) => {
    let id = req.body.id;

    Libro.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.status(200).json({
            ok: true,
            resp
        });
    });

});
module.exports = app;