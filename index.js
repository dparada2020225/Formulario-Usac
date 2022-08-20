require('dotenv').config()

const mongoose = require('mongoose');
const app = require('./app');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_Connection, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Se encuentra conectado a la base de datos.");

    let puerto = process.env.PORT || 3200

    app.listen(puerto, function () {
        console.log("La aplicacion esta corriendo Puerto:"+ puerto)  
    })

}).catch(error => console.log(error));