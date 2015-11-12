/*global angular */

var app = angular.module('MyApp', []);

app.directive('heading', function () {
    "use strict";

    return {
        restrict: 'AECM',
        transclude: true,
        replace: true,
        scope: { // isolate scope
            //theTitle: '@title'
            title: '@', // equivalent a title: '@title'
            subtitle: '@' // two way binding
        },
        template: '<header><h1 ng-transclude></h1><h2>{{subtitle}}</h2></header>'
    };
});
