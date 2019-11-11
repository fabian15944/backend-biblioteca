const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Usuario = require('./usuario');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'Ingrese el nombre de la categoria']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Ingrese el usuario']
    },
    estado: {
        type: String,
        default: true,
        required: [true, 'Ingrese el estado']
    }
});

categoriaSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});


module.exports = mongoose.model('Categoria', categoriaSchema);