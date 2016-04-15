var gulp = require('gulp');
var del = require('del');
var path = require('path');
var utils = require('./utils');
var gulpif = require('gulp-if');
var livereload = require('gulp-livereload');
var templateCache = require('gulp-angular-templatecache');

var projectDir = utils.path.projectDir;
var publicDir = utils.path.publicDir;
var jsDistDir = path.join(publicDir, 'js/dist');
var jsSrcDir = path.join(publicDir, 'js/src');
var sourceDir = path.join(utils.path.sourceRoot, 'templates');

gulp.task('clean:tmp', function() {
  del(path.join(jsSrcDir, 'templates.js'), { force: true });
});

gulp.task('clean:index', function() {
  del(path.join(publicDir, 'index.html'), { force: true });
});

gulp.task('compile:tmp', ['clean:tmp'], function() {
  return gulp.src([path.join(sourceDir, '**/*.html'), path.join('!', sourceDir, 'index.html')])
          .pipe(templateCache('templates.js'))
          .pipe(gulp.dest(jsSrcDir))
          .on('error', function(err) {
            console.error('Error running compile:tmp task! ', err.message);
            throw(err);
          });
});

gulp.task('copy:index', ['clean:index'], function() {
  return gulp.src(path.join(sourceDir, 'index.html'))
          .pipe(gulp.dest(publicDir))
          .pipe(gulpif(!utils.production, livereload()));
});