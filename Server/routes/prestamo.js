const express = require('express');
const _ = require('underscore');
const { verificatoken } = require('../middlewares/autentificacion');
const Prestamo = require('../models/prestamo');
const app = express();

app.post('/prestamo', [verificatoken], (req, res) => {
    let body = req.body;
    let prestamo = new Prestamo({
        libro: body.libro,
        fechaprestamo: body.fechaprestamo,
        fecharegreso: body.fecharegreso,
        usuario: body.usuario
    });

    prestamo.save((err, proDB) => {
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

app.get('/prestamo', (req, res) => {
    Prestamo.find({ estado: true })
        .exec((err, Prestamo) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            return res.status(200).json({
                ok: true,
                count: Prestamo.length,
                Prestamo
            });

        });
});

app.put('/prestamo', [verificatoken], (req, res) => {
    let id = req.body.id;
    let body = _.pick(req.body, ['id', 'libro', ' fechaprestamo', 'fecharegreso', 'usuario']);

    Prestamo.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, catDB) => {
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

app.delete('/prestamo', [verificatoken], (req, res) => {
    let id = req.body.id;
    Prestamo.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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