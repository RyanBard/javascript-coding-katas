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

var f1 = onify(
        function () {
            console.log('f1 called, args=', [].slice.apply(arguments));
            return 'f1';
        }
    ),
    f2 = onify(
        function () {
            console.log('f2 called, args=', [].slice.apply(arguments));
            return 'f2';
        }
    );

console.log('f1(1, 2, 3) ->', f1(1, 2, 3));
console.log('f1(4, 5, 6) ->', f1(4, 5, 6));
console.log('f2(\'a\', \'b\', \'c\') ->', f2('a', 'b', 'c'));
console.log('f2(\'A\', \'B\', \'C\') ->', f2('A', 'B', 'C'));
