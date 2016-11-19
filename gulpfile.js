const gulp = require('gulp');
const path = require('path');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');
const runSeq = require('run-sequence');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const jade = require('gulp-jade');
const templateCache = require('gulp-angular-templatecache');
const less = require('gulp-less');

gulp.task('default', ['lint']);

gulp.task('lint', () => {
  return gulp.src([
    'gulpfile.js',
    '.eslintrc.js',
    'backend/**/*.js',
    'frontend/**/*.js'
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('build', (callback) => {
  return runSeq('clean', 'html', 'templates', 'js', 'js_lib', 'css', callback);
});

gulp.task('clean', () => {
  return gulp.src('build/*', { read: false })
    .pipe(clean());
});

gulp.task('html', () => {
  return gulp.src(['frontend/index.html'])
    .pipe(gulp.dest('build'));
});

gulp.task('js', () => {
  return gulp.src(['frontend/app/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build'));
});

gulp.task('js_lib', () => {
  return gulp.src([
      'bower_components/angular/angular.min.js',
      'bower_components/angular-ui-router/release/angular-ui-router.min.js',
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('lib.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build'));
});

gulp.task('css', () => {
  return gulp.src('frontend/app/app.less')
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: [path.join(__dirname, 'frontend', 'app')],
      compress: false,
      filename: 'app.css'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build'));
});

gulp.task('templates', () => {
    return gulp.src(['frontend/**/*.jade'])
    .pipe(jade())
    .pipe(templateCache('app-templates.js', {
        module: 'myApp',
        transformUrl: (url) => {
          return url.replace('.html', '');
        }
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('watch', () => {
  gulp.watch('frontend/app/**/*.js', ['js']);
  gulp.watch('frontend/index.html', ['html']);
  gulp.watch('frontend/**/*.less', ['css']);
});

gulp.task('dev', ['build', 'watch'], () => {
  nodemon({
    script: 'backend/index.js',
    ext: 'js',
    watch: ['app.js', 'backend/**/*.js'],
    env: {
      NODE_ENV: 'development'
    }
  });
});
