//Archivo encargado de parsear rutas y renderizar templates mediante 
//los middleware que reciben por parametro las funciones

//Exporta app que contiene los modulos de express
module.exports = function(app){

	app.get(['/'], function(req, res){
		 res.render('index');
	});


}
