var gulp = require("gulp");

require("./gulp/scripts");
require("./gulp/watch");

gulp.task("default", ["scripts", "watch"]);