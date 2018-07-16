module.exports = function() {
    $.gulp.task('img:dev', () => {
        return $.gulp.src('./dev/static/img/**/*.{png,jpg,gif,svg}')
            .pipe($.gulp.dest('./build/static/img/'));
    });

    $.gulp.task('img:build', () => {
        return $.gulp.src('./dev/static/img/**/*.{png,jpg,gif,svg}')
            .pipe($.gp.tinypng(YOUR_API_KEY))
            .pipe($.gulp.dest('./build/static/img/'));
    });
};
