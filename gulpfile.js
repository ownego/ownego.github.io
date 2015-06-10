var gulp = require('gulp')
  , less = require('gulp-less')
  , inject = require('gulp-inject')
  , concat = require('gulp-concat')
  , usemin = require('gulp-usemin')
  , uglify = require('gulp-uglify')
  , minifyHtml = require('gulp-minify-html')
  , minifyCss = require('gulp-minify-css')
  , rev = require('gulp-rev');


/**
 * Dev:Less
 * LESS to CSS
 */
gulp.task('dev:less', function() {
    return gulp
    .src(['src/less/main.less', 'src/less/libs.less', 'src/less/animations.less'])
    .pipe(less({
        paths: [
            'src/less',
            'src/vendors'
        ]
    }))
    .pipe(gulp.dest('src/css/'))
});

/**
 * Dev:Watch
 */
gulp.task('dev:watch', function() {
    gulp.watch(['src/*.html'], ['dev:less']);
    gulp.watch(['src/less/**'], ['dev:less']);
    gulp.watch(['src/js/**'], ['dev:less']);
});

/**
 * Production:Compile
 */
gulp.task('dist', ['dev:less'], function() {
    gulp
    .src(['src/*.html'])
    .pipe(usemin({
        csslib: [minifyCss(), 'concat'],
        cssmains: [minifyCss(), 'concat'],
        cssanim: [minifyCss(), 'concat'],
        js: [uglify()],
        iejs: [uglify()]
    }))
    .pipe(gulp.dest('dist/'));

    // Copy all images ..
    gulp
    .src('src/img/**')
    .pipe(gulp.dest('dist/img'));

    // .. and everything at root dir
    //   except index.html and vendor dir
    gulp
    .src(['src/**',
          '!src/less/**',
          '!src/less',
          '!src/vendors/**',
          '!src/vendors'])
    .pipe(gulp.dest('dist/'));
});

/**
 * $ gulp
 */
gulp.task('default', [
    'dev:less',
    'dev:watch'
]);
