import gulp from 'gulp';
import ts from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';

// Create a TypeScript project
const tsProject = ts.createProject('tsconfig.json');

// Task to compile TypeScript files
gulp.task('scripts', () => {
  return tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

// Task to watch for changes in TypeScript files
gulp.task('watch', () => {
  gulp.watch('src/**/*.ts', gulp.series('scripts'));
});

// Default task
gulp.task('default', gulp.series('scripts', 'watch'));
