/*global Ember */

// Model
var app = Ember.Application.create();

// convertit /contacts (pluriel du model) en /api/contacts (api du backend)
app.ApplicationAdapter = DS.RESTAdapter.extend({
    // prefix route to the api /api/contacts
    namespace: 'api'
});

// DS Data store
// Ember demande de définir les propriétés et leur type
app.Contact = DS.Model.extend({
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    email: DS.attr('string')
});

app.ContactSerializer = DS.RESSTSerializer.extend({
    // Intercept the request
    // payload: datas venant du server
    /* Convert:
        GET /api/contacts
        [...]
        { contacts: [...]}
    */
    extractArray: function (store, primaryType, payload) {
        payload = { contacts: payload};
        this._super(store, primaryType, payload); // parent ?
    },

    /* Convert
        GET /api/contacts/1
        {...}
        { contact: {...}}
    */
    extractSingle: function (store, primaryType, payload, recordId) {
        payload = { contact: payload};
        this._super(store, primaryType, payload, recordId);
    },

    /* Convert:
        POST /api/contacts
        {...}
        { contact: {...}}
    */
    serializeIntoHash = function (hash, type, snapshot, options) {
        var json = this.serialize(snapshot, { includeId: true});

        Object.keys(json).forEach(function (key) {
            hash[key] = json[key];
        });
    }
});
