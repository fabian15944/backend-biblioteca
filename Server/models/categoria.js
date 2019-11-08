const moongose = require('mongoose');
const uniqueValidator = require ('mongoose-unique-validator');
const Categoria = require('./categoria')
let Schema = moongose.Schema;
let categoriaSchema = new Schema({
    nombre: { 
        type: String, 
        unique: true,
        required:  [true, 'Porfavor ingresa el nombre de la categoria']
    }, 
    usuario: {
        type: Schema.ObjectId, ref: 'Usuario',
        required:  [true, 'Porfavor ingresa el ID del usuario']
        
    },
    st:{
        type: String,
        default: true
    }
});

categoriaSchema.plugin(uniqueValidator, {
    menssage: '{PATH} debe ser unico y diferente'  //PARH marca el camiono o el campo  
});

module.exports = moongose.model('Categoria', categoriaSchema); // Se rea la coleccion o la tabla en la bd
