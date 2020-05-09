var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    path = require ('path'),    
    compass = require('gulp-compass');

var coffeeScripts = ['components/coffee/tagline.coffee'];
var jsSources = [
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js',
];

gulp.task('coffee', function(done){
  gulp.src(coffeeScripts)
	.pipe(coffee({bare: true})
	.on('error', gutil.log))
	.pipe(gulp.dest('components/scripts'))
    done();
	});

gulp.task('js', gulp.series('coffee', function(done) {
    gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(gulp.dest('builds/development/js'))
    done();
})); 

gulp.task('compass', function() {
  gulp.src('components/sass/style.scss')
    .pipe(compass({     
      sass: 'components/sass',
      image: 'builds/development/images',
      style: 'expanded'
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest('builds/development/css'))
});

gulp.task('watch', function(done) {
    gulp.series('components/coffee/*', 'coffee');
    done();
});


gulp.task('default', function(done) { 
    gulp.series('coffee','js','compass') 
    done();
});