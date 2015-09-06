// Welcome to the alouatta.org project gulp file !
// the config.js file contains path names and other constants
var config = require('./config'),
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
            name: 'build-css'
        }
    ]);
    // ./node_modules/lib is symlinked to ./lib, so you can avoid using long
    // require paths
    // test = require('lib/test');

gulp.task('default', ['build-html']);
gulp.task('js', ['build-js:watch']);
