/*global angular */

var app = angular.module('MyApp', []);

app.controller('MainController', function ($scope) {
    "use strict";

    $scope.title    = "Title from Main";
    $scope.subtitle = "Subtitle from Main";
    $scope.clicks   = 0;
});

app.directive('heading', function () {
    "use strict";

    return {
        restrict: 'AE',
        replace: true,
        scope: { // isolate scope
            //theTitle: '@title'
            title: '@', // equivalent a title: '@title'
            subtitle: '=', // two way binding
            count: '&' // expression we can call
        },
        template: '<header ng-click="count()"><h1>{{title}}</h1><h2>{{subtitle}}</h2> <input ng-model="title" /></header>'
    };
});

// Scope
// Default: parent scope
// true: child scope


