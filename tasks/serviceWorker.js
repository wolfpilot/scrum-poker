import { reload } from 'browser-sync';
import { serviceWorker as config } from '../config';
import gulp from 'gulp';
import watch from 'gulp-watch';

/**
 * Task: Copy service worker
 */
gulp.task('serviceWorker', () => {
    return gulp.src(config.src.serviceWorker)
        .pipe(gulp.dest(config.dist.serviceWorker))
        .pipe(reload({ stream: true }));
});

/**
 * Task: Service worker watch
 */
gulp.task('service-worker-watch', cb => {
    watch(config.src.serviceWorker, () => gulp.start(['serviceWorker'], cb));
});
