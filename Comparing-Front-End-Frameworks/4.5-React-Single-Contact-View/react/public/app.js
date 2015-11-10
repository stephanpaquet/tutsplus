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

var Contact = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    getInitialState: function () {
        var id = parseInt(this.context.router.getCurrentParams().id, 10);

        return {
            contact: contactstore.get(id)
        }
    },
    update: function () {
        this.state.contact.save({
            firstName: React.findDOMNode(this.refs.firstName).value,
            lastName: React.findDOMNode(this.refs.lastName).value,
            email: React.findDOMNode(this.refs.email).value
        }).then(function () {
            this.setState({
                contact: this.state.contact
            });
        }.bind(this));
    },
    delete: function () {
        this.state.contact.destroy().then(function () {
            this.context.router.transitionTo('/contacts');
        }.bind(this));
    },
    render: function () {
        var c = this.state.contact.toJSON();

        return (<div>
            <h2> {c.firstName} {c.lastName} </h2>
            <div className="form-group">
                <label>First name</label>
                <input type="text" ref="firstName" className="firstName form-control" defaultValue={c.firstName} />
            </div>

            <div className="form-group">
                <label>Last name</label>
                <input type="text" ref="lastName" className="lastName form-control" defaultValue={c.lastName} />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input type="text" ref="email" className="email form-control" defaultValue={c.email} />
            </div>

            <div className="form-group">
                <button onClick={this.update} className="btn btn-primary" type="button" name="update"> Update </button>
                <button onClick={this.delete} className="btn btn-danger" type="button" name="delete"> Delete </button>
            </div>
        </div>);
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
        <ReactRouter.Route name="contact" path="contacts/:id" handler={Contact} />
    </ReactRouter.Route>
);
// <ReactRouter.Route name="contacts/new" handler={NewContactForm} />
