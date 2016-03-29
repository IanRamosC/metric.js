var gulp = require('gulp')
  , jshint = require('gulp-jshint')
  , stylish = require('jshint-stylish')
  , uglify = require('gulp-uglifyjs')
  , jsPath = './src/priest.js';

gulp.task('jshint', function() {
  return gulp.src(jsPath)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('minify', function() {
  return gulp.src(jsPath)
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify('priest.min.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function() {
  gulp.watch(jsPath, ['jshint', 'minify']);
});

gulp.task('default', ['jshint', 'minify', 'watch']);
