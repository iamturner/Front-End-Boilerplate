var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    webpack = require('webpack-stream'),
    webpack_config = require('./webpack.config.js');

var publicPath = './assets';
var buildPath = './src';

/* Check gulp is working */
gulp.task('default', function(done) {
    gutil.log('Gulp is running!');
    done();
});

/* SASS / CSS */
gulp.task('sass', function(done) {
    gulp.src(buildPath+'/sass/**/*.scss')
    .pipe(sass()).on('error', sass.logError)
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(publicPath+'/css'))
    done();
});

/* JS */
gulp.task('js', function(done) {
    gulp.src(buildPath+'/js/**/*.js')
    .pipe(webpack(webpack_config))
    //.pipe(babel())
    //.on('error', console.error.bind(console))
    //.pipe(uglify())
    .pipe(rename({ 
        basename: 'bundle', 
        suffix: '.min' 
    }))
    .pipe(gulp.dest(publicPath+'/js'))
    done();
})

/* Watch */
gulp.task('watch', function() {
    gulp.watch(buildPath+'/sass/**/*.scss', gulp.series('sass'));
    gulp.watch(buildPath+'/js/**/*.js', gulp.series('js'));
});

