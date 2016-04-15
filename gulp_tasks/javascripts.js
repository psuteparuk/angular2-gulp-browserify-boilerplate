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
var ngAnnotate = require('browserify-ngannotate');
var source = require('vinyl-source-stream');
var utils = require('./utils');

var projectDir = utils.path.projectDir;
var publicDir = utils.path.publicDir;
var jsDistDir = path.join(publicDir, 'js/dist');
var jsSrcDir = path.join(publicDir, 'js/src');
var sourceDir = path.join(utils.path.sourceRoot, 'javascripts');
var templateDir = path.join(utils.path.sourceRoot, 'templates');

gulp.task('clean:js', function() {
  del([path.join(jsDistDir, '**/*'), path.join(jsSrcDir, '**/*'), path.join('!', jsSrcDir, 'templates.js')], { force: true });
});

gulp.task('lint:js', function() {
  gulp.src([path.join(sourceDir, 'module.js'), path.join(sourceDir, '**/*.js')])
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('compile:js', ['clean:js'], function() {
  return browserify({
            entries: path.join(sourceDir, 'application.js'),
            transform: [ngAnnotate]
          })
          .bundle()
          .pipe(source('application.js'))
          .pipe(gulp.dest(jsSrcDir))
          .on('error', function(err) {
            console.error('Error running compile:js task! ', err.message);
            throw(err);
          });
});

gulp.task('compile:js-dist', ['compile:js', 'compile:tmp'], function() {
  return gulp.src([path.join(jsSrcDir, 'application.js'), path.join(jsSrcDir, 'templates.js')])
          .pipe(sourcemaps.init())
          .pipe(concat('application.min.js'))
          .pipe(gulpif(utils.production, uglify({ preserveComments: 'license' })))
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(jsDistDir))
          .on('error', function(err) {
            console.error('Error running compile:js-dist task! ', err.message);
            throw(err);
          })
          .pipe(gulpif(!utils.production, livereload()));
});

gulp.task('watch:js', ['compile:js-dist', 'copy:index'], function() {
  if (!utils.production) livereload.listen();
  else del(path.join(jsSrcDir, '**/*'));
  gulp.watch([path.join(sourceDir, '**/*.js')], { interval: utils.watchInterval }, ['compile:js-dist']);
  gulp.watch([path.join(templateDir, '**/*.js')], { interval: utils.watchInterval }, ['compile:js-dist']);
  gulp.watch([path.join(templateDir, 'index.html')], { interval: utils.watchInterval }, ['copy:index']);
});

gulp.task('build:js', ['compile:js-dist', 'copy:index']);
