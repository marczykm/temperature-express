var app = angular.module('temperatureApp', []);

app.controller('TemperatureCtrl', function TemperatureCtrl($scope, $http){
  $scope.temperature = '';
  getCurrent();
  setInterval(getCurrent, 1000);

  function getCurrent(){
    $http.get('/api/temperature').then(function(res){
      $scope.temperature = res.data;
    });
  }
});
