var gulp = require('gulp');
const sass = require('gulp-sass');
const sasslint = require('gulp-sass-lint');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const babel = require('gulp-babel');

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      watch: true,
      baseDir: 'dist'
    },
  })
});

gulp.task('sass-lint', function() {
  return gulp.src(['frontend/scss/**/*.scss'])
    .pipe(sasslint())
    .pipe(sasslint())
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError())
});

gulp.task('sass', function() {
  return gulp.src('frontend/scss/styles.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
        stream: true
      }
    ))
});

gulp.task('js', function() {
  return gulp.src('frontend/js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('index.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({
        stream: true
      }
    ))
});

gulp.task('html', function() {
  return gulp.src('frontend/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
        stream: true
      }
    ))
});

gulp.task('fonts', function() {
  return gulp.src('frontend/fonts/*.ttf')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('images', function () {
  return gulp.src('frontend/images/**/*')
    .pipe(gulp.dest('dist/images'))
});

gulp.task('watch', function(){
  gulp.watch(['frontend/js/**/*.js', 'frontend/*.html', 'frontend/fonts/*.ttf', 'frontend/images/**/*', 'frontend/scss/**/*.scss'], gulp.series(['js', 'html', 'fonts', 'images', 'sass', "sass-lint"]));
});
gulp.task('default', gulp.series(['js', 'html', 'sass', 'sass-lint', 'fonts', 'images', gulp.parallel(['watch', 'browserSync'])]));
