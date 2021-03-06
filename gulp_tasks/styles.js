var gulp = require('gulp');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var path = require('path');
var gulpif = require('gulp-if');
var livereload = require('gulp-livereload');
var utils = require('./utils');
var gutil = require('gulp-util');

var projectDir = utils.path.projectDir;
var publicDir = utils.path.publicDir;
var styleDir = path.join(publicDir, 'css');
var sourceDir = path.join(utils.path.sourceRoot, 'stylesheets');

gulp.task('clean:css', function() {
  del([path.join(styleDir, '*')], { force: true });
});

gulp.task('compile:css', ['clean:css'], function() {
  var sourceFile = 'application.less';

  return gulp.src(path.join(sourceDir, sourceFile))
            .pipe(sourcemaps.init())
            .pipe(less())
            .pipe(gulpif(utils.production, cleanCSS({ compatibility: 'ie8' })))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(styleDir))
            .on('error', function(err) {
              console.error('Error running compile:css task! ', err.message);
              throw(err);
            })
            .pipe(gulpif(!utils.production, livereload()));
});

gulp.task('watch:css', ['compile:css'], function() {
  if (!utils.production) livereload.listen();
  gulp.watch(path.join(sourceDir, '**/*.less'), { interval: utils.watchInterval }, ['compile:css']);
});

gulp.task('build:css', ['compile:css']);
