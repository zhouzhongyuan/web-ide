import del from 'del';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import packageJson from './package.json';
import devConfig from './webpack.config.dev.babel';

const PORT = process.env.PORT || 80;
const $ = gulpLoadPlugins({ camelize: true });

const DEST_DIR = process.env.DEST_DIR || 'build';

// Main tasks
gulp.task('serve', () => runSequence('serve:clean', 'serve:start'));

gulp.task('serve:clean', cb => del(DEST_DIR, { dot: true, force: true }, cb));

// Copy static files across to our final directory

gulp.task('serve:static', () =>
    gulp.src([
        'app/static/**',
    ])
        .pipe($.changed(DEST_DIR))
        .pipe(gulp.dest(DEST_DIR))
        .pipe($.size({ title: 'static' })),
);

// Start a livereloading development server
gulp.task('serve:start',
    ['serve:static'],
    () => new WebpackDevServer(webpack(devConfig),
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
            }, // 防止可能的跨域
            compress: true, // gzip压缩
            contentBase: './build', // html文件所在的位置
            disableHostCheck: true,
            historyApiFallback: true, // 所欲route都到index.html
        },
    )
        .listen(PORT, '0.0.0.0', (err) => {
            if (err) throw new $.util.PluginError('webpack-dev-server', err);
            $.util.log(`[${packageJson.name} serve]`, `Listening at 0.0.0.0:${PORT}`);
        }),
);
