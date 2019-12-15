const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Usuario = require('./usuario');
const Categoria = require('./categoria');

let Schema = mongoose.Schema;
// cambie productos por libros

let libroSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'Porfavor ingresa el nombre del libro']
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
    img: {
        type: String,

        // required: [true, 'Ingrese la imagen']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Ingrese el usuario']
    }

});

libroSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});


module.exports = mongoose.model('Libro', libroSchema);