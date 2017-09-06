var asyncifyService = (function () {
    'use strict';

    /**
     * Force the passed in function to run on a later event loop.  This protects
     * from the situation where you aren't sure if code that takes in a callback
     * is going to run your function immediately in the same event loop or
     * asynchronously in a later event loop.
     */
    function asyncify(fn) {
        var originalFn = fn,
            setTimeoutFired = false;

        fn = null;

        setTimeout(
            function () {
                console.log('setTimeout triggered');
                setTimeoutFired = true;
                if (fn) {
                    console.log('The untrusted code called the function immediately (in the same event loop)');
                    fn(); // The "this" and "arguments" were set with "bind".
                }
            },
            0
        );

        return function () {
            var params = [].slice.apply(arguments);

            if (setTimeoutFired) {
                console.log('The untrusted code called the function in a later event loop (asynchronously)');
                originalFn.apply(this, params);
            } else {
                console.log('Function executed too soon, so binding the correct "this" and "arguments" and set them in fn for setTimeout to call');
                fn = originalFn.bind.apply(originalFn, [this].concat(params));
            }
        };
    }

    return {
        asyncify: asyncify
    };

}());
