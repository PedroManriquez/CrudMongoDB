//Archivo de la configuarion del proyecto, requiere 
//la variable app que contiene modulos de express
var express = require('express');

module.exports = function(app){

	// Dejamos como .html el motor de vistas o la extensión de estas
	app.set('view engine', 'html');

	// Usaremos el motor de ejs para renderizar las vistas en HTML
	app.engine('html', require('ejs').renderFile);

	// Definimos que nuestros templates estarán en la carpeta /views
	app.set('views', __dirname + '/views');

	// Apuntamos a nuestra carpeta public donde estarán archivos js y css del proyecto
	app.use(express.static(__dirname + '/public'));

  
};
