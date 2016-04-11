var requireDir = require('require-dir');
var gulp = require('gulp');
var gutil = require('gulp-util');

requireDir('./gulp_tasks');

gulp.task('default', ['watch:assets']);

gulp.task('watch:assets', ['watch:css', 'watch:js'], function() {
  gutil.log('Watch for changes to assets...');
});

gulp.task('build:assets', ['build:css', 'build:js']);
