const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Usuario = require('./usuario');
const Categoria = require('./categoria');

let Schema = mongoose.Schema;

let productoSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'Porfavor ingresa el nombre del producto']
    },
    precioUni: {
        type: Number,
        required: [true, 'Porfavor ingrese el precio unitario']
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: [true, 'Por favor ingrese la categoria']

    },
    disponible: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Ingrese el usuario']
    }

});

productoSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});


module.exports = mongoose.model('Producto', productoSchema);