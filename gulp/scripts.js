var gulp = require("gulp");
var browserify = require("browserify");
var del = require("del");
var source = require("vinyl-source-stream");
var glob = require("glob");
var async = require("async");
var path = require("path");
var util = require("gulp-util");

gulp.task("clean-scripts", function(cb) {
	del("./www/js", {
		"force": true
	}, cb);
})

gulp.task("process-scripts", ["clean-scripts"], function(cb) {

	var globString = "./scripts/*.js";

	glob(globString, {}, function(er, files) {
		async.each(files, function(file, nextFile) {

			var name = path.basename(file);

			var b = browserify({
				"debug": true
			});
			b.add(file);

			b.bundle()
				.on("error", function(err) {
					util.log(util.colors.red("Error"), err.message);
					this.end();
				})
				.pipe(source(name))
				.pipe(gulp.dest("./www/js"))
				.on("end", nextFile);
		}, cb);
	});
});

gulp.task("scripts", ["process-scripts"])