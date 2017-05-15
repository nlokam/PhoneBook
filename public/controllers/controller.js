var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function() {
  $http.get('/phonebook').success(function(response) {
    console.log("I got the data I requested");
    $scope.phonebook = response;
    $scope.phone = "";
  });
};

refresh();




$scope.addContact = function() {
  
  console.log($scope.phone);
  $http.post('/phonebook', $scope.phone).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/phonebook/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/phonebook/' + id).success(function(response) {
    $scope.phone = response;
  });
};  

$scope.update = function() {
  console.log($scope.phone._id);
  $http.put('/phonebook/' + $scope.phone._id, $scope.phone).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.phone = "";
}

}]);﻿