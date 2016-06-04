var gulp = require('gulp');
var minify = require('gulp-minify');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var jasmine = require('gulp-jasmine');


/**
 * Combine all library files into one js file.
 * 
 * @return void
 */
function cleanDist()
{
	gulp.src('./dist/*', { read: false })
		.pipe(clean());
}

gulp.task('clean-dist', cleanDist);

// ----------------------------------------------------------------------------

/**
 * Deploy the main file to the dist folder.
 * 
 * @return void
 */
function deploy()
{
	gulp.src('./spec/date-range-spec.js')
		.pipe(jasmine());

	gulp.src('./src/date-range.js')
		.pipe(gulp.dest('./dist/'))
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(minify({
			ext: { min: '.min.js' }
		}))
		.pipe(gulp.dest('./dist/'));
}

gulp.task('default', ['clean-dist'], deploy);

// ----------------------------------------------------------------------------

