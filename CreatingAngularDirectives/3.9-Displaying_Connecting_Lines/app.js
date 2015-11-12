/*global angular */

var app = angular.module('MyApp', []);

app.directive('chart', function () {
    "use strict";

    return {
        replace: true,
        transclude: true,
        templateUrl: './chart.html',
        controller: function ($scope, $element, $attrs) {
            var highest       = 0,
                H             = parseInt($attrs.height, 10),
                W             = parseInt($attrs.width, 10),
                borderWidth   = 30,
                count         = 0,
                numberOfTicks = 5,
                interval      = 0,
                i             = 0;

            $scope.height      = H;
            $scope.leftLimit   = borderWidth;
            $scope.bottomLimit = H - borderWidth;
            $scope.rightLimit  = W;
            $scope.points      = [];
            
            this.getX = function (point) {
                var widthSpacer,
                    adjustement = 0;

                if (typeof point.num === 'undefined') {
                    point.num = count += 1;
                    $scope.$broadcast('new-width');
                }

                adjustement = point.radius + point.strokeWidth - 1;
                widthSpacer = (W - borderWidth - adjustement) / (count - 1);

                return borderWidth + widthSpacer * point.num;
            };
            
            this.addPoint = function (point) {
                $scope.points.push(point);
                
            };

            this.getY = function (point) {
                var adjustement,
                    heightSpacer;

                if (point.d > highest) {
                    highest = point.d;
                    $scope.$broadcast('new-highest');
                }

                adjustement  = point.radius + point.strokeWidth - 1;
                heightSpacer = (H - borderWidth - adjustement) / highest;
                
                $scope.ticks = [];

                interval = highest / (numberOfTicks - 1);
                
                for (i = 0; i < numberOfTicks; i += 1) {
                    $scope.ticks.push({
                        text: interval * i,
                        value: interval * i * heightSpacer + adjustement
                    });
                }
                
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
            d: '@',
            label: '@'
        },
        template: '<circle ng-attr-cx="{{ cx }}" ng-attr-cy="{{ cy }}" ng-attr-r="{{ radius }}" ng-attr-stroke-width="{{ strokeWidth }}" fill="#FFFFFF" stroke="{{ stroke }}" />',
        link: function (scope, element, attrs, ctrl) {
            scope.d           = parseInt(scope.d, 10);
            scope.radius      = 4;
            scope.strokeWidth = 3;
            scope.stroke      = "#5B90BF";
            
            ctrl.addPoint(scope);

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
