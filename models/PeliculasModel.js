var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

mongoose.connect('mongodb://localhost/pelis');

var pelicula_schema   = new Schema(
  {
    nombre: String,
    genero: String,
    anho: String,
    autor: String
  }
);

//creamos schema para exportar y llamarlo en otros componentes
var moviesch = mongoose.model('moviesch', pelicula_schema);
module.exports.moviesch = moviesch;

//https://www.npmjs.com/package/mongoose