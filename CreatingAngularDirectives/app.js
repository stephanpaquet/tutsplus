/*global angular */

var app = angular.module('MyApp', []);

app.controller('MainController', function ($scope) {
    "use strict";

    $scope.title    = "Title from Main";
    $scope.subtitle = "Subtitle from Main";
});

app.directive('heading', function () {
    "use strict";

    return {
        restrict: 'AE',
        replace: true,
        scope: true,
        template: '<header><h1>{{title}}</h1><h2>{{subtitle}}</h2> <input ng-model="title" /></header>'
    };
});

// Scope
// Default: parent scope
// true: child scope

// restrict possible values (default EA)
// (E)lement
// (A)ttribute
// (C)lass
// co(M)ment (need replace value to be true)
