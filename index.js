var async = require('async');

var migrations = [
  require('./documents.js'),
  require('./news.js'),
  require('./projects.js')
];


async.series(migrations, function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('DONE!');
  process.exit(0);
});
