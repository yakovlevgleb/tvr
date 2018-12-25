'use strict';

const dirs = {
	source: 'static',
	build: 'public'
};

const images = [dirs.source + '/img/**/*.{gif,png,jpg,jpeg,svg,ico}'];
const icons = [dirs.source + '/i/**/*.{gif,png,jpg,jpeg,svg,ico}'];

const jsList = [
	dirs.source + '/js/ext/jquery.min.js'
];

const folder = process.env.folder;

const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const stylus = require('gulp-stylus');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const objectFitImages = require('postcss-object-fit-images');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const jade = require('gulp-jade');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const cleanCSS = require('gulp-cleancss');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const uglify = require('gulp-uglify');
const wait = require('gulp-wait');

// gulp.task('clean', function() {
// 	return del(dirs.build);
// })

gulp.task('stylus', function() {
	return gulp.src(dirs.source + '/styl/styles.styl').
	pipe(plumber({
		errorHandler: function(err) {
			notify.onError({
				title: 'Styles compilation error',
				message: err.messagegulp
			})(err);
			this.emit('end');
		}
	})).pipe(wait(100)).pipe(sourcemaps.init()).
	pipe(stylus({
		'include css': true
	})).
	pipe(postcss([
		autoprefixer({
			browsers: ['last 2 version']
		}),
		mqpacker
	])).
	pipe(gulp.dest(dirs.build + '/static/css/')).
	pipe(browserSync.stream({
		match: '**/*.css'
	})).
	pipe(gulp.dest(dirs.build + '/static/css/'));
});

gulp.task("jade-concat", function() {
	gulp.src(dirs.source + '/jade/*.jade').pipe(plumber({
		errorHandler: notify.onError(function(error) {
			return {
				title: "Jade compilation error",
				message: error.message
			}
		})
	})).pipe(jade({
		pretty: true,
		compileDebug: true
	})).pipe(gulp.dest(dirs.build + '/')).pipe(browserSync.reload({
		stream: true
	}));
});

gulp.task('img', function() {
	return gulp.src(dirs.source + "/img/**/*.*").pipe(imagemin([
		imagemin.gifsicle({
			interlaced: true
		}),
		imagemin.jpegtran({
			progressive: true
		}),
		imagemin.optipng({
			optimizationLevel: 5
		}),
		imagemin.svgo({
			plugins: [{
				removeViewBox: true
			}, {
				cleanupIDs: false
			}]
		})
	])).pipe(gulp.dest(dirs.build + "/img/")).pipe(browserSync.stream());
});

gulp.task('icons', function() {
	return gulp.src(dirs.source + "/i/**/*.*").pipe(imagemin([
		imagemin.gifsicle({
			interlaced: true
		}),
		imagemin.jpegtran({
			progressive: true
		}),
		imagemin.optipng({
			optimizationLevel: 5
		}),
		imagemin.svgo({
			plugins: [{
				removeViewBox: true
			}, {
				cleanupIDs: false
			}]
		})
	])).pipe(gulp.dest(dirs.build + "/static/i/")).pipe(browserSync.stream());
});

gulp.task('img:opt', function(callback) {
	if (folder) {
		return gulp.src(folder + '/*.{jpg,jpeg,gif,png,svg}').pipe(imagemin({
			progressive: true,
			svgoPlugins: [{
				removeViewBox: false
			}],
			use: [pngquant()]
		})).pipe(gulp.dest(folder));
	} else {
		console.log('Не указана папка с картинками. Пример вызова команды: folder=src/blocks/test-block/img npm start img:opt');
		callback();
	}
});

gulp.task('fonts', function() {
	return gulp.src([dirs.source + '/fonts/**/*.{ttf,woff,woff2,eot,svg}']).pipe(gulp.dest(dirs.build + '/static/css/fonts/'));
});


gulp.task('js-ext', function() {
	if (jsList.length) {
		return gulp.src(jsList).pipe(plumber({
			errorHandler: notify.onError(function(error) {
				return {
					title: "JS compilation error",
					message: error.message
				}
			})
		})).
		pipe(concat('vendor.min.js')).
		pipe(uglify()).
		pipe(gulp.dest(dirs.build + '/static/js'));
	} else {
		console.log('Javascript не обрабатывается');
		callback();
	}
});

gulp.task('js', function() {
	return gulp.src(dirs.source + "/js/script.js")
		.pipe(plumber({
			errorHandler: notify.onError(function(error) {
				return {
					title: "JS compilation error",
					message: error.message
				}
			})
		}))
		// .pipe(sourcemaps.init())
		// .pipe(sourcemaps.write())
		// .pipe(uglify())
		// .pipe(rename('script.min.js'))
		.pipe(gulp.dest(dirs.build + "/static/js/"))
		.pipe(browserSync.stream());
});


gulp.task('build', function(callback) {
	gulpSequence('stylus', 'fonts', 'js', 'js-ext', 'jade-concat', 'img', 'icons', callback);
});

gulp.task('serve', ['build'], function() {

	browserSync.init({
		server: {
			baseDir: dirs.build,
			directory: true
		},
		port: 8080
	});

	if (images.length) {
		gulp.watch(images, ['img']);
	}
	if (icons.length) {
		gulp.watch(icons, ['icons']);
	}
	gulp.watch(dirs.source + "/styl/**/*.styl", ['stylus']);
	gulp.watch(dirs.source + "/jade/**/*.jade", ['jade-concat']);
	gulp.watch(dirs.source + '/fonts/*.{ttf,woff,woff2,eot,svg}', ['fonts']);
	gulp.watch(dirs.source + "/js/**/*.js", ['js']);

});

gulp.task('default', ['serve']);
