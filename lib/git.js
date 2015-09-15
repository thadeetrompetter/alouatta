var cp = require('child_process').exec;

module.exports = function () {
    return new Promise(function (resolve, reject) {
        cp('git rev-parse --short HEAD', function (err, output) {
            if(err){
                return reject(err);
            }
            return resolve(output);
        });
    })
};
