/*globals require, export */

var JSLINT = require("./JSLint/jslint").JSLINT,
  print = require("sys").print,
  fs = require("fs"),
  options = require("./lint-options").options,
  found = 0;

var javascripts_root = "public/javascripts/";
var test_directories = ['onloads/', 'library/'];

function test_file(path) {
  var src = require("fs").readFileSync(path, "utf8"),
    ok = {},
    e,
    w,
    i;

  JSLINT(src, options);

  e = JSLINT.errors;

  for (i = 0; i < e.length; i += 1) {
    w = e[i];

    if (w !== null && !ok[w.reason]) {
      found += 1;
      print("\n" + path + "\n");
      print("\n" + w.evidence + "\n");
      print("    Problem at line " + w.line + " character " + w.character + ": " + w.reason);
    }
  }

}

function test_directory(path) {
  var contents = fs.readdirSync(path),
    i,
    file_path;
  for (i in contents) {
    file_path = path + '/' + contents[i];
    if (fs.statSync(file_path).isDirectory()) {
      test_directory(file_path);
    } else if (contents[i].match(/.*\.js$/)) {
      test_file(file_path);
    }
  }
}

var i;

for (i in test_directories) {
  test_directory(javascripts_root + test_directories[i]);
}


if (found > 0) {
  print("\n" + found + " Error(s) found.\n");
} else {
  print("JSLint check passed.\n");
}
