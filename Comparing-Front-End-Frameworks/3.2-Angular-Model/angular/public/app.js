var app = angular.module('ContactsApp', ['ngRoute', 'ngResource']);

// Contacts Model
app.factory('Contacts', function ($resource) {
    return $resource('/api/contacts/:id', {id: '@id'}, {
        'update': { method: 'PUT'} // overwrite the default GET method on update
    });
});
