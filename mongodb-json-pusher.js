var mongojs = require('mongojs');
var async = require('async');
var fs = require('fs');
var nconf = require('nconf');

//
// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//   3. A file located at 'path/to/config.json'
//

nconf
  .argv()
  .env()
  .file({ file: './config.json' });

/*//
// Set a few variables on `nconf`.
//
nconf.set('database:host', '127.0.0.1');
nconf.set('database:port', 27017);*/

/*//
// Get the entire database object from nconf. This will output
// { host: '127.0.0.1', port: 5984 }
//
console.log('foo: ' + nconf.get('foo'));
console.log('NODE_ENV: ' + nconf.get('NODE_ENV'));
console.log('database: ' + nconf.get('database'));

//
// Save the configuration object to disk
//
nconf.save(function (err) {
  fs.readFile('path/to/your/config.json', function (err, data) {
    console.dir(JSON.parse(data.toString()))
  });
});*/

var data = fs.readFileSync(nconf.get('data'), 'utf8');
var documents = JSON.parse(data);

var mongojs = require('mongojs');
var collection = nconf.get('collection');
var db = mongojs('crarl', [collection]);

async.eachLimit(documents, 4, function (d, done) {
  db.structures.insert(d, done)
}, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('DONE!');
  process.exit(0);
});

