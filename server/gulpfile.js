var gulp = require('gulp');
var babel = require('gulp-babel');
var watch = require('gulp-watch');

gulp.task('default', build);

gulp.task('dev', function () {
    return watch('src/**/*.js', build);
});

function build () {
    console.log('Source changed, rebuilding...');

    return gulp.src('src/**/*.js')
        .pipe(babel({ presets: ['es2015'] }))
        .on('error', function (e) {
            console.error('syntax error', JSON.stringify(e, null, 2));
        })
        .pipe(gulp.dest('build'))
        .on('end', function () {
            console.info('Finish building');
        });
}
