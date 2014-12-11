const FROM_PATH = './docs/File';
const TO_PATH = '../crarl.it/public/documents';
const AUTHOR_ID = '54880f0742d44fca04e9fddb';

/************************************************************
{
  "_id" : ObjectId("5488c523ab31c7f109839444"),
  "slug" : "my-very-second-document",
  "title" : "my very second document",
  "categories" : [],
  "state" : "draft",
  "__v" : 0,
  "author" : ObjectId("54880f0742d44fca04e9fddb"),
  "content" : {
      "brief" : "questo è il mio secondo documento",
      "extended" : ""
  },
  "file" : {
      "filename" : "Chiara Cicerchia - Presentazione.ppt",
      "path" : "public/documents",
      "size" : 1259520,
      "filetype" : "application/vnd.ms-powerpoint"
  }
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
        "path" : "public/documents",
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
