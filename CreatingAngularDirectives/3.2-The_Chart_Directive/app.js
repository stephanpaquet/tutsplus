/*global angular */

var app = angular.module('MyApp', []);

app.directive('chart', function () {
    "use strict";

    return {
        replace: true,
        transclude: true,
        templateUrl: './chart.html'
    };
});

app.directive('datapoint', function () {
    "use strict";

    return {
        replace: true,
        template: '<circle cx="20" cy="20" r="4" stroke-width="3" fill="#FFFFFF" stroke="#5B90BF" />'
    };
});
