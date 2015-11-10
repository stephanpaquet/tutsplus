/*global angular */

var app = angular.module('ContactsApp', ['ngRoute', 'ngResource']);

// Router
// $routeProvider comes from the ngRoute component
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/contacts', {
            controller: 'ListController',
            templateUrl: 'views/list.html'
        })
        .when('/contacts/new', {
            controller: 'NewController',
            templateUrl: 'views/new.html'
        })
        .when('/contacts/:id', {
            controller: 'SingleController',
            templateUrl: 'views/single.html'
        })
        .otherwise({
            redirectTo: '/contacts'
        });

    // use the browser history API
    // @see https://css-tricks.com/using-the-html5-history-api/
    $locationProvider.html5Mode(true);
});

// Contacts Model
app.factory('Contacts', function ($resource) {
    return $resource('/api/contacts/:id', {id: '@id'}, {
        'update': { method: 'PUT'} // overwrite the default GET method on update
    });
});

// Controllers
app.controller('ListController', function ($scope, Contacts) {
    $scope.contacts = Contacts.query();  // Made a GET request to the API to get all contacts
});

app.controller('SingleController', function ($scope, Contacts, $routeParams, $location) {
    var id =  parseInt($routeParams.id, 10);
    $scope.contact = Contacts.get({id: id});

    $scope.update = function () {
        $scope.contact.$update(function (updatedRecord) {
            $scope.contact = updatedRecord;
        });
    };

    $scope.delete = function () {
        $scope.contact.$delete();
        $location.url('/contacts');
    };
});
