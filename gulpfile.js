'use strict';

var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

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

gulp.task('watch', function () {
  gulp.watch(['index.js', 'src/**/*.js', 'spec/**/*.spec.js'], ['jscs', 'node-lint', 'test']);
});

gulp.task('test', function () {
  return gulp.src('spec/**/*.spec.js')
    .pipe(mocha({ ui: 'bdd', reporter: 'spec'}));
});

gulp.task('default', ['watch'], function () {});
