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

app.ContactSerializer = DS.RESTSerializer.extend({
    // Intercept the request
    // payload: datas venant du server
    /* Convert:
        GET /api/contacts
        [...]
        { contacts: [...]}
    */
    extractArray: function (store, primaryType, payload) {
        payload = { contacts: payload};
        return this._super(store, primaryType, payload); // parent ?
    },

    /* Convert
        GET /api/contacts/1
        {...}
        { contact: {...}}
    */
    extractSingle: function (store, primaryType, payload, recordId) {
        payload = { contact: payload};
        return this._super(store, primaryType, payload, recordId);
    },

    /* Convert:
        POST /api/contacts
        {...}
        { contact: {...}}
    */
    serializeIntoHash: function (hash, type, snapshot, options) {
        var json = this.serialize(snapshot, {includeId: true});

        Object.keys(json).forEach(function (key) {
            hash[key] = json[key];
        });
    }
});

// Routes
app.Router.reopen({
    location: 'history'
});

app.Router.map(function () {
    this.resource('contacts');
    this.resource('contact', { path: 'contacts/:contact_id' });
    this.route('new', { path: 'contacts/new' }); // route instead of resource (a page)
});

app.IndexRoute = Ember.Route.extend({
    redirect: function () {
        this.transitionTo('contacts');
    }
});

app.ContactsRoute = Ember.Route.extend({
    model: function () {
        return this.store.find('contact');
    }
});

app.ContactController = Ember.Controller.extend({
    actions: {
        update: function () {
            var model = this.get('model');
            model.save();
        },
        delete: function () {
            var model = this.get('model');

            model.deleteRecord(); // Mark has saved on the frontend..
            model.save();         // and made the action on the server

            this.transitionToRoute('contacts');
        }
    }
});
