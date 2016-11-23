
var app = angular.module('AppPersonajes', []);

app.factory('socket', function() {
    var socket = io();
    return socket;
});
app.controller('mainCtrl', ['$rootScope', function ($rootScope) {
  $rootScope.agregar= false;
  $rootScope.upda= false;

  $rootScope.setAgregar = function () {
    $rootScope.agregar = true;
    $rootScope.upda = false;
  };
  $rootScope.setActualizar = function (val) {
    $rootScope.upda = val;
    $rootScope.agregar = false;
  };
}]);

app.controller('InsertCtrl', ['$scope', '$rootScope', 'socket', function ($scope, $rootScope, socket) {
  console.log('Entro en InsertCtrl')
  $scope.agregarPelicula= function () {
    console.log('Agregar Perico')
    var pelicula= {
      nombre: $scope.nombre,
      autor: $scope.autor,
      genero: $scope.genero,
      anho: $scope.anho
      
    };
    socket.emit('insert', pelicula);
    $scope.nombre        = '';
    $scope.autor     = '';
    $scope.genero   = '';
    $scope.anho       = '';
    $rootScope.agregar=false;
  }
}]);
app.controller('FindCtrl', ['$scope', 'socket', function ($scope, socket) {
  console.log('Entro en FindCtrl')
  $scope.personajes=[];
  socket.on('find', function (response) {
    console.log('escucho evento find')
    $scope.personajes= response;
    console.log($scope.personajes);
    $scope.$digest();
  });
}]);
app.controller('UpdateCtrl', ['$scope', '$rootScope','socket', function ($scope, $rootScope, socket) {
  $scope.nombre_ac='';
  $scope.autor_ac='';
  $scope.genero_ac='';
  $scope.anho_ac='';
  $scope.actualizarPelicula= function (pelicula) {
    console.log(pelicula);
    console.log(pelicula.anho);
    $scope.nombre_ac = pelicula.nombre;
    $scope.autor_ac  = pelicula.autor;
    $scope.genero_ac = pelicula.genero;
    $scope.anho_ac   = pelicula.anho+"";
    console.log($scope.anho_ac);
    $rootScope.setActualizar(true);
  };
  $scope.updatearPelicula = function (nom, auth, genre, year){
    var pelicula_ac= 
    {
        nombre: nom,
        autor: auth,
        genero: genre,
        anho: year     
    };
    console.log(pelicula_ac);
    socket.emit('update', pelicula_ac);
    socket.on('update', function (response) {
      console.log('Respondio el server');
    });
    $rootScope.upda=false;
  };

  $scope.deletedPelicula = function (nom) {
    var decision= confirm('Esta seguro que desea eliminar la pelicula');
    if(decision){
      var pelicula_del= 
        {
          nombre: nom     
        };
      console.log(pelicula_del);
      socket.emit('remove', pelicula_del);
      $rootScope.setActualizar(false);
    }
    
    
  };
}]);