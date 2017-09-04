const gulp = require('gulp');
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const scripts = {
  css: [
    './src/css/variables.css',
    './node_modules/normalize.css/normalize.css',
    './src/css/base.css',
    './src/css/type.css',
    './src/css/badges.css',
    './src/css/bars.css',
    './src/css/buttons.css',
    './src/css/forms.css',
    './src/css/lists.css',
    './src/css/toggle.css',
    './src/css/icons.css',
    './src/css/utilities.css',
  ]
};

// css
gulp.task('css', () =>
  gulp.src(scripts.css)
    .pipe(sourcemaps.init())
    .pipe(concat('genesis.css'))
    .pipe(postcss([
      cssnext()
    ]))
    .pipe(gulp.dest('./dist/css'))
    .pipe(postcss([cssnano({autoprefixer: false})]))
    .pipe(rename({extname: '.min.css'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
);

// 启动服务
gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });

  gulp.watch('src/css/**/*.css', ['css']);
  gulp.watch('dist/*.html').on('change', reload);
});

gulp.task('default', ['css']);
