var express = require('express');
var pg = require('pg');

var app = express();

var conString = "postgres://test:test@localhost/node_api";
var client = new pg.Client(conString);
client.on('drain', client.end.bind(client));
client.connect();

function test(req, res, next) {
    res.send('Hello World!');
    return next();
}

function listStudents(req, res, next) {
    var query = client.query('SELECT id, firstname, lastname FROM students', function(err, result) {
        res.json({students: result.rows});
        return next();
    });
}

app.get('/', test);
app.get('/students', listStudents);

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
