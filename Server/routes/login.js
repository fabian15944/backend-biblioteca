const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verificatoken } = require('../middlewares/autentificacion');
const Usuario = require('../models/usuario');
const app = express();


app.post('/login', (req, res) => {
    let body = req.body;
    Usuario.findOne({ email: body.email }, (err, UsuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!UsuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "?usuario o contraseña incorrecta"
                }
            });
        }

        if (!bcrypt.compareSync(body.password, UsuarioDB.password)) {
            if (UsuarioDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: " contraseña ?incorrecta"
                    }
                });
            }
        };

        let token = jwt.sign({
            usuario: UsuarioDB
        }, process.env.SGIN, { expiresIn: process.env.CADUCIDAD });

        return res.status(200).json({
            ok: true,
            usuario: UsuarioDB,
            token
        });

    });
}); // return res.status(200).json({
//     ok: true,
// 




module.exports = app;