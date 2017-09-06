var gateService = (function () {
    'use strict';

    function hasBeenCalled(called) {
        return called;
    }

    /**
     * Pass in a callback to be called when finished and all subsequent params
     * are callbacks that will be checked if they have been called.
     *
     * An array of wrapped callbacks around the passed in callbacks is returned.
     * Call into those callbacks instead of the original passed in callbacks for
     * this to work.
     */
    function gateOnParams(finishedCallback) {

        var callbacks = [].slice.call(arguments, 1),
            finishCalled = false,
            callbacksCalled = [];

        return callbacks.map(function (cb, index) {

            callbacksCalled[index] = false;

            return function () {

                cb.apply(this, arguments);
                callbacksCalled[index] = true;

                if (!finishCalled && callbacksCalled.every(hasBeenCalled)) {
                    finishedCallback();
                    finishCalled = true;
                }
            };
        });
    }

    /**
     * Pass in a callback to be called when finished and an object with methods
     * to be tracked.  Those methods will be rewritten in the object as wrapped
     * functions to track whether they have been called.
     *
     * For convenience, the object passed in will be returned.
     */
    function gateOnObjMethods(finishedCallback, methods) {

        var keys = Object.keys(methods),
            finishCalled = false,
            methodsCalled = [];

        keys.forEach(function (key) {

            var originalMethod = methods[key],
                trackingIndex;

            if (typeof originalMethod === 'function') {

                methodsCalled.push(false);
                trackingIndex = methodsCalled.length - 1;

                methods[key] = function () {

                    originalMethod.apply(this, arguments);
                    methodsCalled[trackingIndex] = true;

                    if (!finishCalled && methodsCalled.every(hasBeenCalled)) {
                        finishedCallback.call(methods);
                        finishCalled = true;
                    }
                };
            }
        });

        return methods;
    }

    return {
        gateOnParams: gateOnParams,
        gateOnObjMethods: gateOnObjMethods
    };

}());
