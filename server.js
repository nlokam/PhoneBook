
var express = require('express');
var http = require('http');
var port = 9000;
var app = express();
var mongojs = require('mongojs');
var db = mongojs('mongodb://nikhil:nikhil@ds025180.mlab.com:25180/phonebook', ['phonebook']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/phonebook', function (req, res) {
  console.log('I received a GET request');

  db.phonebook.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/phonebook', function (req, res) {
  console.log(req.body);
  db.phonebook.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/phonebook/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.phonebook.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/phonebook/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.phonebook.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/phonebook/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.phonebook.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});
app.listen(port);

console.log("Server running at port 9000");