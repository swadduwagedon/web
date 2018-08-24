"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open'); //Open a URL in a web browser
//var browserify = require('browserify'); // Bundles JS
var concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    htmlmin = require('gulp-htmlmin'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require("browser-sync"),
    _connects = require('gulp-connect-php'),
    notify = require("gulp-notify");

var config = {
    port: 9216,
    devBaseUrl: 'http://localhost',
    paths: {
        css: [
            'node_modules/bootstrap/dist/**/*.css',
            'src/**/*.css'
        ],
        dist: 'dist/'
    }
}


gulp.task('connect', function() {
    _connects.server({ base: 'dist', port: config.port })

});

gulp.task('browser_Sync', ['connect'], function() {
    browserSync({
        injectChanges: true,
        proxy: '127.0.0.1:' + config.port
    });

});



gulp.task('default', ['scripts', 'styles', 'htmlMinify', 'imagemin', 'move_fonts', 'phpcopy', 'browser_Sync', 'watch_task']); //image
//gulp.task('default', ['scripts', 'styles', 'htmlMinify', 'move_fonts', 'watch_task', 'phpcopy']);

//watch Task
gulp.task('watch_task', function() {
    var server = livereload();
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/css/*.css', ['styles']);
    gulp.watch('src/*.html', ['htmlMinify']);
    gulp.watch('src/images/*.*', ['imagemin']);
    gulp.watch('src/fonts/*.*', ['move_fonts']);
    gulp.watch('src/*.php', ['phpcopy']);
    gulp.src("dist/**").pipe(notify({
        message: "Generated file: <%= file.relative %> @ <%= options.date %>",
        templateOptions: {
            date: new Date()
        }
    }))
});

//script uglify
gulp.task('scripts', function() {
    gulp.src('src/js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
    //.pipe(notify("  <%= file.relative %>! ========= Script done...."));
});

//styles uglify
gulp.task('styles', function() {
    gulp.src('src/css/*.css')
        .pipe(plumber())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
    //.pipe(notify("  <%= file.relative %>! ========= Css done...."));
});

//image minify
gulp.task('imagemin', function() {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
        .pipe(connect.reload());
    //.pipe(notify("  <%= file.relative %>! ========= Images done...."));
});

//html minify
gulp.task('htmlMinify', function() {
    gulp.src('src/*.html')
        .pipe(plumber())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
    //.pipe(notify("  <%= file.relative %>! ========= Html done...."));
});

//html copy
gulp.task('phpcopy', function() {
    gulp.src('src/*.php')
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
    //.pipe(notify("  <%= file.relative %>! ========= php done...."));
});

//fonts move
gulp.task('move_fonts', function() {
    gulp.src('src/fonts/*.*')
        .pipe(gulp.dest('dist/fonts'))
        .pipe(connect.reload());
    //.pipe(notify("  <%= file.relative %>! ========= Fonts done...."));
});
