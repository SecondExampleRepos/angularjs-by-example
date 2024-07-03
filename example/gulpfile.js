import gulp from 'gulp';
import ts from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';

// Create a TypeScript project
const tsProject = ts.createProject('tsconfig.json');

// Clean the output directory
function clean() {
    return del(['dist']);
}

// Compile TypeScript files
function scripts() {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
}

// Watch for changes in TypeScript files
function watchFiles() {
    gulp.watch('src/**/*.ts', scripts);
}

// Define complex tasks
const build = gulp.series(clean, scripts);
const watch = gulp.series(build, watchFiles);

// Export tasks to the Gulp CLI
exports.clean = clean;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
