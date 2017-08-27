var factorialService = (function () {
    'use strict';

    /*
     * Polyfill from MDN:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite
     */
    Number.isFinite = Number.isFinite || function(value) {
        return typeof value === 'number' && isFinite(value);
    }

    /*
     * Polyfill from MDN:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
     */
    Number.isInteger = Number.isInteger || function(value) {
        return typeof value === 'number' && 
            isFinite(value) && 
            Math.floor(value) === value;
    };

    function factorialRecursive(n) {
        if (!Number.isInteger(n) || n < 0) {
            throw new Error('Must pass in a positive integer argument!');
        }

        if (n === 0) {
            return 1;
        }

        return n * factorialRecursive(n - 1);
    }

    function factorialIterative(n) {
        if (!Number.isInteger(n) || n < 0) {
            throw new Error('Must pass in a positive integer argument!');
        }

        var product = 1;

        while (n > 0) {
            product *= n;
            n -= 1;
        }

        return product;
    }

    return {
        factorialRecursive: factorialRecursive,
        factorialIterative: factorialIterative
    };

}());
