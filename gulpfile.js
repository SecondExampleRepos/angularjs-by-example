import * as gulp from 'gulp';
import concat from 'gulp-concat';
import connect from 'gulp-connect';
import uglify from 'gulp-uglify';
import ngAnnotate from 'gulp-ng-annotate';
import usemin from 'gulp-usemin';
import rev from 'gulp-rev';
import revOutdated from 'gulp-rev-outdated';
import minifyCss from 'gulp-minify-css';
import ngHtml2Js from "gulp-ng-html2js";
import inject from "gulp-inject";
import clean from 'gulp-clean';
import replace from 'gulp-replace';
import gulpAngularExtender from 'gulp-angular-extender';
//Convert all HTML tpl files to Angular template module
gulp.task('create-templates', function() {
    return gulp.src('./**/*.tpl.html')
        .pipe(ngHtml2Js({
            moduleName: "app.templates",
            rename: function(url: string): string {
                return url.replace('src/', '');
            }
        }))
        .pipe(concat("app.templates.js"))
        .pipe(gulp.dest("src/"));
});
//Inject the templates file into ./src/index.html to be picked up by usemin
gulp.task('inject-templates', ['create-templates'], function() {
    return gulp.src('./src/index.html')
        .pipe(inject(gulp.src('./src/app.templates.js', {read: false}), {ignorePath: 'src', addRootSlash: false}))
        .pipe(gulp.dest('src/'));
});
//Minify, concatenate and version CSS and JS
//Use ngAnnotate to take care of Angular inject issues
gulp.task('usemin', ['inject-templates'], function() {
    return gulp.src('./src/index.html')
        .pipe(usemin({
            css: [minifyCss(), 'concat', rev()],
            js: [ngAnnotate(), uglify(), rev()],
            assets: [rev()]
        }))
        .pipe(gulp.dest('build/'));
});
//Add Angular module dependency for templates
gulp.task('add-dependencies', ['usemin'], function () {
    gulp.src('build/app.min-*.js')
        .pipe(gulpAngularExtender({
            "app": [
                "app.templates"
            ]
        }))
        .pipe(gulp.dest('build/'));
});
//Copy the asset files from src to build
gulp.task('copy-asset-files', function() {
    gulp.src(['./src/assets/fonts/*']).pipe(gulp.dest('build/assets/fonts/'));
    gulp.src(['./src/assets/images/*']).pipe(gulp.dest('build/assets/images/'));
});
//Delete the temporary templates module file and remove the include from ./src/index.html
gulp.task('clean', ['usemin'], function () {
    gulp.src('./src/app.templates.js', {read: false})
        .pipe(clean());
    gulp.src('./src/index.html')
        .pipe(replace(/(<!--\s*inject:js\s*-->\s*)(\n*)(.*)(\n*)(\s*)(<!--\s*endinject\s*-->)/g, '$1$6'))
        .pipe(gulp.dest('src/'));
    gulp.src(['build/*.*'], {read: false})
        .pipe(revOutdated(1)) // leave 1 latest asset file for every file name prefix.
        .pipe(clean());
});
//Start a web server on port 8282 to server the src app
gulp.task('connect-dev', function() {
    connect.server({
        root: 'src/',
        port: 8282
    });
});
//Start a web server on port 8283 to server the build app (You probably wouldn't use this server for production delivery)
gulp.task('connect-prod', function() {
    connect.server({
        root: 'build/',
        port: 8283
    });
});
gulp.task('watch', ['usemin'], function () {
    gulp.watch('src/**/*.js', ['usemin'])
});
//Build task which should be used to build the application to production (By a continuous integration server for example)
gulp.task('build', ['create-templates', 'inject-templates', 'usemin', 'add-dependencies', 'copy-asset-files', 'clean', 'connect-prod']);
//Default task which simply servers the source files
gulp.task('default', ['connect-dev']);