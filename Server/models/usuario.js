const moongose = require('mongoose');
const uniqueValidator = require ('mongoose-unique-validator');

let Schema = moongose.Schema;
let usuarioSchema = new Schema({
    nombre: { 
        type: String,
        required:  [true, 'Porfavor ingresa el nombre del usuario']
    }, 
    email: {
        type: String, 
        unique: true,
        required:  [true, 'Porfavor ingresa el email']
    }, 
    password: {
        type: String,
        required:  [true, 'Porfavor ingresa una contraseña']
    },
    role: {
        type: String,
        default: 'USER_ROLE'
    },
    img: { 
        type: String,
        required:  [true, 'Porfavor ingresa la imagen']
    }, 
    estado: {
        type: Boolean, 
        default: true
    }, 
    google: {
        type: Boolean, 
        default: false
    }
});

usuarioSchema.plugin(uniqueValidator, {
    menssage: '{PATH} debe ser unico y diferente'  //PARH marca el camiono o el campo  
});

module.exports = moongose.model('Usario', usuarioSchema); // Se rea la coleccion o la tabla en la bd
