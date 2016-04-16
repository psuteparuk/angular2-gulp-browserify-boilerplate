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
var buffer = require('vinyl-buffer');
var addStream = require('add-stream');
var utils = require('./utils');
var templates = require('./templates');

var projectDir = utils.path.projectDir;
var publicDir = utils.path.publicDir;
var jsDistDir = path.join(publicDir, 'js/dist');
var jsSrcDir = path.join(publicDir, 'js/src');
var sourceDir = path.join(utils.path.sourceRoot, 'javascripts');
var templateDir = path.join(utils.path.sourceRoot, 'templates');

gulp.task('clean:js', function() {
  del([path.join(jsDistDir, '**/*'), path.join(jsSrcDir, '**/*')], { force: true });
});

gulp.task('lint:js', function() {
  gulp.src([path.join(sourceDir, 'module.js'), path.join(sourceDir, '**/*.js')])
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('compile:js', ['clean:js'], function() {
  gulp.src(path.join(sourceDir, 'application.js'))
    .pipe(addStream.obj(templates.prepareTemplates()))
    .pipe(concat('application.tmp.js'))
    .pipe(gulp.dest(sourceDir));

  return browserify({
            entries: path.join(sourceDir, 'application.tmp.js'),
            transform: [ngAnnotate]
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
            del(path.join(sourceDir, 'application.tmp.js'), { force: true });
          })
          .pipe(gulpif(!utils.production, livereload()));
});

gulp.task('watch:js', ['compile:js', 'copy:index'], function() {
  if (!utils.production) livereload.listen();
  else del(path.join(jsSrcDir, '**/*'));
  gulp.watch([
    path.join(sourceDir, '**/*.js'),
    path.join(templateDir, '**/*.html'),
    path.join('!', sourceDir, 'application.tmp.js')
  ], { interval: utils.watchInterval }, ['compile:js']);
  gulp.watch([path.join(templateDir, 'index.html')], { interval: utils.watchInterval }, ['copy:index']);
});

gulp.task('build:js', ['compile:js', 'copy:index']);
