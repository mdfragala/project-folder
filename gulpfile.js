var gulp = require('gulp'), $ = require('gulp-load-plugins')({pattern:['*']});

var templates = {
   src: ['./src/**/*.html', '!./src/assets/_layouts/**/*.html', '!./src/assets/_includes/**/*.html']
}

gulp.task('template', function(){
   $.nunjucksRender.nunjucks.configure(['./_src/_layouts'],{watch:false});
   return gulp.src('./_src/index.html')
      .pipe($.data(function(file){
         var content = $.frontMatter(String(file.contents));
         file.contents = new Buffer(content.body);
         return {'meta': content.attributes};
      }))
      .pipe($.insert.transform(function(contents, file){
         var extend, block, end, layout;
         layout = file.data.meta.layout || 'default';
         extend = '{% extends "default.html" %}';
         block = '{% block content %}';
         end = '{% endblock %}';
         return extend + block + contents + end;
      }))
      .pipe($.nunjucksRender())
      .pipe(gulp.dest('./_dist/'));
});
