var requireDir = require('require-dir');
var gulp = require('gulp');
var gutil = require('gulp-util');

requireDir('./gulp_tasks');

gulp.task('default', ['watch:app']);

gulp.task('watch:app', ['watch:css', 'watch:js'], function() {
  gutil.log('Watch for changes to app folder...');
});

gulp.task('build:app', ['build:css', 'build:js']);
