var gulp = require('gulp'),
    del = require('del'),
    jsdoc = require('gulp-jsdoc'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch'),
    concat = require('gulp-concat'),
    header = require('gulp-header'),
    wrapper = require('gulp-wrapper');


//--------------------------------------------------------------------------
// Configuration
//--------------------------------------------------------------------------

var pkg = require('./package.json'),
    banner = [
        '/**',
        ' * V09 in <%= new Date().toString() %>',
        ' *',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @version <%= pkg.version %>',
        ' * @link <%= pkg.homepage %>',
        ' * @license <%= pkg.license %>',
        ' *',
        ' */',
        ''
    ].join('\n');


//--------------------------------------------------------------------------
// Tasks
//--------------------------------------------------------------------------

gulp.task('doc', function () {
    return del([
        './doc/',
    ], gulp.src("./src/**/*.js")
        .pipe(jsdoc.parser())
        .pipe(jsdoc.generator('./doc')));
});

gulp.task('concat', function () {
    return gulp.src(['./src/namespace.js', './src/extension/*.js', './src/library.js'])
        .pipe(concat(pkg.name + '.js'))
        .pipe(wrapper({
            header: '(function (window) { \n',
            footer: [
                '\n',
                'if (typeof module === \'object\' && typeof module.exports === \'object\') {',
                '   module.exports = ' + pkg.name + '; //npm, we want to export egg instead of assigning to global Window',
                '} else {',
                '   window.' + pkg.name + ' = ' + pkg.name + ';',
                '}',
                ' ',
                '}(typeof window !== \'undefined\' ? window : this));',
            ].join('\n')
        }))
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function () {
    watch('./src/**/*.js', batch(function (events, done) {
        gulp.start('concat', done);
        gulp.start('doc', done);
    }));
});

gulp.task('default', function () {
    // place code for your default task here
});