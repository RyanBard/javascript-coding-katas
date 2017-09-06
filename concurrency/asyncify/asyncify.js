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

function untrusted1(fn) {
    fn('untrusted1');
}

function untrusted2(fn) {
    setTimeout(
        function () {
            fn('untrusted2');
        },
        100
    );
}

setTimeout(
    function () {
        console.log('Example 1, untrusted code executes immediately');
        console.log('A');
        untrusted1(function () {
            console.log('C, params=', [].slice.apply(arguments));
        });
        console.log('B');
    },
    0
);

setTimeout(
    function () {
        console.log('Example 2, untrusted code executes asynchronously');
        console.log('A');
        untrusted2(function () {
            console.log('C, params=', [].slice.apply(arguments));
        });
        console.log('B');
    },
    1000
);

setTimeout(
    function () {
        console.log('Example 3, untrusted code executes immediately (with asyncify)');
        console.log('A');
        untrusted1(asyncify(function () {
            console.log('C, params=', [].slice.apply(arguments));
        }));
        console.log('B');
    },
    2000
);

setTimeout(
    function () {
        console.log('Example 4, untrusted code executes asynchronously (with asyncify)');
        console.log('A');
        untrusted2(asyncify(function () {
            console.log('C, params=', [].slice.apply(arguments));
        }));
        console.log('B');
    },
    3000
);
