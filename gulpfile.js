var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps')
var babel = require('gulp-babel');

//Styles
gulp.task('styles', function() {
  console.log('---------');
  console.log('CSS Tasks');
  console.log('---------');
  console.log('');

  return gulp.src([
      'app/src/css/styles.css'
    ])
    .pipe(plumber(function(err) {
      console.log('');
      console.log('---------------');
      console.log('CSS Task Error:');
      console.log('---------------');
      console.log('');
      console.log(err);
      this.emit('end')
    }))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(concat('styles.css'))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/dist/css'))
})

//Scripts
gulp.task('scripts', function () {
  console.log('--------');
  console.log('JS Tasks');
  console.log('--------');
  console.log('');

  // Modules -> Services -> Controllers -> Filters
  return gulp.src([
      'app/src/app.js',
      'app/src/js/ui-router.min.js',
      'app/src/js/angular-local-storage.min.js',
      'app/src/services/authInterceptorService.js',
      'app/src/services/authService.js',
      'app/src/controllers/homeController.js'
    ])
    .pipe(plumber(function(err) {
      console.log('');
      console.log('--------------');
      console.log('JS Task Error:');
      console.log('--------------');
      console.log('');
      console.log(err);
      this.emit('end')
    }))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify({mangle: false}))
    .pipe(concat('scripts.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/dist/js/'))
});

gulp.task('default', ['styles', 'scripts'], function() {
  console.log('------------');
  console.log('DEFAULT Task');
  console.log('------------');
  console.log('');
})

gulp.task('watch', ['default'], function() {
  console.log('----------');
  console.log('WATCH Task');
  console.log('----------');
  console.log('');

  gulp.watch('app/src/**/*.js', ['scripts'])
  gulp.watch('app/src/**/*.css', ['styles'])
})
