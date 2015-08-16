var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var cssmin = require("gulp-cssmin");
var notify = require("gulp-notify");

gulp.task("scss", function () {
    gulp.src(["./scss/style.scss"])
        .pipe(sass({
            onError: function (err) {
                return notify().write(err);
            }
        }))
        .pipe(autoprefixer("last 2 version", "ie 9"))
        .pipe(cssmin())
        .pipe(gulp.dest("./css/"));
});

gulp.task("watch", ["scss"], function () {
    gulp.watch("./scss/**/*.scss", ["scss"]);
});