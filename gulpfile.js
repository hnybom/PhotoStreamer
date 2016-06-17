var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var del = require('del');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "src/main/resources/public/"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('html', function(){
  return gulp.src(['src/client/html/**/*.html'])
  .pipe(gulp.dest('src/main/resources/public/'))
  .pipe(browserSync.reload({stream:true}))
 });

gulp.task('styles', function(){
  return gulp.src(['src/client/sass/**/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('src/main/resources/public/css/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('src/main/resources/public/css/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function(){
  return gulp.src('src/client/js/**/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(babel())
    .pipe(gulp.dest('src/main/resources/public/js/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('src/main/resources/public/js/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('libs', function() {
  return gulp.src([
      'node_modules/core-js/client/shim.min.js',
      'node_modules/zone.js/dist/zone.js',
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/rxjs/bundles/Rx.umd.js',
      'node_modules/@angular/core/bundles/core.umd.js',
      'node_modules/@angular/common/bundles/common.umd.js',
      'node_modules/@angular/compiler/bundles/compiler.umd.js',
      'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
      'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js'
    ])
    .pipe(gulp.dest('src/main/resources/public/js/lib'))
});

gulp.task('clean', function () {
  return del('src/main/resources/public/**/*');
});

gulp.task('watch', function(){
  gulp.watch("src/client/sass/**/*.scss", ['styles']);
  gulp.watch("src/client/js/**/*.js", ['scripts']);
  gulp.watch("src/client/html/**/*.html", ['html']);
});

gulp.task('default', ['libs', 'styles', 'scripts', 'html'])