
  angular.module('myapp',['angular.morris']).controller('MyCtrl', function($scope){
    $scope.data = [
      { y: "2006", a: 100 },
      { y: "2007", a: 75 },
      { y: "2008", a: 50 },
      { y: "2009", a: 75 },
      { y: "2010", a: 50 },
      { y: "2011", a: 750 },
      { y: "2012", a: 1000 }
    ];
    $scope.xaxis = 'y';
    $scope.yaxis = '["a"]';

  });
