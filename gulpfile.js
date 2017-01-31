//TODO: Javascript task not concatenating properly
//TODO: Maybe add the necessary info to vhosts and such? Set _www Permissions?

var THEME = "scratch-test";
var HOST_URL = "scratch.candyspace.com";

var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  browserSync = require('browser-sync').create(),
  request = require("request");

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('javascript', function() {
  return gulp.src([
    './wp-content/themes/scratch/public/base-main.js'//,
    // './wp-content/themes/' + THEME + '/assets/js/lib/*.js',
    // './wp-content/themes/' + THEME + '/assets/js/custom/*.js'
  ])
    .pipe($.uglify(false))
    .pipe($.rename('main.min.js'))
    .pipe(gulp.dest('./wp-content/themes/' + THEME + '/public'))
    .pipe(browserSync.stream());
});

gulp.task('styles', function() {
  return gulp.src([
    './wp-content/themes/scratch/public/base-main.css',
    './wp-content/themes/' + THEME + '/assets/scss/main.scss'
  ])
    .pipe($.concat('main.css'))
    .pipe($.sass({
      outputStyle: 'compressed'
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: AUTOPREFIXER_BROWSERS
    }))
    .pipe(gulp.dest('./wp-content/themes/' + THEME + '/public/css'))
    .pipe(browserSync.stream());
});

gulp.task('images', function() {
  return gulp.src(['./wp-content/uploads/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,gif,GIF}'], {
    base: '.'
  })
    .pipe($.newer('./wp-content/uploads'))
    .pipe($.imagemin())
    .pipe(gulp.dest('./wp-content/uploads'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  gulp.watch(['./gulpfile.js'], ['styles', 'javascript']);
  gulp.watch(['./wp-content/themes/' + THEME + '/**/*.html', './wp-content/themes/' + THEME + '/**/*.php']).on('change', browserSync.reload);
  gulp.watch(['./wp-content/uploads/**/*'], ['images']);
  gulp.watch(['./wp-content/themes/' + THEME + '/assets/js/**/*.js'], ['javascript']);
  gulp.watch(['./wp-content/themes/' + THEME + '/assets/scss/**/*.scss'], ['styles']);
});

gulp.task('browserSync', function() {
  browserSync.init({
    proxy: HOST_URL + ':80', // change this to match your host
    watchTask: true
  });
});




gulp.task('init', function() {
  return gulp.src('./gulpfile.js')
    .pipe($.prompt.prompt([
      {
        type: 'input',
        name: 'theme',
        message: 'Theme name:',
        validate: function(name) { return !!name.length; }
      },
      {
        type: 'input',
        name: 'host',
        message: 'Host url:',
        validate: function(url) { return !!url.length; }
      }
    ], function(res) {
      THEME = res.theme.toLowerCase();
      HOST_URL = res.host;
      gulp.start('base-init');
    }));
});
gulp.task('update-gulpfile', function() {
  return gulp.src(['./gulpfile.js'])
    .pipe($.replace(/var THEME = ".+";/, 'var THEME = "' + THEME + '";'))
    .pipe($.replace(/var HOST_URL = ".+";/, 'var HOST_URL = "' + HOST_URL + '";'))
    .pipe(gulp.dest('./'));
});
gulp.task('copy-child-template', function() {
  return gulp.src(['./wp-content/themes/scratch/child-template/**/*'])
    .pipe(gulp.dest('./wp-content/themes/' + THEME));
});
gulp.task('create-theme', ['copy-child-template'], function() {
  return gulp.src(['./wp-content/themes/' + THEME + '/style.css'])
    .pipe($.replace(/Theme Name: .+/g, 'Theme Name: ' + THEME.charAt(0).toUpperCase() + THEME.slice(1).toLowerCase()))
    .pipe(gulp.dest('./wp-content/themes/' + THEME + '/'));
});
gulp.task('update-wp-configs', function() {
  var url = HOST_URL.split("://");
  url = url.length == 1 ? "http://" + url[0] : "http://" + url[1];
  request.get('https://api.wordpress.org/secret-key/1.1/salt', function(error, response, body) {
    if (error || response.statusCode != 200) return console.error("Wordpress salts not generated");
    return gulp.src(['./env/*.php'])
      .pipe($.replace(/define\('DB_NAME', '?.+'\);/g, "define('DB_NAME', '" + THEME + "');"))
      .pipe($.replace(/define\('WP_SITEURL', '?.+'\);/g, "define('WP_SITEURL', '" + url + "');"))
      .pipe($.replace(/define\('WP_HOME', '?.+'\);/g, "define('WP_HOME', '" + url + "');"))
      .pipe($.replace(/<!-- salts -->([\s\S]*?)<!-- salts -->/g, "\r\n" + body + "\r\n"))
      .pipe(gulp.dest('./env/'));
  });
});
gulp.task('base-styles', function() {
  return gulp.src(['./wp-content/themes/scratch/assets/scss/master.scss'])
    .pipe($.sass({
      outputStyle: 'expanded'
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: AUTOPREFIXER_BROWSERS
    }))
    .pipe($.rename('base-main.css'))
    .pipe(gulp.dest('./wp-content/themes/scratch/public'));
});
gulp.task('base-javascript', function() {
  return gulp.src([
    './wp-content/themes/scratch/assets/js/lib/jquery.js',
    './wp-content/themes/scratch/assets/js/lib/*.js',
    './wp-content/themes/scratch/assets/js/custom/*.js',
    './wp-content/themes/scratch/assets/js/main.js'
  ])
    .pipe($.concat('base-main.js', {
      newLine: ';'
    }))
    .pipe(gulp.dest('./wp-content/themes/scratch/public'));
});
gulp.task('base-init', ['update-gulpfile', 'create-theme', 'update-wp-configs', 'base-styles', 'base-javascript']);


gulp.task('default', ['browserSync', 'styles', 'javascript', 'watch']);
