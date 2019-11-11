const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Ingrese el nombre']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Ingrese el email']
    },
    password: {
        type: String,
        required: [true, 'Ingrese la contraseña']
    },
    role: {
        type: String,
        default: 'USER_ROLE'
    },
    img: {
        type: String,
        required: [true, 'Ingrese la imagen']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: true
    }
});


usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});


module.exports = mongoose.model('Usuario', usuarioSchema);