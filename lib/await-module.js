'use strict';
/**
 * waits for the property of an object to become available. useful if you want
 * to initialize a module with a dependency. Executes successCallback when the
 * property becomes available in time (defaults to 500 ms). Calls
 * timeoutCallback if given.
 */
function awaitModule(obj, properties, successCallback, timeoutCallback, limit) {
    if(!Array.isArray(properties)){
        properties = [ properties ];
    }
    var initialAttemptTime = new Date().getTime(),
    timeLimit = limit || 500;

    function check() {
        var available = properties.every(function (property) {
            return typeof obj[property] !== 'undefined';
        });
        if (available) {
            return successCallback();
        }
        if (new Date().getTime() - initialAttemptTime >= timeLimit) {
            if (timeoutCallback) {
                return timeoutCallback();
            }
            return;
        }
        window.setTimeout(check, 10);
    }
    check();
}
module.exports = awaitModule;
