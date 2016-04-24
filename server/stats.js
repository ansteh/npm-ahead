'use strict';
const _        = require('lodash');
const registry = require('npm-stats')();

/*registry.module('lodash').info(function (err, lodash) {
  console.log(lodash);
});*/

//console.log(registry.list());
//console.log(registry.keyword('json').count());

//console.log(registry.keyword('shape').list());

const promisify = (stream) => {
  return new Promise((resolve, reject) => {
    let body = "";

    stream.on('data', (chunk) => {
      body += chunk;
    });

    stream.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
  });
};

const getModulesByKeyword = (keyword) => {
  return promisify(registry.keyword(keyword).list());
};

/*getModulesByKeyword('scheme')
.then(function(data){
  console.log(data.length);
});*/

const getModulesList = () => {
  return promisify(registry.list());
};

/*getModulesList()
.then(function(data){
  console.log(data.length);
});*/

const getModulueInfo = (name) => {
  return promisify(registry.module(name).info());
};

/*getModulueInfo('shape-json')
.then(function(info){
  console.log(info);
});*/

const getModulueDownloads = (name) => {
  return promisify(registry.module(name).downloads());
};

/*getModulueDownloads('shape-json')
.then(function(downloads){
  console.log(downloads);
});*/

const stringStreamForEach = (stream, each) => {
  stream.on('data', (chunk) => {
    let tokens = _.split(chunk, '"');
    if(tokens.length === 3){
      each(tokens[1]);
    }
  });
};

const fs = require('fs');
const writeJson = (pathname, json) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(pathname, JSON.stringify(json), (err) => {
      if(err) reject(err);
      resolve();
    });
  });
};

function saveListAsJSON(){
  return getModulesList()
  //return getModulesByKeyword('scheme')
  .then(function(names){
    return writeJson('./list.json', names);
  })
  .then(function(){
    console.log('saved as json!');
  })
  .catch(function(err){
    console.log(err);
  });
};

//saveListAsJSON();
