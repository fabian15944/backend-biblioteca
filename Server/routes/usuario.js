const express =  require ('express');
const bcrypt = require('bcrypt');
const _= require('underscore');
const Usuario = require('../models/usuario');
const app = express();

app.get('/usuario', (req, res) => {
    Usuario.find({estado : true})
    .exec((err, usuarios)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok:true,
            count: usuarios.length,
            usuarios 
        });
    })
});

app.get('/usuario/:id/:nombre', (req, res) => {
    let id = req.params.id;
    let nombre = req.params.nombre;

    res.json({
        id,
        nombre
    });

});

app.post('/usuario', (req, res) => { //Metodo parapoder mandar los datos a la colleccion
    let body = req.body; 
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,                          //Body es igual a todo lo que tiene request en su campo body
        password : bcrypt.hashSync(body.password, 10),
        img: body.img               
    });

    usuario.save((err, usrDB) => {
         if(err){
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

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'role', 'img', 'estado']);  //Pick e para seleccionar aquellos campos que solo me interesan del body

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true , context:'query' }, (err, usrDB) =>{
        if(err){
            return res.status(400).json({
                ok: false, 
                err
            });
        }
           return res.status(200).json({
               ok:true,
               usrDB
           });
    });
    
});

app.delete('/usuario/:id', (req, res) => {
     let id = req.params.id;
//     Usuario.deleteOne({_id: id}, (err, resp) =>{
//         if(err){
//             return res.status(400).json({
//                 ok: false, 
//                 err
//             });
//         }
//         if(resp.deletedCount === 0){
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

    Usuario.findByIdAndUpdate(id, {estado: false}, { new: true, runValidators: true , context:'query' }, (err, resp) =>{
        if(err){
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