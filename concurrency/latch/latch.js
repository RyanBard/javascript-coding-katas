var latchService = (function () {
    'use strict';

    function hasBeenCalled(called) {
        return called;
    }

    /**
     * Pass in a callback to be called when any called and all subsequent params
     * are callbacks that will be checked if they have been called.
     *
     * An array of wrapped callbacks around the passed in callbacks is returned.
     * Call into those callbacks instead of the original passed in callbacks for
     * this to work.
     */
    function latchOnParams(finishedCallback) {

        var callbacks = [].slice.call(arguments, 1),
            finishCalled = false;

        return callbacks.map(function (cb, index) {

            return function () {

                cb.apply(this, arguments);

                if (!finishCalled) {
                    finishedCallback();
                    finishCalled = true;
                }
            };
        });
    }

    /**
     * Pass in a callback to be called when any called and an object with methods
     * to be tracked.  Those methods will be rewritten in the object as wrapped
     * functions to track whether they have been called.
     *
     * For convenience, the object passed in will be returned.
     */
    function latchOnObjMethods(finishedCallback, methods) {

        var keys = Object.keys(methods),
            finishCalled = false;

        keys.forEach(function (key) {

            var originalMethod = methods[key];

            if (typeof originalMethod === 'function') {

                methods[key] = function () {

                    originalMethod.apply(this, arguments);

                    if (!finishCalled) {
                        finishedCallback.apply(methods);
                        finishCalled = true;
                    }
                };

            }
        });

        return methods;
    }

    return {
        latchOnParams: latchOnParams,
        latchOnObjMethods: latchOnObjMethods
    };

}());
