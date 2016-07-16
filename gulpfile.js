var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var babel        = require('gulp-babel');
var browserSync  = require('browser-sync');
var concat       = require('gulp-concat');
var eslint       = require('gulp-eslint');
var filter       = require('gulp-filter');
var newer        = require('gulp-newer');
var notify       = require('gulp-notify');
var plumber      = require('gulp-plumber');
var reload       = browserSync.reload;
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var babelify = require('babelify');

var onError = function(err) {
  notify.onError({
    title:    "Error",
    message:  "<%= error %>",
  })(err);
  this.emit('end');
};

var plumberOptions = {
  errorHandler: onError,
};

var jsFiles = {
  vendor: [
     '!src/client/js/vendor/**/*.js',
  ],
  source: [
    'src/client/js/**/*.js',
    'src/client/js/**/*.jsx'
  ]
};

// Lint JS/JSX files
gulp.task('eslint', function() {
  return gulp.src(jsFiles.source)
    .pipe(eslint({
      baseConfig: {
        "ecmaFeatures": {
           "jsx": true
         }
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Copy react.js and react-dom.js to assets/js/src/vendor
// only if the copy in node_modules is "newer"
gulp.task('copy-react', function() {
  return gulp.src('node_modules/react/dist/react.js')
    .pipe(newer('src/client/js/vendor/react.js'))
    .pipe(gulp.dest('src/client/js/vendor'));
});

gulp.task('copy-react-dom', function() {
  return gulp.src('node_modules/react-dom/dist/react-dom.js')
    .pipe(newer('src/client/js/vendor/react-dom.js'))
    .pipe(gulp.dest('src/client/js/vendor'));
});

gulp.task('copy-reflux', function() {
  return gulp.src('node_modules/reflux/dist/reflux.min.js')
    .pipe(newer('src/client/js/vendor/reflux.min.js'))
    .pipe(gulp.dest('src/client/js/vendor'));
});

// Copy assets/js/vendor/*
gulp.task('copy-js-vendor', function() {
  return gulp
    .src([
      'src/client/js/vendor/**/*.js'
    ])
    .pipe(gulp.dest('src/main/resources/public/js/lib'));
});

gulp.task('copy-html', function() {
  return gulp
    .src([
      'src/client/html/**/*.html'
    ])
    .pipe(gulp.dest('src/main/resources/public/'));
});


var scriptsCount = 0;

var dependencies = [
    'react',
    'react-dom',
    'reflux'
];


gulp.task('scripts', ['copy-react', 'copy-react-dom', 'copy-reflux'], function() {
    var appBundler = browserify({
        entries: 'src/client/js/app.jsx',
        debug: true
    });

    if (scriptsCount === 1){
        // create vendors.js for dev environment.
        browserify({
            require: dependencies,
            debug: true
        }).bundle()
            .on('error', gutil.log)
            .pipe(source('vendors.js'))
            .pipe(gulp.dest('./src/main/resources/public/js/'));
    }

    // make the dependencies external so they dont get bundled by the
    // app bundler. Dependencies are already bundled in vendor.js for
    // development environments.
    dependencies.forEach(function(dep){
        appBundler.external(dep);
    });


    appBundler
    // transform ES6 and JSX to ES5 with babelify
        .transform("babelify", {presets: ["es2015", "react"]})
        .bundle()
        .on('error',gutil.log)

        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./src/main/resources/public/js/'));


});

// Compile Sass to CSS
gulp.task('sass', function() {
  var autoprefixerOptions = {
    browsers: ['last 2 versions'],
  };

  var filterOptions = '**/*.css';

  var reloadOptions = {
    stream: true,
  };

  var sassOptions = {
    includePaths: [

    ]
  };

  return gulp.src('src/client/sass/**/*.scss')
    .pipe(plumber(plumberOptions))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('src/main/resources/public/css'))
    .pipe(filter(filterOptions))
    .pipe(reload(reloadOptions));
});

// Watch JS/JSX and Sass files
gulp.task('watch', function() {
  gulp.watch('src/client/js/**/*.{js,jsx}', ['concat']);
  gulp.watch('src/client/sass/**/*.scss', ['sass']);
  gulp.watch('src/client/html/**/*.html', ['copy-html']);
});

// BrowserSync
gulp.task('browsersync', function() {
  browserSync({
    server: {
      baseDir: './src/main/resources/public/'
    },
    open: false,
    online: false,
    notify: false,
  });
});

gulp.task('build', ['sass', 'copy-html','copy-js-vendor', 'scripts']);
gulp.task('default', ['build', 'browsersync', 'watch']);