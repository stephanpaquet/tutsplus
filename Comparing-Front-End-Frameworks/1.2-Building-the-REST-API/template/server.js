/*global require, __dirname */

var express    = require('express'),
    bodyParser = require('body-parser'),
    app        = express();

var id = 7;

// Datablase .. un objet javascript
var data = {
    1: {id: 1, firstName: 'Danny',    'lastName': 'Stork',   email: 'danny.stroke@example.com'},
    2: {id: 2, firstName: 'Carlotta', 'lastName': 'McOwen',  email: 'carlotta.mcowen@example.com'},
    3: {id: 3, firstName: 'Luther',   'lastName': 'Ellery',  email: 'luther.ellery@example.com'},
    4: {id: 4, firstName: 'Finch',    'lastName': 'Horsky',  email: 'finch.horsky@example.com'},
    5: {id: 5, firstName: 'Carson',   'lastName': 'Andrews', email: 'carson.andrews@example.com'},
    6: {id: 6, firstName: 'Mac',      'lastName': 'Parker',  email: 'mac.parke@example.com'},
    7: {id: 7, firstName: 'J. D.',    'lastName': 'Barney',  email: 'jd.barney@example.com'}
};

app.use(bodyParser.json()); // parse le json si dans la requete on a du JSON
app.use(express.static('./public')); //

app.route('/api/contacts')
    // return an array des donnees de contacts
    .get(function (req, res) { // request et response object
        "use strict";

        res.json(Object.keys(data).map(function (key) {
            return data[key];
        }));
    })

    // create a new contact
    .post(function (req, res) {
        "use strict";

        var record = req.body;

        record.id = ++id;
        data[record.id] = record;
        res.json(record);
    });


app.route('/api/contacts/:id')
    // get contact infos
    .get(function (req, res) {
        "use strict";

        res.json(data[req.params.id]);
    })
    // update this contact
    .put(function (req, res) {
        "use strict";

        data[req.params.id] = req.body;

        res.json(res.body); // return le contact
    })
    // delete contact
    .delete(function (req, res) {
        "use strict";

        delete data[req.params.id];

        res.json(null);
    });

// default route.. si rien ne match
app.get('*', function (req, res) {
    "use strict";

    res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000);
