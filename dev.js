'use strict';

const express        = require('express');
const app            = express();
const path           = require('path');
const fs             = require('fs');
const url            = require('url');
const _              = require('lodash');

app.use('/client', express.static(path.join(__dirname, '/client')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

const list = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'server/list.json'), 'utf8'));

app.get('/corpus', function(req, res){
  /*fs.readFile(path.resolve(__dirname, 'server/list.json'), 'utf8', (err, data) => {
    if (err) throw err;
    res.send(data);
  });*/
  res.json(list);
});

app.get('/search', function(req, res){
  let query = url.parse(req.url, true).query.q;
  let suggestions = getSuggestionsBy(query);
  suggestions = _.map(suggestions, (name) => {
    return { word: name };
  });
  res.json(suggestions);
});

function getSuggestionsBy(query){
  let index = _.findIndex(list, (name) => {
    return _.startsWith(name, query);
  });
  return _.slice(list, index, index+10);
};

const server = require('http').Server(app);

server.listen(3000, function(){
  console.log('listening on *:3000');
});
