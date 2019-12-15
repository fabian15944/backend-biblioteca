const express = require('express');
const bcrypt = require('bcrypt');
const { verificatoken } = require('../middlewares/autentificacion');
const _ = require('underscore');
const app = express();
const Usuario = require('../models/usuario');

// app.get('/usuario', [verificatoken], (req, res) => {
//     let desde = req.params.desde || 0;
//     desde = Number(desde);
//     let limite = req.params.limite || 0;
//     limite = Number(limite);

//     Usuario.find({ estado: true })
//         .limit
//         .exec((err, Usuario) => {
//             if (err) {
//                 return res.status(400).json({
//                     ok: false,
//                     err
//                 })
//             }
//             console.log(req.usuario)
//             return res.status(200).json({
//                 ok: true,
//                 count: Usuario.length,
//                 Usuario
//             });

//         });
// });
app.get('/usuario', [verificatoken], (req, res) => {
    Usuario.find({ estado: true })
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            return res.status(200).json({
                ok: true,
                count: usuarios.length,
                usuarios
            });

        });
});

app.post('/usuario', [verificatoken], (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img
    });

    usuario.save((err, usrDB) => {
        if (err) {
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



app.put('/usuario', [verificatoken], (req, res) => {
    let id = req.body.id;
    let body = _.pick(req.body, ['id', 'nombre', 'email', 'img', ]);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query', useFindAndModify: false }, (err, usrDB) => {
        if (err) {
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

// app.delete('/usuario/:id', (req, res) => {
//     let id = req.params.id;
//     Usuario.deleteOne({ _id: id }, (err, resp) => {
//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 err
//             });
//         }

//         if (resp.deletedCount === 0) {
//             return res.status(400).json({
//                 ok: false,
//                 err: {
//                     id,
//                     msg: 'Usuario no encontrado'
//                 }
//             });
//         }

//         return res.status(200).json({
//             ok: true,
//             resp
//         });

//     });

// });

app.delete('/usuario', [verificatoken], (req, res) => {
    let id = req.body.id;
    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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