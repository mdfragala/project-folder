var gulp = require('gulp'), $ = require('gulp-load-plugins')({patterns:['*']});

var templates = {
   src: ['./src/**/*.html', '!./src/assets/_layouts/**/*.html', '!./src/assets/_includes/**/*.html']
}

gulp.task('template', function(){
      return gulp.src(templates.src) {
      .pipe(wrap())
   }
});
