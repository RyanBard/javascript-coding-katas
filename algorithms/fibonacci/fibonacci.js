var fibonacciService = (function () {
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

    function fibonacciRecursive(n) {
        if (!Number.isInteger(n) || n < 0) {
            throw new Error('Must pass in a positive integer argument!');
        }

        if (n <= 1) {
            return 1;
        }

        return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
    }

    function fibonacciMemoized(n, sequence) {
        if (!Number.isInteger(n) || n < 0) {
            throw new Error('Must pass in a positive integer argument!');
        }

        sequence = sequence || [1, 1];

        if (!sequence[n]) {
            sequence[n] = fibonacciMemoized(n - 1, sequence) + fibonacciMemoized(n - 2, sequence);
        }

        return sequence[n];
    }

    function fibonacciIterative(n) {
        if (!Number.isInteger(n) || n < 0) {
            throw new Error('Must pass in a positive integer argument!');
        }

        var i = 1,
            j = 1,
            temp;

        while (n > 1) {
            temp = i;
            i = j;
            j += temp;
            n -= 1;
        }

        return j;
    }

    return {
        fibonacciRecursive: fibonacciRecursive,
        fibonacciMemoized: fibonacciMemoized,
        fibonacciIterative: fibonacciIterative
    };

}());
