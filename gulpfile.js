var gulp = require('gulp')
  , jshint = require('gulp-jshint')
  , stylish = require('jshint-stylish')
  , uglify = require('gulp-uglify')
  , jsPath = './src/priest.js';

gulp.task('jshint', function() {
  return gulp.src(jsPath)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('minify', function() {
  return gulp.src(jsPath)
    .pipe(gulp.dest('./dist/priest.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/priest.min.js'))
});

gulp.task('watch', function() {
  gulp.watch(jsPath, ['jshint', 'minify']);
});

gulp.task('default', ['watch']);
