const express =  require ('express');
const _= require('underscore');
const Categoria = require('../models/categoria')
const app = express();

app.get('/categoria', (req, res) => {
    Categoria.find({st: true})
    .exec((err, categorias)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok:true,
            count: categorias.length,
            categorias 
        });
    })
});

// app.get('/categoria/:id/:nombre', (req, res) => {
//     let id = req.params.id;
//     let nombre = req.params.nombre;

//     res.json({
//         id,
//         nombre
//     });

// });

app.post('/categoria', (req, res) => { //Metodo parapoder mandar los datos a la colleccion
    let body = req.body; 
    let categoria = new Categoria({
        nombre: body.nombre,              // Valores izquierdos son campos y los de derecho la rrespuesa
        usuario: body.usuario,
        st: body.st         
    });

    categoria.save((err, catDB) => {
         if(err){
             return res.status(400).json({  //Para definir el estado de la funcion
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

app.put('/categoria/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'usuario', 'st' ]);  //Pick e para seleccionar aquellos campos que solo me interesan del body

    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true , context:'query' }, (err, catDB) =>{
        if(err){
            return res.status(400).json({
                ok: false, 
                err
            });
        }
           return res.status(200).json({
               ok:true,
               catDB
           });
    });
    
});

app.delete('/categoria/:id', (req, res) => {
    let id = req.params.id;


   Categoria.findByIdAndUpdate(id, {st: false}, { new: true, runValidators: true , context:'query' }, (err, resp) =>{
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