(function (service) {
    'use strict';

    function copyAndSort(array) {
        return array.slice().sort(function (val1, val2) {
            return val1 - val2;
        });
    }

    describe('Quick Sort', function () {

        describe('quicksort', function () {

            it('should throw an error for a non-array', function () {
                var input = {};

                expect(function () {
                    service.quicksort(input);
                }).toThrow(new Error('You must pass in an Array!'));
            });

            it('should return an empty array when passed an empty array', function () {
                var input = [],
                    expected = [],
                    actual;

                actual = service.quicksort(input);

                expect(actual).toEqual(expected);
                expect(actual).not.toBe(input);
            });

            it('should return a single element array when passed a single element array', function () {
                var input = [0],
                    expected = [0],
                    actual;

                actual = service.quicksort(input);

                expect(actual).toEqual(expected);
                expect(actual).not.toBe(input);
            });

            it('should return an array of the same elements when passed an already sorted array', function () {
                var input = [1, 2, 3],
                    expected = [1, 2, 3],
                    actual;

                actual = service.quicksort(input);

                expect(actual).toEqual(expected);
                expect(actual).not.toBe(input);
            });

            it('should return a sorted array when passed an array with an even number of elements', function () {
                var input = [1, 6, 3, 4, 2, 5],
                    expected = copyAndSort(input),
                    actual;

                actual = service.quicksort(input);

                expect(actual).toEqual(expected);
            });

            it('should return a sorted array when passed an array with an odd number of elements', function () {
                var input = [4, 2, 3, 1, 5],
                    expected = copyAndSort(input),
                    actual;

                actual = service.quicksort(input);

                expect(actual).toEqual(expected);
            });

            it('should return a sorted array when passed an array of only negative numbers', function () {
                var input = [-1, -2, -3, -4, -5, -6],
                    expected = copyAndSort(input),
                    actual;

                actual = service.quicksort(input);

                expect(actual).toEqual(expected);
            });

            it('should return a sorted array when passed an array of a mix of negative and positive numbers', function () {
                var input = [-1, 2, -3, -4, 5, -6, 0],
                    expected = copyAndSort(input),
                    actual;

                actual = service.quicksort(input);

                expect(actual).toEqual(expected);
            });

            it('should return a sorted array when passed an array with duplicate numbers', function () {
                var input = [1, 2, 4, 2, 9, 6, 2],
                    expected = copyAndSort(input),
                    actual;

                actual = service.quicksort(input);

                expect(actual).toEqual(expected);
            });

        });

        describe('quicksortUsingFilter', function () {

            it('should throw an error for a non-array', function () {
                var input = {};

                expect(function () {
                    service.quicksortUsingFilter(input);
                }).toThrow(new Error('You must pass in an Array!'));
            });

            it('should return an empty array when passed an empty array', function () {
                var input = [],
                    expected = [],
                    actual;

                actual = service.quicksortUsingFilter(input);

                expect(actual).toEqual(expected);
                expect(actual).not.toBe(input);
            });

            it('should return a single element array when passed a single element array', function () {
                var input = [0],
                    expected = [0],
                    actual;

                actual = service.quicksortUsingFilter(input);

                expect(actual).toEqual(expected);
                expect(actual).not.toBe(input);
            });

            it('should return an array of the same elements when passed an already sorted array', function () {
                var input = [1, 2, 3],
                    expected = [1, 2, 3],
                    actual;

                actual = service.quicksortUsingFilter(input);

                expect(actual).toEqual(expected);
                expect(actual).not.toBe(input);
            });

            it('should return a sorted array when passed an array with an even number of elements', function () {
                var input = [1, 6, 3, 4, 2, 5],
                    expected = copyAndSort(input),
                    actual;

                actual = service.quicksortUsingFilter(input);

                expect(actual).toEqual(expected);
            });

            it('should return a sorted array when passed an array with an odd number of elements', function () {
                var input = [4, 2, 3, 1, 5],
                    expected = copyAndSort(input),
                    actual;

                actual = service.quicksortUsingFilter(input);

                expect(actual).toEqual(expected);
            });

            it('should return a sorted array when passed an array of only negative numbers', function () {
                var input = [-1, -2, -3, -4, -5, -6],
                    expected = copyAndSort(input),
                    actual;

                actual = service.quicksortUsingFilter(input);

                expect(actual).toEqual(expected);
            });

            it('should return a sorted array when passed an array of a mix of negative and positive numbers', function () {
                var input = [-1, 2, -3, -4, 5, -6, 0],
                    expected = copyAndSort(input),
                    actual;

                actual = service.quicksortUsingFilter(input);

                expect(actual).toEqual(expected);
            });

            it('should return a sorted array when passed an array with duplicate numbers', function () {
                var input = [1, 2, 4, 2, 9, 6, 2],
                    expected = copyAndSort(input),
                    actual;

                actual = service.quicksortUsingFilter(input);

                expect(actual).toEqual(expected);
            });

        });

    });

}(window.quicksortService));
