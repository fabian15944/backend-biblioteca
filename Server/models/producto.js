const moongose = require('mongoose');
const uniqueValidator = require ('mongoose-unique-validator');
const Usuario = require('./usuario')
const Categoria = require('./categoria')

let Schema = moongose.Schema;

let productoSchema = new Schema({
    nombre: { 
        type: String,
        unique: true, 
        required:  [true, 'Porfavor ingresa el nombre del producto']
    }, 
    precioUni: {
        type: Number,
        required:  true
    },
    categoria: {
        type: Schema.ObjectId, ref: 'Categoria',
        required:  [true, 'Porfavor ingresa el ID de la categoria']
    }, 
    disponible: {
        type: Boolean, 
        default: true
    }, 
    usuario: {
        type: Schema.ObjectId, ref: 'Usuario',
        required:  [true, 'Porfavor ingresa el ID del usuario']
    }
});

productoSchema.plugin(uniqueValidator, {
    menssage: '{PATH} debe ser unico y diferente'  //PARH marca el camiono o el campo  
});

module.exports = moongose.model('Producto', productoSchema); // Se rea la coleccion o la tabla en la bd