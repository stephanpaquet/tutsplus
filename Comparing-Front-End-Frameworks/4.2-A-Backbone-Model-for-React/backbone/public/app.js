/*global Backbone */

// Model
var Contact = Backbone.Model.extend({});

// Collection
var Contacts = Backbone.Collection.extend({
    model: Contact,
    url: '/api/contacts'
});

// Views
var ContactsListView = Backbone.View.extend({
    tagName: 'ul',
    render: function () {
        this.collection.forEach(function (model) {
            this.$el.append((new ContactsItemView({model: model})).render().el);
        }, this);

        return this;
    }
});

var ContactsItemView = Backbone.View.extend({
    tagName: 'li',
    events: {
        'click a': 'handleClick'
    },
    template: _.template($('#contacts-item-view-template').html()),
    render: function () {
        console.info(this.model.toJSON());
        this.el.innerHTML = this.template(this.model.toJSON());
        return this;
    },
    handleClick: function (evt) {
        evt.preventDefault();
        Backbone.history.navigate('contacts/' + this.model.get('id'), {trigger: true});
    }
});

var ActionsView = Backbone.View.extend({
    className: 'actions',
    template: '<a href="/contacts/new"> New Contact </a>',
    render: function () {
        this.el.innerHTML = this.template;
        return this;
    }
});

var ContactView = Backbone.View.extend({
    template: _.template($('#contact-view-template').html()),
    initialize: function () {
        this.listenTo(this.model, 'change:firstName change:lastName', this.updateName);
    },
    events: {
        'click .update': 'update',
        'click .delete': 'delete'
    },
    render: function () {
        this.el.innerHTML = this.template(this.model.toJSON());
        return this;
    },
    update: function () {
        this.model.save({
            firstName: this.$('.firstName').val(),
            lastName: this.$('.lastName').val(),
            email: this.$('.email').val()
        });
    },
    delete: function () {
        this.model.destroy();
        Backbone.history.navigate('', {trigger: true});
    },
    updateName: function () {
        this.$('h2').text(this.model.get('firstName') + ' ' + this.model.get('lastName'));
    }

});

var NewContactView = Backbone.View.extend({
    template: $('#new-contact-view-template').html(),
    render: function () {
        this.el.innerHTML = this.template;
        return this;
    },
    events: {
        'click .add': 'add'
    },
    add: function () {
        this.collection.create({
            firstName: this.$('.firstName').val(),
            lastName: this.$('.lastName').val(),
            email: this.$('.email').val()
        }, {
            success: function () {
                Backbone.history.navigate('', {trigger: true});
            }
        });
    }
});


// Router
var Router = Backbone.Router.extend({
    initialize: function (options) {
        this.contacts = options.contacts;
        this.el       = $('#app');
    },
    routes: {
        '': 'main',
        'contacts': 'displayList',
        'contacts/new': 'displayForm',
        'contacts/:id': 'displaySingle'
    },
    main: function () {
        Backbone.history.navigate('contacts', {trigger: true});
    },
    displayList: function () {
        this.el.empty()
        .append(new ActionsView().render().el)
        .append(new ContactsListView({ collection: this.contacts}).render().el);
    },
    displayForm: function () {
        this.el.empty().append(new NewContactView({collection: this.contacts}).render().el);
    },
    displaySingle: function (id) {
        var model = this.contacts.get(parseInt(id));

        this.el.empty().append(new ContactView({model: model}).render().el);
        console.log(model);
    }
});

var contacts = new Contacts();

contacts.fetch().then(function () {
    var r = new Router({
        contacts: contacts
    });
    Backbone.history.start({ pushState: true});
});
