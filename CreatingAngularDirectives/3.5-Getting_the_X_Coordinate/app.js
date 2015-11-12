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
                W           = parseInt($attrs.width, 10),
                borderWidth = 30,
                count       = 0;
            
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

            this.getX = function (point) {
                var adjustement,
                    widthSpacer;

                if (typeof point.num === 'undefined') {
                    point.num = count += 1;
                    $scope.$broadcast('new-width');
                }

                adjustement = point.radius + point.strokeWidth - 1;
                widthSpacer = (W - borderWidth - adjustement) / (count - 1);

                return borderWidth + widthSpacer * point.num;
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
        template: '<circle ng-attr-cx="{{ cx }}" ng-attr-cy="{{ cy }}" ng-attr-r="{{ radius }}" ng-attr-stroke-width="{{ strokeWidth }}" fill="#FFFFFF" stroke="#5B90BF" />',
        link: function (scope, element, attrs, ctrl) {
            scope.d           = parseInt(scope.d, 10);
            scope.radius      = 4;
            scope.strokeWidth = 3;

            function setY() {
                scope.cy = ctrl.getY(scope);
            }

            function setX() {
                scope.cx = ctrl.getX(scope);
            }
            
            setY();
            setX();

            scope.$on('new-highest', setY);
            scope.$on('new-width', setX);
        }
    };
});
