/*global require */

var express    = require('express'),
    bodyParser = require('body-parser'),
    app        = express();

var id = 7;
var data = {
    1: {id: 1, firstName: 'Danny',    'lastName': 'Stork',   email: 'danny.stroke@example.com'},
    2: {id: 2, firstName: 'Carlotta', 'lastName': 'McOwen',  email: 'carlotta.mcowen@example.com'},
    3: {id: 3, firstName: 'Luther',   'lastName': 'Ellery',  email: 'luther.ellery@example.com'},
    4: {id: 4, firstName: 'Finch',    'lastName': 'Horsky',  email: 'finch.horsky@example.com'},
    5: {id: 5, firstName: 'Carson',   'lastName': 'Andrews', email: 'carson.andrews@example.com'},
    6: {id: 6, firstName: 'Mac',      'lastName': 'Parker',  email: 'mac.parke@example.com'},
    7: {id: 7, firstName: 'J. D.',    'lastName': 'Barney',  email: 'jd.barney@example.com'}
};

app.use(bodyParser.json());
app.use(express.status('./public'));

app.route('/api/contacts')
    .get(function (req, res) {
        "use strict";

        res.json(Object.keys(data).map(function (key) {
            return data[key];
        }));
    })
    .post(function (req, res) {
        "use strict";
        var record = req.body;
        
        record.id = ++id;
        data[record.id] = record;
        res.json(record);
    });
