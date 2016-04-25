var gulp = require('gulp');
var del = require('del');
var path = require('path');
var utils = require('./utils');
var gulpif = require('gulp-if');
var livereload = require('gulp-livereload');
var embedTemplates = require('gulp-angular-embed-templates');

var projectDir = utils.path.projectDir;
var publicDir = utils.path.publicDir;
var jsDistDir = path.join(publicDir, 'js/dist');
var jsSrcDir = path.join(publicDir, 'js/src');
var sourceDir = path.join(utils.path.sourceRoot, 'javascripts');

gulp.task('clean:index', function() {
  del(path.join(publicDir, 'index.html'), { force: true });
});

gulp.task('copy:index', ['clean:index'], function() {
  return gulp.src(path.join(utils.path.sourceRoot, 'index.html'))
          .pipe(gulp.dest(publicDir))
          .pipe(gulpif(!utils.production, livereload()));
});

gulp.task('embed:templates', function() {
  return gulp.src(path.join(sourceDir, '**/*.js'))
          .pipe(embedTemplates())
          .pipe(gulp.dest(jsSrcDir))
          .on('error', function(err) {
            console.error('Error embedding templates! ', err.message);
            throw(err);
          });
});
