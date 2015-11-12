/*global angular */

var app = angular.module('MyApp', []);

app.directive('chart', function () {
    "use strict";

    return {
        replace: true,
        transclude: true,
        templateUrl: './chart.html',
        controller: function ($scope, $element, $attrs) {
            var highest     = 0,
                H           = parseInt($attrs.height, 10),
                borderWidth = 30;
            
            window.console.log($attrs);
            
            this.getY = function (point) {
                var adjustement,
                    heightSpacer;

                if (point.d > highest) {
                    highest = point.d;
                    $scope.$broadcast('new-highest');
                }

                adjustement  = point.radius + point.strokeWidth;
                heightSpacer = (H - borderWidth - adjustement) / highest;
                
                return H - borderWidth - point.d * heightSpacer;
                
            };
        }
    };
});

app.directive('datapoint', function () {
    "use strict";

    return {
        replace: true,
        require: '^chart', // connection entre datapoint et chart directive
        scope: {
            d: '@'
        },
        template: '<circle cx="20" ng-attr-cy="{{ cy }}" ng-attr-r="{{ radius }}" ng-attr-stroke-width="{{ strokeWidth }}" fill="#FFFFFF" stroke="#5B90BF" />',
        link: function (scope, element, attrs, ctrl) {
            scope.d           = parseInt(scope.d, 10);
            scope.radius      = 4;
            scope.strokeWidth = 3;

            function setY() {
                scope.cy = ctrl.getY(scope);
            }
            
            setY();
            scope.$on('new-highest', setY);
        }
    };
});
