var gulp = require('gulp');
var del = require('del');
var path = require('path');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var utils = require('./utils');

var projectDir = utils.path.projectDir;
var publicDir = utils.path.publicDir;
var jsDistDir = path.join(publicDir, 'js/dist');
var jsSrcDir = path.join(publicDir, 'js/src');
var sourceDir = path.join(utils.path.sourceRoot, 'javascripts');

gulp.task('clean:js', function(callback) {
  del([path.join(jsDistDir, '**/*'), path.join(jsSrcDir, '**/*')], { force: true }, callback);
});

gulp.task('compile:js', ['clean:css'], function() {
  return gulp.src([path.join(sourceDir, 'module.js'), path.join(sourceDir, '**/*.js')])
          .pipe(sourcemaps.init())
          .pipe(concat('application.js'))
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(jsDistDir))
          .on('error', function(err) {
            console.error('Error running compile:js task! ', err.message);
            throw(err);
          });
});

gulp.task('watch:js', ['compile:js'], function() {
  gulp.watch([path.join(sourceDir, '**/*.js')], { interval: utils.watchInterval }, ['compile:js']);
});

gulp.task('build:js', ['compile:js']);
