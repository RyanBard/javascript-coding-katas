(function (service) {
    'use strict';

    describe('Factorial', function () {

        describe('recursive', function () {

            it('should handle undefined! gracefully', function () {
                expect(function () {
                    service.factorialRecursive(undefined);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle null! gracefully', function () {
                expect(function () {
                    service.factorialRecursive(null);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle false! gracefully', function () {
                expect(function () {
                    service.factorialRecursive(false);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle true! gracefully', function () {
                expect(function () {
                    service.factorialRecursive(true);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle {}! gracefully', function () {
                expect(function () {
                    service.factorialRecursive({});
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle []! gracefully', function () {
                expect(function () {
                    service.factorialRecursive([]);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle NaN! gracefully', function () {
                expect(function () {
                    service.factorialRecursive(NaN);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle Infinity! gracefully', function () {
                expect(function () {
                    service.factorialRecursive(Infinity);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle -1! gracefully', function () {
                expect(function () {
                    service.factorialRecursive(-1);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should return 1 for 0!', function () {
                var input = 0,
                    expected = 1,
                    actual = service.factorialRecursive(input);

                expect(actual).toBe(expected);
            });

            it('should return 1 for 1!', function () {
                var input = 1,
                    expected = 1,
                    actual = service.factorialRecursive(input);

                expect(actual).toBe(expected);
            });

            it('should return 2 for 2!', function () {
                var input = 2,
                    expected = 2,
                    actual = service.factorialRecursive(input);

                expect(actual).toBe(expected);
            });

            it('should return 6 for 3!', function () {
                var input = 3,
                    expected = 6,
                    actual = service.factorialRecursive(input);

                expect(actual).toBe(expected);
            });

            it('should return 24 for 4!', function () {
                var input = 4,
                    expected = 24,
                    actual = service.factorialRecursive(input);

                expect(actual).toBe(expected);
            });

            it('should return 120 for 5!', function () {
                var input = 5,
                    expected = 120,
                    actual = service.factorialRecursive(input);

                expect(actual).toBe(expected);
            });

        });

        describe('iterative', function () {

            it('should handle undefined! gracefully', function () {
                expect(function () {
                    service.factorialIterative(undefined);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle null! gracefully', function () {
                expect(function () {
                    service.factorialIterative(null);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle false! gracefully', function () {
                expect(function () {
                    service.factorialIterative(false);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle true! gracefully', function () {
                expect(function () {
                    service.factorialIterative(true);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle {}! gracefully', function () {
                expect(function () {
                    service.factorialIterative({});
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle []! gracefully', function () {
                expect(function () {
                    service.factorialIterative([]);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle NaN! gracefully', function () {
                expect(function () {
                    service.factorialIterative(NaN);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle Infinity! gracefully', function () {
                expect(function () {
                    service.factorialIterative(Infinity);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should handle -1! gracefully', function () {
                expect(function () {
                    service.factorialIterative(-1);
                }).toThrow(new Error('Must pass in a positive integer argument!'));
            });

            it('should return 1 for 0!', function () {
                var input = 0,
                    expected = 1,
                    actual = service.factorialIterative(input);

                expect(actual).toBe(expected);
            });

            it('should return 1 for 1!', function () {
                var input = 1,
                    expected = 1,
                    actual = service.factorialIterative(input);

                expect(actual).toBe(expected);
            });

            it('should return 2 for 2!', function () {
                var input = 2,
                    expected = 2,
                    actual = service.factorialIterative(input);

                expect(actual).toBe(expected);
            });

            it('should return 6 for 3!', function () {
                var input = 3,
                    expected = 6,
                    actual = service.factorialIterative(input);

                expect(actual).toBe(expected);
            });

            it('should return 24 for 4!', function () {
                var input = 4,
                    expected = 24,
                    actual = service.factorialIterative(input);

                expect(actual).toBe(expected);
            });

            it('should return 120 for 5!', function () {
                var input = 5,
                    expected = 120,
                    actual = service.factorialIterative(input);

                expect(actual).toBe(expected);
            });

        });

    });

}(window.factorialService));
