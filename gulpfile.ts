import * as gulp from 'gulp';
import * as concat from 'gulp-concat';
import * as connect from 'gulp-connect';
import * as uglify from 'gulp-uglify';
import * as ngAnnotate from 'gulp-ng-annotate';
import * as usemin from 'gulp-usemin';
import * as rev from 'gulp-rev';
import * as revOutdated from 'gulp-rev-outdated';
import * as minifyCss from 'gulp-minify-css';
import * as ngHtml2Js from 'gulp-ng-html2js';
import * as inject from 'gulp-inject';
import * as clean from 'gulp-clean';
import * as replace from 'gulp-replace';
import * as gulpAngularExtender from 'gulp-angular-extender';
// Define types and enums
type GulpTask = (done: gulp.TaskFunctionCallback) => void;
// Convert all HTML tpl files to Angular template module
gulp.task('create-templates', function(): NodeJS.ReadWriteStream {
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
// Inject the templates file into ./src/index.html to be picked up by usemin
gulp.task('inject-templates', ['create-templates'], function(): NodeJS.ReadWriteStream {
    return gulp.src('./src/index.html')
        .pipe(inject(gulp.src('./src/app.templates.js', {read: false}), {ignorePath: 'src', addRootSlash: false}))
        .pipe(gulp.dest('src/'));
});
// Minify, concatenate and version CSS and JS
// Use ngAnnotate to take care of Angular inject issues
gulp.task('usemin', ['inject-templates'], function(): NodeJS.ReadWriteStream {
    return gulp.src('./src/index.html')
        .pipe(usemin({
            css: [minifyCss(), 'concat', rev()],
            js: [ngAnnotate(), uglify(), rev()],
            assets: [rev()]
        }))
        .pipe(gulp.dest('build/'));
});
// Add Angular module dependency for templates
gulp.task('add-dependencies', ['usemin'], function (): void {
    gulp.src('build/app.min-*.js')
        .pipe(gulpAngularExtender({
            "app": [
                "app.templates"
            ]
        }))
        .pipe(gulp.dest('build/'));
});
// Copy the asset files from src to build
gulp.task('copy-asset-files', function(): void {
    gulp.src(['./src/assets/fonts/*']).pipe(gulp.dest('build/assets/fonts/'));
    gulp.src(['./src/assets/images/*']).pipe(gulp.dest('build/assets/images/'));
});
// Delete the temporary templates module file and remove the include from ./src/index.html
gulp.task('clean', ['usemin'], function (): void {
    gulp.src('./src/app.templates.js', {read: false})
        .pipe(clean());
    gulp.src('./src/index.html')
        .pipe(replace(/(<!--\s*inject:js\s*-->\s*)(\n*)(.*)(\n*)(\s*)(<!--\s*endinject\s*-->)/g, '$1$6'))
        .pipe(gulp.dest('src/'));
    gulp.src(['build/*.*'], {read: false})
        .pipe(revOutdated(1)) // leave 1 latest asset file for every file name prefix.
        .pipe(clean());
});
// Start a web server on port 8282 to serve the src app
gulp.task('connect-dev', function(): void {
    connect.server({
        root: 'src/',
        port: 8282
    });
});
// Start a web server on port 8283 to serve the build app (You probably wouldn't use this server for production delivery)
gulp.task('connect-prod', function(): void {
    connect.server({
        root: 'build/',
        port: 8283
    });
});
gulp.task('watch', ['usemin'], function (): void {
    gulp.watch('src/**/*.js', ['usemin'])
});
// Build task which should be used to build the application to production (By a continuous integration server for example)
gulp.task('build', ['create-templates', 'inject-templates', 'usemin', 'add-dependencies', 'copy-asset-files', 'clean', 'connect-prod']);
// Default task which simply serves the source files
gulp.task('default', ['connect-dev']);