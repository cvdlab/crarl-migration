const LIMIT = 4;

var mongojs = require('mongojs');

var fs = require('fs');
var fse = require('fs-extra');
var join = require('path').join;

var mime = require('mime');

var async = require('async');

/**
 * module export
 */

module.exports = function (collection, from_path, to_path, doc_generator) {
  var db = mongojs('crarl', [collection]);
  var files = fs.readdirSync(from_path);
  return function (end) {
    async.eachLimit(files, LIMIT, function (file, done) {
      var from = join(from_path, file);
      var to = join(to_path, file);
      var mimetype = mime.lookup(from);
      var size = fs.statSync(from).size;
      // copy file
      fse.copySync(from, to);
      var doc = doc_generator(from, to, file, mimetype, size);
      db[collection].insert(doc, done);
    }, end);
  };
};
