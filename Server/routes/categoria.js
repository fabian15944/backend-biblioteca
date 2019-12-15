const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { verificatoken } = require('../middlewares/autentificacion');
const Categoria = require('../models/categoria');
const app = express();

app.post('/categoria', [verificatoken], (req, res) => {
    let body = req.body;
    let categoria = new Categoria({
        nombre: body.nombre,
        usuario: body.usuario
    });

    categoria.save((err, catDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            catDB
        });
    });
});

app.put('/categoria', [verificatoken], (req, res) => {
    let id = req.body.id;
    let body = _.pick(req.body, ['id', 'nombre', 'usuario']);

    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, catDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            catDB
        });
    });
});

app.delete('/categoria', [verificatoken], (req, res) => {
    let id = req.body.id;
    Categoria.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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

app.get('/categoria', [verificatoken], (req, res) => {
    Categoria.find({ estado: true })
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            return res.status(200).json({
                ok: true,
                count: categorias.length,
                categorias
            });

        });
});

module.exports = app;