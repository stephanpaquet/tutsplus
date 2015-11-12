/*global angular */

var app = angular.module('MyApp', []);

app.directive('heading', function () {
    "use strict";

    return {
        replace: true,
        template: '<header><h1>The First Title</h1><h2>The First Subtitle</h2></header>'
    };
});
