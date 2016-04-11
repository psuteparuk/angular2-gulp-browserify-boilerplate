var path = require('path');

exports.path = {
  projectDir: path.normalize(path.join(__dirname, '..')),
  publicDir: path.normalize(path.join(__dirname, '..', 'public')),
  sourceRoot: path.normalize(path.join(__dirname, '..', 'assets')),
};

exports.watchInterval = 1000;
