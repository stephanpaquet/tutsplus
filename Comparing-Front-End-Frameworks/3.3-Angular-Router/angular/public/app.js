/*global angular */

var app = angular.module('ContactsApp', ['ngRoute', 'ngResource']);

// Router
// $routeProvider comes from the ngRoute component
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/contacts', {
            controller: 'ListController',
            template: 'views/list.html'
        })
        .when('/contacts/new', {
            controller: 'NewController',
            template: 'views/new.html'
        })
        .when('/contacts/:id', {
            controller: 'SingleController',
            template: 'views/single.html'
        })
        .otherwise({
            redirectTo: '/contacts'
        });

    // use the browser history API
    // @see https://css-tricks.com/using-the-html5-history-api/
    $locationProvider.html5mode(true);
});

// Contacts Model
app.factory('Contacts', function ($resource) {
    return $resource('/api/contacts/:id', {id: '@id'}, {
        'update': { method: 'PUT'} // overwrite the default GET method on update
    });
});
