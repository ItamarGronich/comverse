var gulp = require('gulp');
var useRef = require('gulp-useref'),
    gulpIf = require('gulp-if'),
    nano = require('gulp-cssnano'),
    minifyInline = require('gulp-minify-inline'),
    smoosh =require('gulp-smoosher');

gulp.task('minify-concat', function() {
    return gulp.src('index.html')
        .pipe(useRef())
        .pipe(gulpIf('*.css', nano()))
        .pipe(gulp.dest('build/'));
});

gulp.task('make-block', function(){
    return gulp.src('build/index.html')
        .pipe(smoosh({
            cssTags: {
                begin: '<style rel="stylesheet" type="text/css">',
                end: '</style>'
            },
            base: 'build'
        }))
        .pipe(gulp.dest('build/'));
});

gulp.task('default', ['minify-concat', 'make-block']);