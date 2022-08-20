const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormularioSchema = Schema({
    carnet: String,
    nombre: String,
    direccion: String,
    genero: String,
    telefono: Number,
    fechaNacimiento: String,
    carrera: String,
    generoLiterario: String,
    fechaInscripcion: String,
    fechaDeclamacion: String,
    edad: Number
});

module.exports = mongoose.model('Formularios', FormularioSchema);