var fs = require('fs');
var join = require('path').join;
var path = './docs/Progetti/';
var files = fs.readdirSync(path);
var n = 0;

files.forEach(function (file) {
  var pointIndex = file.lastIndexOf('.');
  var extension = file.substring(pointIndex);
  var filename  = file;
  var re = /DLFE-([0-9]+)\.pdf/;
  var match = file.match(re);
  if (match) {
    filename = 'DLFE' + match[1] + '.pdf';
    fs.rename(join(path, file), join(path, filename));
  }
});

