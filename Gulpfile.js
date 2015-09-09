// Welcome to the alouatta.org project gulp file !
// the config.js file contains path names and other constants
var browserSync = require('browser-sync').create('aloutta'),
    config = require('./config'),
    buildJs = require('./tasks/build-js');
    // gulp tasks and live in the ./tasks directory and are loaded by passing an
    // array of objects with a name and optional array of dependencies.
    gulp = require(config.taskDir)([
        {
            name: 'build-html',
            variations: [
                {
                    name:'watch',
                    args: {
                        server: browserSync
                    }
                }
            ]
        },{
            name: 'build-js',
            variations: [
                {
                    name: 'watch',
                    args: {
                        watch: true,
                        server: browserSync
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
                    name: 'watch',
                    args: {
                        server: browserSync
                    }
                },
                {
                    name:'production',
                    args: {
                        production: true
                    }
                }
            ]
        },{
            name: 'test-css'
        },{
            name:'test-js',
            variations:[
                {
                    name:'style',
                    args:{
                        action: 'style'
                    }
                },{
                    name:'hint',
                    args:{
                        action: 'hint'
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
gulp.task('watch', ['serve'], function () {
    gulp.watch(config.paths.htmlFiles, ['build-html:watch']);
    gulp.watch(config.paths.lessFiles, ['build-css:watch']);
    buildJs({watch: true, server: browserSync});
});
gulp.task('serve', ['default'], function (done) {
    browserSync.init({
        server:config.dist
    }, done);
});
