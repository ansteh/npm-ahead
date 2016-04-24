'use strict';
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

getModulesByKeyword('scheme')
.then(function(data){
  console.log(data.length);
});

/*const getModulesByKeyword = (keyword) => {
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
};*/
