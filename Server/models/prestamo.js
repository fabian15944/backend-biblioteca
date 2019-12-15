/*const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Usuario = require('./usuario');
//const Categoria = require('./categoria');

//declarar esquema
let Schema = mongoose.Schema;

let prestamoSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Por favor ingresa el nombre del usuario']
    },
    libro: {
        type: String,
        required: [true, 'Por favor ingresa la categoria del producto']
    },
    fechaprestamo: {
        type: Number,
        required: [true, 'Por favor ingresa la Editorial']
    },
    fecharegreso: {
        type: Number,
        required: [true, 'Por favor ingresa el Numero de Copias del Libro']
    },
    completado: {
        type: Boolean,
        default: false
    }
});
//el esquema utilize el plugin
prestamoSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

//crea una coleccion
module.exports = mongoose.model('Prestamo', prestamoSchema);
*/

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Usuario = require('./usuario');
const Libro = require('./libro');

let Schema = mongoose.Schema;

let prestamoSchema = new Schema({
    libro: {
        type: Schema.Types.ObjectId,
        ref: 'Libro',
        required: [true, 'Por favor ingresa el nombre de la categoria']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Por favor ingresa el nombre del usuario']
    },
    fechaprestamo: {
        type: Date,
        required: true
    },
    fecharegreso: {
        type: Date,
        required: true
    },
    completado: {
        type: Boolean,
        default: false
    },
    estado: {
        type: Boolean,
        default: true
    }
});

prestamoSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

//crea una coleccion
module.exports = mongoose.model('Prestamo', prestamoSchema);