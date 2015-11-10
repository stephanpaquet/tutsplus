/*global React, Backbone */

// Model - Same as Backbone
var ContactStore = Backbone.Collection.extend({
    url: '/api/contacts'
});

var contactstore = new ContactStore();

var ContactList = React.createClass({
    getInitialState: function () {
        return {
            contacts: contactstore
        };
    },
    render: function () { // Return HTML to be render to become a view
        var items = this.state.contacts.map(function (contact) {
            return (<ContactListItem key={contact.get('id')} contact={contact} />);
        });

        return (<div>
                <div className="actions">
                    <ReactRouter.Link to="/conctacts/new"> New contact </ReactRouter.Link>
                </div>
                <ul> {items} </ul>
            </div>
        );
    }
});

contactstore.fetch().then(function () {
    // Router
    ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler) {
        React.render(<Handler />, document.getElementById('main'));
    });
});

var ContactListItem = React.createClass({
    render: function () {
        var c = this.props.contact.toJSON();

        return (<li>
            <ReactRouter.Link to={/contacts/ + c.id}>
                {c.firstName} {c.lastName}
                <span className="email"> {c.email} </span>
            </ReactRouter.Link>
        </li>);
    }
});

var App = React.createClass({
    render: function () {
        return (<div>
            <header>
                <h1> <ReactRouter.Link to="/contacts"> React contacts </ReactRouter.Link></h1>
            </header>
            <ReactRouter.RouteHandler />
        </div>);
    }
});

// Route list
// Handler point to Class
var routes = (<ReactRouter.Route handler={App}>
        <ReactRouter.Route name="contacts" handler={ContactList} />
        <ReactRouter.Redirect from="/" to="/contacts" />
    </ReactRouter.Route>
);
// <ReactRouter.Route name="contacts/new" handler={NewContactForm} />
// <ReactRouter.Route name="contact" path="contacts/:id" handler={Contact} />
