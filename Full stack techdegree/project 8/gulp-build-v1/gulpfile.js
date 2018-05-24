'use strict';

const gulp = require('gulp'),
webserver = require('gulp-webserver'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
    csso = require('gulp-csso'),
     del = require('del'),
   image = require('gulp-image');

const options = {
  src: '.',
  dist: 'dist'
};

gulp.task('images', function () {
  gulp.src(options.src + '/images/*')
    .pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: true,
      mozjpeg: true,
      guetzli: false,
      gifsicle: true,
      svgo: true,
      concurrent: 10
    }))
    .pipe(gulp.dest(options.dist + '/images'));
});

gulp.task("concatScripts", function() {
    return gulp.src([
        options.src + '/js/circle/circle.js',
        options.src + '/js/circle/autogrow.js'
        ])
    .pipe(maps.init())
    .pipe(concat('global.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'));
});

gulp.task("scripts", ["concatScripts"], function() {
  return gulp.src(options.src + "/js/global.js")
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(gulp.dest(options.dist + '/scripts'));
});

gulp.task('compSass', function() {
  return gulp.src(options.src + "/sass/global.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest(options.src + '/css'));
});

gulp.task("styles", ["compSass"], function() {
  return gulp.src(options.src + "/css/global.css")
    .pipe(csso())
    .pipe(rename('all.min.css'))
    .pipe(gulp.dest(options.dist + '/css'));
});

gulp.task('watch', function() {
  gulp.watch(options.src + '/sass/**/*.scss', ['styles']);
})

gulp.task('clean', function() {
  del('dist');
});

gulp.task("build", ['clean', 'images', 'styles', 'scripts'], function() {
     return gulp.src(['index.html', options.src + "/icons/**"], { base: options.src})
            .pipe(gulp.dest(options.dist));
});

gulp.task('serve', ['watch'], function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: {
        enable: true,
        port: 5000,
        filter: function(fileName) {
          if (fileName.match(/.map$/)) { // exclude all source maps from livereload 
            return false;
          } else {
            return true;
          }
        }
      },
      directoryListing: false,
      open: true
    }));
});

gulp.task("default", ['build'], function() {
  gulp.start('serve')
});
