const FROM_PATH = './docs/Progetti';
const TO_PATH = '../crarl.it/public/projects';
const AUTHOR_ID = '54880f0742d44fca04e9fddb';

/************************************************************
{
  "_id" : ObjectId("548975116962f7880d2146e0"),
  "slug" : "the-first-project",
  "title" : "the first project",
  "categories" : [ 
      ObjectId("548975aaff2dcdb40db54a90")
  ],
  "state" : "published",
  "__v" : 1,
  "author" : ObjectId("54880f0742d44fca04e9fddb"),
  "content" : {
      "brief" : "bla bla",
      "extended" : "<p>super bla <strong>bla</strong> bla</p>"
  },
  "publishedDate" : ISODate("2014-12-10T23:00:00.000Z"),
  "file" : {
      "filename" : "DLFE4001.pdf",
      "path" : "public/projects",
      "size" : 777087,
      "filetype" : "application/pdf"
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
