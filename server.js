//Escucha los sockets desde el servidor
module.exports=function(io, pelicula){
  //usamos la variable importada mediante el evento 'connection' pertence a la biblioteca de sockets
  io.sockets.on('connection', function(socket) {
    //verificamos que cargue el evento de una nueva conexion de un cliente
    console.log('Bienvenido');    
    pelicula.find( {}, function (err, docs) {
          io.emit('find', docs);
        });
    //emitimos un evento llamado 'event-example' que lleva consigo el String 'Hola eso es....'
    socket.on('insert', function (response) {
      var bson_movie= new pelicula(response);
      bson_movie.save( function () {
        console.log('pelicula Guardado exitosamente');
        pelicula.find( {}, function (err, docs) {
          io.emit('find', docs);
        });
      });
    });
    socket.on('update', function (response) {
      console.log('Update-events');
      pelicula.findOne({nombre: response.nombre}, 
          function (err, peli) {
            console.log(response.autor+ response.genero+ response.anho);
            peli.autor= response.autor;
            peli.genero= response.genero;
            peli.anho= response.anho;
            console.log(peli.anho);
            peli.save(function (err){
              if (err)
                console.log(err)
              else
                console.log(err)
              pelicula.find( {}, function (err, docs) {
                io.emit('find', docs);
              });
            });
          } 
        );
      /*pelicula.update({nombre: response.nombre}, {$set: {serie: response.serie, rol: response.rol}}, 
        function (err) {
          if (err)
            console.log(err)
          else
            console.log(err)
        } );*/
    });

    socket.on('remove', function (response) {
      console.log(response.nombre);
      pelicula.findOne({nombre: response.nombre}, 
          function (err, peli) {
            
            peli.remove(function (err){
              if (err)
                console.log(err)
              else
                console.log(err)
              pelicula.find( {}, function (err, docs) {
                io.emit('find', docs);
              });
            });
          } 
        );
    });
    //Escuchamos la desconexion de los clientes, evento 'disconnect' es de la biblioteca de sockets
    socket.on('disconnect', function() {
      console.log('user disconnected socket');
    });
  });
};