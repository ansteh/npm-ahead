'use strict';
const registry = require('npm-stats')();

/*registry.module('lodash').info(function (err, lodash) {
  console.log(lodash);
});*/

//console.log(registry.list());
//console.log(registry.keyword('json').count());

//console.log(registry.keyword('shape').list());

function getModulesByKeyword(keyword){
  let stream = registry.keyword(keyword).list();

  let body = "";

  stream.on('data', (chunk) => {
    body += chunk;
  });

  stream.on('end', () => {
    let data;
    try {
      data = JSON.parse(body);
    } catch (err) {
      console.log(err);
    }
    console.log(data);
  });
};

getModulesByKeyword('scheme');
