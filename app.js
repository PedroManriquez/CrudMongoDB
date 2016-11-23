//port envia el proceso al puerto donde estará funcionando nuestro servidor
var port 		= process.env.PORT || 4444,
	express 	= require('express'), //contiene los modulos de express para la estructura del proyecto y demases
	app 			= express(),	//app finalmente es la instancia de nuestros modulos de express			
	io		    = require('socket.io').   //io carga la biblioteca de web sockets
								listen(
									app.listen(port, function(){
										console.log('listening on *:4444');
									})
								);

var peli= require('./models/PeliculasModel').moviesch;
//requerimos los archivos del servidor y les pasamos las variables entre parentesis
//que previamente fueron declaradas en la parte superior
require('./config')(app);
require('./routes')(app);
require('./server')(io, peli);
