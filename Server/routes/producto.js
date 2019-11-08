const express =  require ('express');
const _= require('underscore');
const Producto = require('../models/producto')
const app = express();

app.get('/producto', (req, res) => {
    Producto.find({disponible: true})
    .exec((err, productos)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok:true,
            count: productos.length,
            productos
        });
    })
});



app.post('/producto', (req, res) => { //Metodo parapoder mandar los datos a la colleccion
    let body = req.body; 
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni, 
        categoria: body.categoria, 
        disponible: body.disponible, 
        usuario: body.usuario
    });

    producto.save((err, prodDB) => {
         if(err){
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

app.put('/producto/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioUni', 'categoria', 'disponible', 'usuario']);
    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, prodDB) => {
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

module.exports = app;