// Welcome to the alouatta.org project gulp file !
// the config.js file contains path names and other constants
var config = require('./config'),
    buildJs = require('./tasks/build-js');
    // gulp tasks and live in the ./tasks directory and are loaded by passing an
    // array of objects with a name and optional array of dependencies.
    gulp = require(config.taskDir)([
        {
            name: 'build-html'
        },{
            name: 'build-js',
            variations: [
                {
                    name: 'watch',
                    args: {
                        watch: true
                    }
                },{
                    name:'production',
                    args: {
                        production: true
                    }
                }
            ]
        },{
            name: 'build-css',
            variations: [
                {
                    name:'production',
                    args: {
                        production: true
                    }
                }
            ]
        }
    ]);
    // ./node_modules/lib is symlinked to ./lib, so you can avoid using long
    // require paths
    // test = require('lib/test');

gulp.task('default', ['build-html', 'build-css', 'build-js']);
gulp.task('js', ['build-js:watch']);
gulp.task('watch', ['default'], function () {
    gulp.watch(config.paths.htmlFiles, ['build-html']);
    gulp.watch(config.paths.lessFiles, ['build-css']);
    buildJs({watch: true});
});
