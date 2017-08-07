# 地球环保日h5
***

![Gulp icon](http://www.th7.cn/d/file/p/2016/06/22/640f7e3d4f9c3e15118911d87c1ce5c9.jpg)

## Gulp

**Gulp**, 这次使用的是*gulp*来作压缩的工作，非常轻量级和方便.

### 安装办法 
首先要确保pc上装有**node**，然后在global环境和项目文件中都install gulp

```
npm install gulp -g   (global环境)
npm install gulp --save-dev (项目环境)
```

### 引入module
在项目的根目录新建**gulpfile.js**，require需要的module
此次我使用的是**sass**作为样式.

```
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
```

### 压缩
* 压缩**sass**

```
gulp.task('sass', function () {
    gulp.src('./sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});
```
* 合并和压缩js文件

```
gulp.task('scripts', function () {
	gulp.src(['./js/lib/jquery.min.js','./js/lib/jquery.cookie.js','./js/lib/jweixin-1.0.0.js','./js/lib/*.min.js', './js/modules/*.js'])
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});
```

* 启动监听sass,js文件的变化，随时update

```
gulp.task('default', function () {
    gulp.run('lint', 'sass', 'scripts');

    gulp.watch(['sass/*.scss', 'js/modules/*.js'], function () {
        gulp.run('lint', 'sass', 'scripts');
    });
});
```

### 最后一步，只要cmd中执行，*gulp*即可
***

## Sass

![sass icon](https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4264172896,4152564018&fm=26&gp=0.jpg)

非常强大，可以带入函数计算，还是很不错的.
推送给大家，有兴趣的了解[**sass**](https://www.sass.hk),有中文网还是很方便的.
***
## Hammer.js

一个移动的js插件，有点鸡肋
有兴趣的可以点击了解一下[**hammer**](https://hammerjs.github.io/)

***
## And more?

Follow [@yuanzhou3118](https://github.com/yuanzhou3118) on Github for the latest news.





