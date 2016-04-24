'use strict';
const _        = require('lodash');
const registry = require('npm-stats')();

/*registry.module('lodash').info(function (err, lodash) {
  console.log(lodash);
});*/

//console.log(registry.list());
//console.log(registry.keyword('json').count());

//console.log(registry.keyword('shape').list());

const getModulesByKeyword = (keyword) => {
  return new Promise((resolve, reject) => {
    let stream = registry.keyword(keyword).list();

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

/*getModulesByKeyword('scheme')
.then(function(data){
  console.log(data.length);
});*/

const getModulesList = () => {
  return new Promise((resolve, reject) => {
    let stream = registry.list();

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

/*getModulesList()
.then(function(data){
  console.log(data.length);
});*/

const stringStreamForEach = () => {
  let stream = registry.list();

  let body = "";

  let part = "";

  stream.on('data', (chunk) => {
    console.log(chunk);
    if(chunk === "'"){
      console.log('here');
    }
    body += chunk;
  });

  stream.on('end', () => {
    try {
      console.log(JSON.parse(body));
    } catch (err) {
      console.log(err);
    }
  });
};

stringStreamForEach();
