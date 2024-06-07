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
type GulpTaskFunction = (done?: gulp.TaskFunctionCallback) => NodeJS.ReadWriteStream | void;
interface ConnectServerOptions {
    root: string;
    port: number;
}
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
1         .pipe(gulp.dest('build/'));
3 });
5 // Add Angular module dependency for templates
7 gulp.task('add-dependencies', ['usemin'], function(): void {
9     gulp.src('build/app.min-*.js')
1         .pipe(gulpAngularExtender({
3             "app": [
5                 "app.templates"
7             ]
9         }))
1         .pipe(gulp.dest('build/'));
3 });
5 // Copy the asset files from src to build
7 gulp.task('copy-asset-files', function(): void {
9     gulp.src(['./src/assets/fonts/*']).pipe(gulp.dest('build/assets/fonts/'));
1     gulp.src(['./src/assets/images/*']).pipe(gulp.dest('build/assets/images/'));
3 });
5 // Delete the temporary templates module file and remove the include from ./src/index.html
7 gulp.task('clean', ['usemin'], function(): void {
9     gulp.src('./src/app.templates.js', {read: false})
1         .pipe(clean());
3     gulp.src('./src/index.html')
5         .pipe(replace(/(<!--\s*inject:js\s*-->\s*)(\n*)(.*)(\n*)(\s*)(<!--\s*endinject\s*-->)/g, '$1$6'))
7         .pipe(gulp.dest('src/'));
9     gulp.src(['build/*.*'], {read: false})
1         .pipe(revOutdated(1)) // leave 1 latest asset file for every file name prefix.
3         .pipe(clean());
5 });
7 // Start a web server on port 8282 to serve the src app
9 gulp.task('connect-dev', function(): void {
1     connect.server({
3         root: 'src/',
5         port: 8282
7     } as ConnectServerOptions);
9 });
1 // Start a web server on port 8283 to serve the build app (You probably wouldn't use this server for production delivery)
3 gulp.task('connect-prod', function(): void {
5     connect.server({
7         root: 'build/',
9         port: 8283
1     } as ConnectServerOptions);
3 });
5 gulp.task('watch', ['usemin'], function(): void {
7     gulp.watch('src/**/*.js', ['usemin']);
9 });
1 // Build task which should be used to build the application to production (By a continuous integration server for example)
3 gulp.task('build', ['create-templates', 'inject-templates', 'usemin', 'add-dependencies', 'copy-asset-files', 'clean', 'connect-prod']);
5 // Default task which simply serves the source files
7 gulp.task('default', ['connect-dev']);