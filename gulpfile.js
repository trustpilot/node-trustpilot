'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');

gulp.task('node-lint', function () {
  return gulp.src(['src/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watch', function () {
  gulp.watch(['index.js', 'src/**/*.js', 'spec/**/*.spec.js'], ['node-lint', 'test']);
});

gulp.task('test', function () {
  return gulp.src('spec/**/*.spec.js')
    .pipe(mocha({ ui: 'bdd', reporter: 'spec'}));
});

gulp.task('default', ['watch'], function () {});
