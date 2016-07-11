var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
// Checks for errors all plugins
var plumber = require('gulp-plumber');
//Enables Gulp to notify us through the Notifications Center
var notify = require('gulp-notify');
var browserSync = require('browser-sync');



/* gulp.task('task-name', function () {
return gulp.src('source-files') // Get source files with gulp.src
.pipe(aGulpPlugin()) // Sends it through a gulp plugin
.pipe(gulp.dest('destination')) // Outputs the file in the
destination folder
}) */
function customPlumber(errTitle) {
return plumber({
errorHandler: notify.onError({
// Customizing error title
title: errTitle || "Error running Gulp",
message: "Error: <%= error.message %>",
})
});
}
gulp.task('browserSync', function() {
browserSync({
server: {
baseDir: './',
browser: 'chrome.exe',
},
})
});
gulp.task('sass', function(){
return gulp.src('./scss/**/*.scss')//voir return §§§§§§§§§§§§§§§§
.pipe(sourcemaps.init())
.pipe(customPlumber('Error Running Sass'))// Listens for errors in sass()
.pipe(sass()) // Compiles Sass to CSS with gulp-sass 
.pipe(gulp.dest('./css'))
.pipe(browserSync.reload({stream: true})) // Tells Browser Sync to reload files task is done
});

gulp.task('html', function(){
	gulp.src('./**/*.html')
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('default', ['browserSync','sass', 'html'],function(){

gulp.watch('./scss/**/*.scss', ['sass']);

 gulp.watch("./**/*.html", ['html']).on("change", browserSync.reload);

});

