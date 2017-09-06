var onifyService = (function () {
    'use strict';

    /**
     * Force the passed in function to only be able to be called onces. This
     * protects against the situation where code that takes in a callback might
     * mistakenly call your function multiple times.
     */
    function onify(fn) {
        var fnCalled = false;

        return function () {
            if (!fnCalled) {
                fnCalled = true;
                return fn.apply(this, arguments);
            }
        };
    }

    return {
        onify: onify
    };

}());
