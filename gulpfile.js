/**
 * Created by admin on 17/4/11.
 */
// 引入 gulp
var gulp = require('gulp');

// 引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// 检查脚本
gulp.task('lint', function () {
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 编译Sass
gulp.task('sass', function () {
    gulp.src('./sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});

// 合并，压缩文件
gulp.task('scripts', function () {
    gulp.src(['./js/lib/jquery.min.js','./js/lib/jquery.cookie.js','./js/lib/jweixin-1.0.0.js','./js/lib/*.min.js', './js/modules/*.js'])
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

// 默认任务
gulp.task('default', function () {
    gulp.run('lint', 'sass', 'scripts');

    // 监听文件变化
    gulp.watch(['sass/*.scss', 'js/modules/*.js'], function () {
        gulp.run('lint', 'sass', 'scripts');
    });
});