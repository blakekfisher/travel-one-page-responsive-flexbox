const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');


function watch(cb) {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });

    gulp.watch('src/*.html', compileHTML).on('change', browserSync.reload);
    gulp.watch('src/**/*.*', compileCSS);

    cb();
}

function compileHTML(cb) {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
    cb();
}

function compileCSS(cb) {
    gulp.src('src/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream())
    cb();
}

function imageMin(cb) {
    gulp.src('src/images/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
    cb();
}

exports.watch = watch;
exports.compileHTML = compileHTML;
exports.compileCSS = compileCSS;
exports.imageMin = imageMin;
exports.default = gulp.series(watch, compileHTML, compileCSS);