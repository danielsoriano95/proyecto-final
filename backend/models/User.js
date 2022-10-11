var mongoose = require("mongoose");
var Schema = mongoose.Schema;


// creo un schema con la estructura de datos que tendran los documentos de esta coleccion
var User = new Schema(
    {       
        nombre: String, 
        documento: String,
        date: String,
        email: String,
        password: String,
        arriendo: Number,
        salario: Number,
        ingresos: Number,
        Gmensuales: Number,
        GHogar: Number,
        GFinancieros: Number,
        ACargo: Number,
        proposito: String,
        ahorro: Number,
        tipoVivienda: String,
        mTransporte: String,
        tipoContrato: String,
    }
    //{versionKey: false}
);

// exportado , primero como se llama mi coleccion y despues la vinculacion con los datos de arriva
module.exports = mongoose.model('users', User)
