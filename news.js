const FROM_PATH = './docs/Attualita';
const TO_PATH = '../crarl.it/public/news';
const AUTHOR_ID = '54880f0742d44fca04e9fddb';

/************************************************************
{
  "_id" : ObjectId("548968838095cb8b0c21d422"),
  "slug" : "la-mia-prima-attualita",
  "title" : "la mia prima attualità",
  "categories" : [],
  "state" : "published",
  "__v" : 0,
  "author" : ObjectId("54880f0742d44fca04e9fddb"),
  "content" : {
      "brief" : "blabla",
      "extended" : "<p>non male <strong>questo</strong> editor!!!</p>"
  },
  "publishedDate" : ISODate("2014-12-10T23:00:00.000Z"),
  "url" : "http://repubblica.it"
}
*************************************************************/

var migrator = require('./migrator.js');
var ObjectId = require('mongojs').ObjectId;

var project_generator = function (from, to, file, mimetype, size) {
  return {
    "_id": new ObjectId(),
    "slug" : file,
    "title" : file,
    "categories" : [],
    "state" : "draft",
    "__v" : 0,
    "author" : ObjectId(AUTHOR_ID),
    "content" : {
        "brief" : "riempire questa sezione",
        "extended" : "<p>riempire questa sezione</p>"
    },
    "file" : {
        "filename" : file,
        "path" : "public/news",
        "size" : size,
        "filetype" : mimetype
    }
  };
};

var migrate = migrator('projects', FROM_PATH, TO_PATH, project_generator);

/**
 * module exprot
 */

module.exports = migrate;

/**
 * main
 */

if (!module.parent) {
  migrate(function (err) {
    if (err) {
      console.log(err);
      return;
    }

    console.log('DONE!');
    process.exit(0);
  });
}
