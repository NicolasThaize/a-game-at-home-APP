// dependencies
const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');


///////////////
// - SCSS/CSS
///////////////

const SCSS_SRC = './src/assets/scss/**/*.scss';
const SCSS_DEST = './src/assets/css';
const IMG_SRC = './public/img/*';
const IMG_DEST = './public/compressed_img';

function image_compress() {
    return gulp.src(IMG_SRC)
        .pipe(imagemin())
        .pipe(gulp.dest(IMG_DEST))
}

function compile_scss() {
    return gulp.src(SCSS_SRC)
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(changed(SCSS_DEST))
        .pipe(gulp.dest(SCSS_DEST));
}

// detect changes in SCSS
function watch_scss() {
    gulp.watch(SCSS_SRC, compile_scss);
    gulp.watch(IMG_SRC, image_compress)
}


// Run tasks
gulp.task('default', watch_scss);
exports.compile_scss = compile_scss;
exports.image_compress = image_compress;
exports.watch_scss = watch_scss;
