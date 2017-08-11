import del from 'del';
import gulp from 'gulp';
import open from 'open';
import gulpLoadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import minimist from 'minimist';
import packageJson from './package.json';
// import devConfig from './webpack.config.babel.js';
import devConfig from './webpack.config.dev.babel.js';

const knownOptions = {
    string: 'platform',
    default: { platform: 'web' },
};

const options = minimist(process.argv.slice(3), knownOptions);

const PORT = process.env.PORT || 80;
const $ = gulpLoadPlugins({ camelize: true });

const DEST_DIR = process.env.DEST_DIR || 'build';
$.util.log(options);

// Main tasks
gulp.task('serve', () => runSequence('serve:clean', 'serve:start'));
gulp.task('dist', () => runSequence('dist:clean', `dist:${DEST_DIR}`));
gulp.task('startrelease', () => runSequence('serve:clean', `dist:${DEST_DIR}`, 'serve:startRelease'));

gulp.task('clean', ['dist:clean', 'serve:clean']);
gulp.task('open', () => open('http://localhost:3000'));

// Remove all built files
gulp.task('serve:clean', cb => del(DEST_DIR, { dot: true, force: true }, cb));
gulp.task('dist:clean', cb => del([DEST_DIR], { dot: true, force: true }, cb));

// Copy static files across to our final directory
gulp.task('serve:static', () =>
    gulp.src([
        'app/static/**',
    ])
        .pipe($.changed(DEST_DIR))
        .pipe(gulp.dest(DEST_DIR))
        .pipe($.size({ title: 'static' })),
);

gulp.task('dist:static', () =>
    gulp.src([
        'app/static/**',
    ])
        .pipe(gulp.dest(DEST_DIR))
        .pipe($.size({ title: 'static' })),
);

// Start a livereloading development server
gulp.task('serve:start',
    ['serve:static'],
    () => new WebpackDevServer(webpack(devConfig),
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
            },
            compress: true,
            contentBase: './build',
            disableHostCheck: true,
        },
    )
        .listen(PORT, '0.0.0.0', (err) => {
            if (err) throw new $.util.PluginError('webpack-dev-server', err);
            $.util.log(`[${packageJson.name} serve]`, `Listening at 0.0.0.0:${PORT}`);
        })
);

