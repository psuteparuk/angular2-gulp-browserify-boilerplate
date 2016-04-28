var gulp = require('gulp');
var del = require('del');
var path = require('path');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var addStream = require('add-stream');
var utils = require('./utils');
var templates = require('./templates');

var projectDir = utils.path.projectDir;
var publicDir = utils.path.publicDir;
var jsDistDir = path.join(publicDir, 'js/dist');
var jsSrcDir = path.join(publicDir, 'js/src');
var sourceDir = path.join(utils.path.sourceRoot, 'javascripts');

gulp.task('clean:js', function() {
  del([path.join(jsDistDir, '**/*')], { force: true });
});

gulp.task('lint:js', function() {
  gulp.src([path.join(sourceDir, 'module.js'), path.join(sourceDir, '**/*.js')])
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('clean:helper', function() {
  del(path.join(jsDistDir, 'angular2-polyfills.min.js'), { force: true });
});

gulp.task('copy:helper', ['clean:helper'], function() {
  return gulp.src('node_modules/angular2/bundles/angular2-polyfills.min.js')
          .pipe(gulp.dest(jsDistDir));
});

gulp.task('compile:js', ['clean:js', 'embed:templates', 'copy:helper'], function() {
  return browserify({
            entries: path.join(jsSrcDir, 'application.js'),
            transform: [babelify]
          })
          .bundle()
          .pipe(source('application.min.js'))
          .pipe(buffer())
          .pipe(sourcemaps.init())
          .pipe(gulpif(utils.production, uglify({ preserveComments: 'license' })))
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(jsDistDir))
          .on('error', function(err) {
            console.error('Error running compile:js task! ', err.message);
            throw(err);
          })
          .on('end', function() {
            del(jsSrcDir, { force: true });
          })
          .pipe(gulpif(!utils.production, livereload()));
});

gulp.task('watch:js', ['compile:js', 'copy:index'], function() {
  if (!utils.production) livereload.listen();
  else del(path.join(jsSrcDir, '**/*'));
  gulp.watch([path.join(sourceDir, '**/*.js'), path.join(sourceDir, '**/*.html')], { interval: utils.watchInterval }, ['compile:js']);
  gulp.watch([path.join(utils.path.sourceRoot, 'index.html')], { interval: utils.watchInterval }, ['copy:index']);
});

gulp.task('build:js', ['compile:js', 'copy:index']);
