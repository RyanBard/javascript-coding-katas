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
        var args;

        if (!timeoutError) {
            clearTimeout(timeoutId);
            args = [].slice.apply(arguments);
            // Since all is well, the first arg is a null for the "err" param
            args.unshift(null);
            fn.apply(this, args);
        }
    };
}

process.on(
    'uncaughtException',
    function (err) {
        console.log('Uncaught Exception thrown: ', err);
    }
);

var f1 = timeoutify(
        function (err) {
            if (err) {
                console.log('f1: err=', err);
                throw err;
            }
            console.log('f1: args=', [].slice.call(arguments, 1));
            return 'f1';
        },
        2000
    ),
    f2 = timeoutify(
        function (err) {
            if (err) {
                console.log('f2: err=', err);
                throw err;
            }
            console.log('f2: args=', [].slice.call(arguments, 1));
            return 'f2';
        },
        2000
    ),
    f3 = timeoutify(
        function (err) {
            if (err) {
                console.log('f3: err=', err);
                /*
                 * A potential confusion with this is that it's happening in a
                 * setTimeout instead of when the function is called.  This
                 * makes the try-catch below pointless.
                 */
                throw err;
            }
            console.log('f3: args=', [].slice.call(arguments, 1));
            return 'f3';
        },
        2000
    );

/*
 * Currently, these functions have a mix of callback and return value ideas.
 * Ideally, you wouldn't mix the 2, however, I wanted to play around with ways
 * of handling the 2 ways of doing things.
 */

try {
    console.log('pre-f1 call');
    console.log('f1(1, 2, 3) ->', f1(1, 2, 3));
    console.log('post-f1 call');
} catch (e) {
    console.log('f1(1, 2, 3) -> Error:', e);
}

setTimeout(
    function () {
        try {
            console.log('pre-f2 call');
            console.log('f2(4, 5, 6) ->', f2(4, 5, 6));
            console.log('post-f2 call');
        } catch (e) {
            console.log('f2(4, 5, 6) -> Error:', e);
        }
    },
    1000
);

setTimeout(
    function () {
        try {
            console.log('pre-f3 call');
            console.log("f3('a', 'b', 'c') ->", f3('a', 'b', 'c'));
            console.log('post-f3 call');
        } catch (e) {
            console.log("f3('a', 'b', 'c') -> Error:", e);
        }
    },
    3000
);

setTimeout(
    function () {
        console.log('all done?');
    },
    4000
);
