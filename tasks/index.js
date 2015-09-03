var gulp = require('gulp');

module.exports = function getTasks(tasks) {
    if(!tasks){
        return gulp;
    }
    tasks.forEach(function (task) {
        var name = task.name,
            dependencies = task.dependencies,
            signature = [ task.name ],
            fn;
        if(typeof name === 'string'){
            fn = require(['.', name].join('/'));
            if(Array.isArray(dependencies) && dependencies.length){
                signature = signature.concat([ dependencies ]);
            }
            gulp.task.apply(gulp, signature.concat(fn));
        }
    });
    return gulp;
};
