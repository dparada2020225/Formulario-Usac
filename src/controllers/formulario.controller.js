const Formulario = require('../models/formulario.model');


function newForm(req, res) {
    var modeloFormulario = new Formulario();
    var parametros = req.body;
    

    // ver si el estudiante lleno ya el formulario
    Formulario.find({ carnet: parametros.carnet }, (err, formularioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'error en la peticion ' })
        if (!formularioEncontrado) return res.status(500).send({ mensaje: 'error' })
        if (formularioEncontrado.length < 0) {
            return res.status(500).send({ mensaje: "Este estudiante ya lleno el formulario" })
        }
    })
    
    
    // funcion para calcular la edad del usuario que esta llenando el formulario
    function calcularEdad(fecha) {
        var hoy = new Date();
        var cumpleanos = new Date(fecha);
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;}
        return edad
    }

    //funcion para sumar dias
    function sumarDias(fecha, dias) {
        fecha.setDate(fecha.getDate() + dias);
        return fecha.toLocaleDateString('en-GB');
    }

    //variables
    let carnet = parametros.carnet
    let longuitud = carnet.length
    let cero = carnet.includes('0')
    let primerLetra = carnet.charAt(0)
    let TercerLetra = carnet.charAt(2)
    let UltimaLetra = carnet.charAt(5)
    let Mayor17 = String(calcularEdad(parametros.fechaNacimiento))
    

        // validar que todos los campos esten llenos
        if (parametros.carnet && parametros.nombre && parametros.direccion && parametros.genero && parametros.telefono && parametros.fechaNacimiento && parametros.carrera && parametros.generoLiterario) {

        } else {
            return res.status(500).send({ mensaje: "agregue todos los parametros" })
        }

        // validar que el carnet tenga 6 caracteres 2
        if (longuitud >6 || longuitud <6 ) {
            return res.status(500).send({ mensaje: "el carnet debe tener 6 caracteres" })
        }

        // validar que el carnet no tenga el 0
        if (cero == true) { 
            return res.status(500).send({ mensaje: "el carnet no debe tener 0" })
        }

        // validar que el carnet su primera letra sea una A mayuscula
        if (primerLetra === "A") {
        } else {
            return res.status(500).send({ mensaje: "El primer carácter deberá ser A (mayúscula)" })
        }

        // validar que el carnet su tercer caracter sea un numero 5
        if (TercerLetra === "5") {
        } else {
            return res.status(500).send({ mensaje: "El tercer carácter deberá de ser 5" })
        }


        // validar que la edad del usuario sea mayor a 17 años
        if (Mayor17 <= "17") {
            return res.status(500).send({ mensaje: "no eres mayor a 17 años" })
        }

        // validar que el carnet su ultimo caracter sea un 1, 3 o 9
        if (UltimaLetra !== "1" && UltimaLetra !=="3" && UltimaLetra !== "9") {
            return res.status(500).send({ mensaje: "El último carácter debe de terminar en 1,3 o 9"})
        }
        

    //variables para la fecha de nacimiento
    let fechaNacimiento1 = parametros.fechaNacimiento
    let fechaNacimiento2 = new Date(fechaNacimiento1)

    modeloFormulario.carnet = parametros.carnet
    modeloFormulario.nombre = parametros.nombre
    modeloFormulario.direccion = parametros.direccion
    modeloFormulario.genero = parametros.genero
    modeloFormulario.telefono = parametros.telefono
    modeloFormulario.fechaNacimiento = fechaNacimiento2.toLocaleDateString('en-GB')
    modeloFormulario.carrera = parametros.carrera
    modeloFormulario.generoLiterario = parametros.generoLiterario
    modeloFormulario.fechaInscripcion = (new Date()).toLocaleDateString('en-GB')
    modeloFormulario.edad = Number(calcularEdad(parametros.fechaNacimiento))

                 
        let generoLiterario = modeloFormulario.generoLiterario;
        let inscripcion = new Date();

        if (UltimaLetra === "1" && generoLiterario === "dramatico") {
            let day;
            switch (inscripcion.getDay()) {
                case 0:
                    day = sumarDias(inscripcion, 5)
                    break;
                case 1:
                    day = sumarDias(inscripcion, 7)
                    break;
                case 2:
                    day = sumarDias(inscripcion, 7)
                    break;
                case 3:
                    day = sumarDias(inscripcion, 7)
                    break;
                case 4:
                    day = sumarDias(inscripcion, 7)
                    break;
                case 5:
                    day = sumarDias(inscripcion, 7)
                    break;
                case 6:
                    day = sumarDias(inscripcion, 6)
            }
            modeloFormulario.fechaDeclamacion = day
            modeloFormulario.save((err, formularioGuardado) => {
                if (err) return res.status(500).send({ mensaje: 'error en la peticion ' })
                if (!formularioGuardado) return res.status(500).send({ mensaje: 'error al crear formulario ' })
                return res.status(200).send(formularioGuardado.fechaDeclamacion)
            })
        }  else if (UltimaLetra === "3" && generoLiterario === "epica") {
            var date = new Date()
            var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            let day;
            switch (ultimoDia.getDay()) {
                case 0:
                    day = sumarDias(ultimoDia, -2)
                    break;
                case 6:
                    day = sumarDias(ultimoDia, -1)
                    break;
                default:
                    day = sumarDias(ultimoDia, 0)
            }
            modeloFormulario.fechaDeclamacion = day
            modeloFormulario.save((err, formularioGuardado) => {
                if (err) return res.status(500).send({ mensaje: 'error en la peticion ' })
                if (!formularioGuardado) return res.status(500).send({ mensaje: 'error al crear formulario ' })
                return res.status(200).send(formularioGuardado.fechaDeclamacion)
            })
        } else if ((UltimaLetra === "1" || UltimaLetra === "3" || UltimaLetra === "9") && (generoLiterario === "epica" || generoLiterario === "lirica" || generoLiterario === "dramatico")) {
            let day;
            switch (inscripcion.getDay()) {
                case 0:
                    day = sumarDias(inscripcion, 5)
                    break;
                case 1:
                    day = sumarDias(inscripcion, 4)
                    break;
                case 2:
                    day = sumarDias(inscripcion, 3)
                    break;
                case 3:
                    day = sumarDias(inscripcion, 2)
                    break;
                case 4:
                    day = sumarDias(inscripcion, 1)
                    break;
                case 5:
                    day = sumarDias(inscripcion, 0)
                    break;
                case 6:
                    day = sumarDias(inscripcion, 6)
            }
            modeloFormulario.fechaDeclamacion = day
            modeloFormulario.save((err, formularioGuardado) => {
                if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
                if (!formularioGuardado) return res.status(500).send({ mensaje: 'error al crear formulario ' })
                return res.status(200).send(formularioGuardado.fechaDeclamacion)
        
            })
        }else{
            return res.status(500).send({ mensaje: 'ha surgido un error' })
        }
}

function SeeForms(req, res) {
    Formulario.find({}, (err, formularioEncontrados) => {
        if (err) return res.status(500).send({ mensaje: 'error en la peticion' });
        if (!formularioEncontrados) return res.status(500).send({ mensaje: 'Error al encontrar Formularios' });
        return res.status(200).send(formularioEncontrados);
    }) 
}

module.exports = {
    newForm,
    SeeForms
}   
