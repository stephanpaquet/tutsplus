/*global angular */

var app = angular.module('MyApp', []);

app.directive('chart', function () {
    "use strict";

    return {
        replace: true,
        transclude: true,
        templateUrl: './chart.html',
        controller: function ($scope, $element, $attrs) {
            this.name = 'chartDirective';
        }
    };
});

app.directive('datapoint', function () {
    "use strict";

    return {
        replace: true,
        require: '^chart', // connection entre datapoint et chart directive
        template: '<circle cx="20" cy="20" ng-attr-r="{{ radius }}" ng-attr-stroke-width="{{ strokeWidth }}" fill="#FFFFFF" stroke="#5B90BF" />',
        link: function (scope, element, attrs, ctrl) {
            scope.radius = 4;
            scope.strokeWidth = 3;
            
            window.console.log(ctrl);
        }
    };
});
