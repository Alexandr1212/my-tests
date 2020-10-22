const { src, dest, watch, parallel, series } = require("gulp");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const minifyCSS = require("gulp-csso");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");

let settings = {
  // your full path to dist
  build: "",
};

function css() {
  return src("src/sass/style.scss")
    .pipe(sass())
    .pipe(autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"]))
    .pipe(minifyCSS())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(dest(settings.build + "css"));
}

function js() {
  return src(['src/js/*.js'])
    .pipe(concat('common.min.js'))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(dest(settings.build + "js"));
}

function png() {
  return src("src/img/**/*.png")
    .pipe(imagemin())
    .pipe(dest(settings.build + "img"));
}

function jpg() {
  return src("src/img/**/*.{jpg,jpeg}")
    .pipe(imagemin())
    .pipe(dest(settings.build + "img"));
}

const img = parallel(png, jpg);

function watchTask() {
  watch(
    [
      "src/sass/**/*.scss",
      "src/js/*.js",
      // "src/img/**/*.png",
      // "src/img/**/*.{jpg,jpeg}",
      "src/img/**/*.{png,jpg,jpeg}",
    ],
    { interval: 1000, usePolling: true },
    parallel(css, js, img)
  );
}

exports.css = css;
exports.js = js;
exports.img = img;
exports.default = series(
  parallel(css, js, img),
  watchTask
);
