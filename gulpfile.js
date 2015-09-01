'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');

gulp.task('node-lint', function () {
  return gulp.src(['src/*.js'])
    .pipe(jshint({node: true}))
    .pipe(jshint.reporter('default'));
});

gulp.task('jscs', function () {
  gulp.src(['index.js', 'src/*.js'])
    .pipe(jscs().on('error', function (err) {
      console.log(err.toString());
    }));
});

gulp.task('watch', ['default'], function () {
  gulp.watch(['index.js', 'src/**/*.js'], ['jscs', 'node-lint', 'default']);
});

gulp.task('default', function () {
  return gulp.src(['src/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('lib'));
});
