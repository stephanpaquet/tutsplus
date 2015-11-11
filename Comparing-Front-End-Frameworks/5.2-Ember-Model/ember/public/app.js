/*global Ember */

// Model
var app = Ember.Application.create();

//
app.ApplicationAdapter = DS.RESTAdapter.extend({
    // prefix route to the api /api/contacts
    namespace: 'api'
});

// DS Data structure
// Ember demande de définir les champs et leur type
app.Contact = DS.Model.extend({
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    email: DS.attr('string'),
});

app.ContactSerializer = DS.RESSTSerializer.extend({
    extractArray: function (store, primaryType, payload) {
        
    }
});

/* Need request lookup
Will use serializer
GET /api/contacts
[...]
{ contacts: [...]}

GET /api/contacts/1
{...}
{ contact: {...}}

POST /api/contacts
{...}
{ contact: {...}}
*/
