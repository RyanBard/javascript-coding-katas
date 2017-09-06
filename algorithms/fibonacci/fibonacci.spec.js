(function (service) {
    'use strict';

    describe('Fibonacci', function () {

        describe('recursive', function () {

            it('should handle fib(undefined) gracefully', function () {
                expect(function () {
                    service.fibonacciRecursive(undefined);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle fib(null) gracefully', function () {
                expect(function () {
                    service.fibonacciRecursive(null);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle fib(false) gracefully', function () {
                expect(function () {
                    service.fibonacciRecursive(false);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle fib(true) gracefully', function () {
                expect(function () {
                    service.fibonacciRecursive(true);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle fib({}) gracefully', function () {
                expect(function () {
                    service.fibonacciRecursive({});
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle fib([]) gracefully', function () {
                expect(function () {
                    service.fibonacciRecursive([]);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle fib(NaN) gracefully', function () {
                expect(function () {
                    service.fibonacciRecursive(NaN);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle fib(Infinity) gracefully', function () {
                expect(function () {
                    service.fibonacciRecursive(Infinity);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle fib(-1) gracefully', function () {
                expect(function () {
                    service.fibonacciRecursive(-1);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should return 1 for fib(0)', function () {
                var input = 0,
                    expected = 1,
                    actual = service.fibonacciRecursive(input);

                expect(actual).toBe(expected);
            });

            it('should return 1 for fib(1)', function () {
                var input = 1,
                    expected = 1,
                    actual = service.fibonacciRecursive(input);

                expect(actual).toBe(expected);
            });

            it('should return 2 for fib(2)', function () {
                var input = 2,
                    expected = 2,
                    actual = service.fibonacciRecursive(input);

                expect(actual).toBe(expected);
            });

            it('should return 3 for fib(3)', function () {
                var input = 3,
                    expected = 3,
                    actual = service.fibonacciRecursive(input);

                expect(actual).toBe(expected);
            });

            it('should return 5 for fib(4)', function () {
                var input = 4,
                    expected = 5,
                    actual = service.fibonacciRecursive(input);

                expect(actual).toBe(expected);
            });

            it('should return 8 for fib(5)', function () {
                var input = 5,
                    expected = 8,
                    actual = service.fibonacciRecursive(input);

                expect(actual).toBe(expected);
            });

            it('should return 144 for fib(11)', function () {
                var input = 11,
                    expected = 144,
                    actual = service.fibonacciRecursive(input);

                expect(actual).toBe(expected);
            });

        });

        describe('memoized', function () {

            it('should handle fib(undefined) gracefully', function () {
                expect(function () {
                    service.fibonacciMemoized(undefined);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle fib(null) gracefully', function () {
                expect(function () {
                    service.fibonacciMemoized(null);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle fib(false) gracefully', function () {
                expect(function () {
                    service.fibonacciMemoized(false);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle fib(true) gracefully', function () {
                expect(function () {
                    service.fibonacciMemoized(true);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle fib({}) gracefully', function () {
                expect(function () {
                    service.fibonacciMemoized({});
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle fib([]) gracefully', function () {
                expect(function () {
                    service.fibonacciMemoized([]);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle fib(NaN) gracefully', function () {
                expect(function () {
                    service.fibonacciMemoized(NaN);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle fib(Infinity) gracefully', function () {
                expect(function () {
                    service.fibonacciMemoized(Infinity);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle fib(-1) gracefully', function () {
                expect(function () {
                    service.fibonacciMemoized(-1);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should return 1 for fib(0)', function () {
                var input = 0,
                    expected = 1,
                    actual = service.fibonacciMemoized(input);

                expect(actual).toBe(expected);
            });

            it('should return 1 for fib(1)', function () {
                var input = 1,
                    expected = 1,
                    actual = service.fibonacciMemoized(input);

                expect(actual).toBe(expected);
            });

            it('should return 2 for fib(2)', function () {
                var input = 2,
                    expected = 2,
                    actual = service.fibonacciMemoized(input);

                expect(actual).toBe(expected);
            });

            it('should return 3 for fib(3)', function () {
                var input = 3,
                    expected = 3,
                    actual = service.fibonacciMemoized(input);

                expect(actual).toBe(expected);
            });

            it('should return 5 for fib(4)', function () {
                var input = 4,
                    expected = 5,
                    actual = service.fibonacciMemoized(input);

                expect(actual).toBe(expected);
            });

            it('should return 8 for fib(5)', function () {
                var input = 5,
                    expected = 8,
                    actual = service.fibonacciMemoized(input);

                expect(actual).toBe(expected);
            });

            it('should return 144 for fib(11)', function () {
                var input = 11,
                    expected = 144,
                    actual = service.fibonacciMemoized(input);

                expect(actual).toBe(expected);
            });

        });

        describe('iterative', function () {

            it('should handle fib(undefined) gracefully', function () {
                expect(function () {
                    service.fibonacciIterative(undefined);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle fib(null) gracefully', function () {
                expect(function () {
                    service.fibonacciIterative(null);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle fib(false) gracefully', function () {
                expect(function () {
                    service.fibonacciIterative(false);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle fib(true) gracefully', function () {
                expect(function () {
                    service.fibonacciIterative(true);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle fib({}) gracefully', function () {
                expect(function () {
                    service.fibonacciIterative({});
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle fib([]) gracefully', function () {
                expect(function () {
                    service.fibonacciIterative([]);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle fib(NaN) gracefully', function () {
                expect(function () {
                    service.fibonacciIterative(NaN);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle fib(Infinity) gracefully', function () {
                expect(function () {
                    service.fibonacciIterative(Infinity);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle fib(-1) gracefully', function () {
                expect(function () {
                    service.fibonacciIterative(-1);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should return 1 for fib(0)', function () {
                var input = 0,
                    expected = 1,
                    actual = service.fibonacciIterative(input);

                expect(actual).toBe(expected);
            });

            it('should return 1 for fib(1)', function () {
                var input = 1,
                    expected = 1,
                    actual = service.fibonacciIterative(input);

                expect(actual).toBe(expected);
            });

            it('should return 2 for fib(2)', function () {
                var input = 2,
                    expected = 2,
                    actual = service.fibonacciIterative(input);

                expect(actual).toBe(expected);
            });

            it('should return 3 for fib(3)', function () {
                var input = 3,
                    expected = 3,
                    actual = service.fibonacciIterative(input);

                expect(actual).toBe(expected);
            });

            it('should return 5 for fib(4)', function () {
                var input = 4,
                    expected = 5,
                    actual = service.fibonacciIterative(input);

                expect(actual).toBe(expected);
            });

            it('should return 8 for fib(5)', function () {
                var input = 5,
                    expected = 8,
                    actual = service.fibonacciIterative(input);

                expect(actual).toBe(expected);
            });

            it('should return 144 for fib(11)', function () {
                var input = 11,
                    expected = 144,
                    actual = service.fibonacciIterative(input);

                expect(actual).toBe(expected);
            });

        });

    });

}(window.fibonacciService));
