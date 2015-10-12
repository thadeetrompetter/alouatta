var assign = require('lodash.assign'),
    gulp = require('gulp');

module.exports = function getTasks(tasks) {
    if(!tasks){
        return gulp;
    }
    tasks.forEach(getTask);
    return gulp;
};

function getTask(task) {
    var name = task.name,
        variations = task.variations;

    if(typeof name === 'string'){
        task.fn = require(['.', name].join('/'));
        appendTask(task);
        if(variations && variations.length){
            variations.forEach(function (variation) {
                variation = assign({
                    fn: task.fn
                }, variation);
                appendTask(variation, name);
            });
        }
    }
}
function appendTask(task, groupName) {
    var args = task.args,
        dependencies = task.dependencies,
        signature = [ groupName ? [groupName, task.name].join(':') : task.name ];
    if(args){
        task.fn = task.fn.bind(null, args);
    }
    if(Array.isArray(dependencies) && dependencies.length){
        signature = signature.concat([ dependencies ]);
    }
    gulp.task.apply(gulp, signature.concat(task.fn));
}
