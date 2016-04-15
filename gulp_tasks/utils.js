var path = require('path');
var gutil = require('gulp-util');

exports.production = !!gutil.env.production;

exports.path = {
  projectDir: path.normalize(path.join(__dirname, '..')),
  publicDir: path.normalize(path.join(__dirname, '..', 'public')),
  sourceRoot: path.normalize(path.join(__dirname, '..', 'app')),
};

exports.watchInterval = 1000;
