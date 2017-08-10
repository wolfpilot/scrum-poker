import { clean as config } from '../config';
import del from 'del';
import gulp from 'gulp';

/**
 * Task: Clean dist/ folder
 */

console.log(`!${config.dist.base}/.git`);
gulp.task('clean', () => {
    del.sync(
        [
            `config.dist.base/**/*`,
            `!${config.dist.base}/.git`
        ]
    );
});
