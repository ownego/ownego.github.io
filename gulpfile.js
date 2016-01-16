var gulp = require('gulp')
  , less = require('gulp-less')
  , inject = require('gulp-inject')
  , concat = require('gulp-concat')
  , usemin = require('gulp-usemin')
  , uglify = require('gulp-uglify')
  , minifyHtml = require('gulp-minify-html')
  , minifyCss = require('gulp-minify-css')
  , rev = require('gulp-rev')
  , swig = require('gulp-swig')
  , prettify = require('gulp-html-prettify')
  , rename = require('gulp-rename')
  ;

var config = {
  app: {
    src: 'src/',
    index: 'index.html',
    dist: {
      dev: 'dist/dev/',
      production: './',
      indent: {
        indentSize: 2,
        indentChar: ' ',
        noBlankLine: true
      },
    },
    min: 'dist_min'
  },
  html: {
    src: [
      '{{ config.app.src }}/swig/*.html',
    ],
    dest: '{{ config.app.src }}/',
    watch: [
      '{{ config.app.src }}/swig/**',
    ]
  },
  less: {
    src: [
      '{{ config.app.src }}/assets/less/main.less',
      '{{ config.app.src }}/assets/less/libs.less',
      '{{ config.app.src }}/assets/less/animations.less'
    ],
    dest: '{{ config.app.src }}/assets/css/',
    watch: [
      '{{ config.app.src }}/assets/less/**'
    ],
    config: {
      paths: [
        '{{ config.app.src }}/assets/less/',
        '{{ config.app.src }}/vendors/',
        '{{ config.app.src }}'
      ]
    }
  },
}

// Inititla config before use
config = interpolate(config);

/**
 * DEV:Swig
 * From swig to html
 */
gulp.task('dev:swig', function() {
  return gulp
    .src(config.html.src)
    .pipe(swig({
      defaults: {
        cache: false
      }
    }))
    .pipe(gulp.dest(config.html.dest));
});

/**
 * Dev:Less
 * LESS to CSS
 */
gulp.task('dev:less', function() {
  return gulp
  .src(config.less.src)
  .pipe(less(config.less.config))
  .pipe(gulp.dest(config.less.dest))
});

/**
 * Dev:Watch
 */
gulp.task('dev:watch', function() {
  gulp.watch(config.html.watch, ['dev:swig']);
  gulp.watch(config.less.watch, ['dev:less']);
});


gulp.task('dist:dev', ['dev:swig', 'dev:less'], function() {

  // DEV
    gulp
      .src([config.app.src+'/**',
        '!'+config.app.src+'/assets/css/**',
        '!'+config.app.src+'/assets/css',
        '!'+config.app.src+'/assets/less/**',
        '!'+config.app.src+'/assets/less',
        '!'+config.app.src+'/assets/js/**',
        '!'+config.app.src+'/assets/js',
        '!'+config.app.src+'/swig/**',
        '!'+config.app.src+'/swig',
        '!'+config.app.src+'/*.html',
        '!'+config.app.src+'/vendors/**',
        '!'+config.app.src+'/vendors'])
      .pipe(gulp.dest(config.app.dist.dev));

    gulp
      .src(['src/*.html'])
//      .src([config.app.src+'*.html'])
      .pipe(tidyHtml(config.app.dist.indent))
      .pipe(usemin())
      .pipe(gulp.dest(config.app.dist.dev));
});

gulp.task('dist:production', function() {
  //   PRODUCTION minify files
    // CSS
    gulp
      .src([config.app.dist.dev+'assets/css/**'])
      .pipe(minifyCss())
//      .pipe(rename({
//        suffix: '.min'
//      }))
      .pipe(gulp.dest(config.app.dist.production+'assets/css/'));

    gulp
      .src([config.app.dist.dev+'assets/js/**'])
      .pipe(uglify())
      .pipe(gulp.dest(config.app.dist.production+'assets/js/'));

    gulp
      .src([config.app.dist.dev+'*.html'])
      .pipe(minifyHtml({
        empty: true,
        quotes: true
      }))
      .pipe(gulp.dest(config.app.dist.production));

    gulp
    .src([config.app.dist.dev+'/**',
      '!'+config.app.dist.dev+'/assets/css/**',
      '!'+config.app.dist.dev+'/assets/css',
      '!'+config.app.dist.dev+'/assets/less/**',
      '!'+config.app.dist.dev+'/assets/less',
      '!'+config.app.dist.dev+'/assets/js/**',
      '!'+config.app.dist.dev+'/assets/js',
      '!'+config.app.dist.dev+'/swig/**',
      '!'+config.app.dist.dev+'/swig',
      '!'+config.app.dist.dev+'/*.html',
      '!'+config.app.dist.dev+'/vendors/**',
      '!'+config.app.dist.dev+'/vendors'])
    .pipe(gulp.dest(config.app.dist.production));
})
/**
 * Production:Compile
 */
gulp.task('dist', ['dist:dev']);

/**
 * $ gulp
 */
gulp.task('default', [
  'dev:swig',
  'dev:less',
  'dev:watch'
]);


/**
 * @param opt
 * @return {Object}
 * @description
 */
function interpolate(opt) {
  var self = this;

  if('string' == typeof opt && /{{.+?}}/.test(opt)) {
    opt = opt.replace(/{{\s*(.+?)\s*}}/g, function(str, expr) {
      return eval(expr);
    });
  } else if('object' == typeof opt) {
    for(var k in opt) {
      opt[k] = arguments.callee.call(self, opt[k]);
    }
  }

  return opt;
}

/**
 * tidyHtml
 */
function tidyHtml(opts) {
  var through2 = require('through2'),
    jsBeautify = require('js-beautify');

  return through2.obj(function (file, enc, next) {
    if (file.isNull()) {
      this.push(file);
      return next();
    }

    if (file.isStream()) {
      this.emit(
        'error',
        new PluginError('tidy-html', 'Streaming not supported')
      );
      return next();
    }

    if (file.isBuffer()) {
      var contents = file.contents.toString('utf8');

      // Strip comments
      //   except IE conditional comments
      //   if(
      if (opts.noComment) {
        contents = contents.replace(/<!--\s*(?!\[if\s+(lte?|gte?)?\s+IE).*-->/gmi, '');
      }

      // JS Beautify
      //   indent + format
      contents = jsBeautify.html(contents, {
        indent_size: opts.indentSize || 4,
        indent_char: opts.indentChar || ' ',
        preserve_newlines: false,
        unformatted: ['pre']
      });

      // Remove all blank lines,
      //   actually they have been removed by jsBeautify
      //   but we still have separators between
      //   <html>, <head> and <body> ..
      if (opts.noBlankLine) {
        contents = contents.replace(/^\s*[\r\n]+/gm, '');
      }

      file.contents = new Buffer(contents);
    }

    this.push(file);
    return next();
  })
}
