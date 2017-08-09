import 'babel-polyfill';
import gulp from 'gulp';
import runSequence from 'run-sequence';
import config from './config';

// Load tasks
import './tasks/clean';
import './tasks/serviceWorker';
import './tasks/browsersync';
import './tasks/html';
import './tasks/img';
import './tasks/css';
import './tasks/docs';
import './tasks/fonts';
import './tasks/js';
import './tasks/upload';
import './tasks/githooks';
import './tasks/zip';

/**
 * @TODO: Automate var change depending on the task (gulp dev/dist)
 * Ex: gulp dev => pass config.baseUri as '/'
 * Ex: gulp dist => pass config.baseUri as '/ScrumPoker/'
 */
gulp.task('dev', cb => {
    config.html.baseUri = '/';

    return runSequence(
        'clean',
        'serviceWorker',
        ['docs', 'html', 'img', 'css', 'fonts'],
        ['service-worker-watch', 'js', 'browsersync', 'docs-watch', 'html-watch', 'img-watch', 'css-watch', 'fonts-watch'],
        cb
    );
});

gulp.task('dist', cb => runSequence(
    'clean',
    ['docs', 'html', 'img', 'css', 'fonts', 'js'],
    'zip',
    cb
));

gulp.task('lint', [
    'js-lint',
    'css-lint'
]);

gulp.task('test', [
    'js-test'
]);

gulp.task('upload', cb => runSequence(
    'dist',
    'file-upload',
    cb
));
