/*global angular */

var app = angular.module('MyApp', []);


app.directive('heading', function () {
    "use strict";

    return {
        restrict: 'MC',
        replace: true,
        template: '<header><h1>The First Title</h1><h2>The First Subtitle</h2></header>'
    };
});

// restrict possible values (default EA)
// (E)lement
// (A)ttribute
// (C)lass
// co(M)ment (need replace value to be true)
