var timeoutifyService = (function () {
    'use strict';

    /**
     * Make a function called "too late" be an error.  This allows you to protect
     * from code that takes in a callback from calling your function much later
     * than expected.
     */
    function timeoutify(fn, waitMs) {
        waitMs = waitMs || 0;

        var timeoutError,
            timeoutId = setTimeout(
                function () {
                    timeoutId = null;
                    timeoutError = new Error('Timeout triggered: Call took longer than ' + waitMs + ' ms!');
                    // This will make it the caller's callback's choice of what to do as soon as the timeout is hit
                    fn(timeoutError);
                },
                waitMs
            );

        return function () {
            if (!timeoutError) {
                clearTimeout(timeoutId);
                fn.apply(this, arguments);
            }
        };
    }

    return {
        timeoutify: timeoutify
    };

}());
