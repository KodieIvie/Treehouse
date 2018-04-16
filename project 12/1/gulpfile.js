'use strict';

const gulp = require('gulp'),
   nodemon = require('gulp-nodemon'),
   plumber = require('gulp-plumber'),
livereload = require('gulp-livereload'),
    useref = require('gulp-useref'),
       iff = require('gulp-if'),
    uglify = require('gulp-uglify'),
      csso = require('gulp-csso'),
       del = require('del'),
     image = require('gulp-image');

let options = {
  src: 'src',
  dist: 'dist'
};

gulp.task('clean', function() {
  del(['dist']);
});

gulp.task('images', function () {
  gulp.src(options.src + '/img/**/*')
    .pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: false,
      jpegRecompress: true,
      mozjpeg: true,
      guetzli: false,
      gifsicle: true,
      svgo: true,
      concurrent: 10,
      quiet: false // defaults to false
    }))
    .pipe(gulp.dest(options.dist + '/img'));
});

gulp.task('html', function() {
  gulp.src(options.src + '/index.html')
      .pipe(useref())
      .pipe(iff('*.js', uglify()))
      .pipe(iff('*.css', csso()))
      .pipe(gulp.dest(options.dist));
});

gulp.task('develop', () => {
  livereload.listen();
  nodemon({
    script: 'bin/www',
    ext: 'js jade coffee',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', (chunk) => {
      if (/^Express server listening on port/.test(chunk)) {
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});


gulp.task("build", ['html', 'images'], function() {
     return gulp.src([options.src + "/fonts/**", options.src + "/images/**"], { base: options.src})
            .pipe(gulp.dest(options.dist));
});

gulp.task('default', [
   'develop'
]);
