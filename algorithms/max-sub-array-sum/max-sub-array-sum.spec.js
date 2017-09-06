(function (service) {
    'use strict';

    describe('Max sub-array sum', function () {

        describe('bruteForceLoop', function () {

            it('should throw an error for a non-array', function () {
                var input = {};

                expect(function () {
                    service.bruteForceLoop(input);
                }).toThrow(new Error('You must pass in a non-empty Array!'));
            });

            it('should throw an error for an empty array', function () {
                var input = [];

                expect(function () {
                    service.bruteForceLoop(input);
                }).toThrow(new Error('You must pass in a non-empty Array!'));
            });

            it('should return the sum of the array for an all positive array', function () {
                var input = [1, 2, 3],
                    expected = 6,
                    result = service.bruteForceLoop(input);

                expect(result).toEqual(expected);
            });

            it('should return the max of the array for an all negative array', function () {
                var input = [-2, -1, -3],
                    expected = -1,
                    result = service.bruteForceLoop(input);

                expect(result).toEqual(expected);
            });

            it('should return 8 for [8]', function () {
                var input = [8],
                    expected = 8,
                    result = service.bruteForceLoop(input);

                expect(result).toEqual(expected);
            });

            it('should return -8 for [-8]', function () {
                var input = [-8],
                    expected = -8,
                    result = service.bruteForceLoop(input);

                expect(result).toEqual(expected);
            });

            it('should return 6 for [-1, 1, 2, 3]', function () {
                var input = [-1, 1, 2, 3],
                    expected = 6,
                    result = service.bruteForceLoop(input);

                expect(result).toEqual(expected);
            });

            it('should return 4 for [-1, 3, -2, 2, 1]', function () {
                var input = [-1, 3, -2, 2, 1],
                    expected = 4,
                    result = service.bruteForceLoop(input);

                expect(result).toEqual(expected);
            });

            it('should return 6 for [1, 2, -16, 3, 2, 1, -8]', function () {
                var input = [1, 2, -16, 3, 2, 1, -8],
                    expected = 6,
                    result = service.bruteForceLoop(input);

                expect(result).toEqual(expected);
            });

        });

        describe('bruteForceLoopMapReduce', function () {

            it('should throw an error for a non-array', function () {
                var input = {};

                expect(function () {
                    service.bruteForceLoopMapReduce(input);
                }).toThrow(new Error('You must pass in a non-empty Array!'));
            });

            it('should throw an error for an empty array', function () {
                var input = [];

                expect(function () {
                    service.bruteForceLoopMapReduce(input);
                }).toThrow(new Error('You must pass in a non-empty Array!'));
            });

            it('should return the sum of the array for an all positive array', function () {
                var input = [1, 2, 3],
                    expected = 6,
                    result = service.bruteForceLoopMapReduce(input);

                expect(result).toEqual(expected);
            });

            it('should return the max of the array for an all negative array', function () {
                var input = [-2, -1, -3],
                    expected = -1,
                    result = service.bruteForceLoopMapReduce(input);

                expect(result).toEqual(expected);
            });

            it('should return 8 for [8]', function () {
                var input = [8],
                    expected = 8,
                    result = service.bruteForceLoopMapReduce(input);

                expect(result).toEqual(expected);
            });

            it('should return -8 for [-8]', function () {
                var input = [-8],
                    expected = -8,
                    result = service.bruteForceLoopMapReduce(input);

                expect(result).toEqual(expected);
            });

            it('should return 6 for [-1, 1, 2, 3]', function () {
                var input = [-1, 1, 2, 3],
                    expected = 6,
                    result = service.bruteForceLoopMapReduce(input);

                expect(result).toEqual(expected);
            });

            it('should return 4 for [-1, 3, -2, 2, 1]', function () {
                var input = [-1, 3, -2, 2, 1],
                    expected = 4,
                    result = service.bruteForceLoopMapReduce(input);

                expect(result).toEqual(expected);
            });

            it('should return 6 for [1, 2, -16, 3, 2, 1, -8]', function () {
                var input = [1, 2, -16, 3, 2, 1, -8],
                    expected = 6,
                    result = service.bruteForceLoopMapReduce(input);

                expect(result).toEqual(expected);
            });

        });

        describe('kadaneAlgorithm', function () {

            it('should throw an error for a non-array', function () {
                var input = {};

                expect(function () {
                    service.kadaneAlgorithm(input);
                }).toThrow(new Error('You must pass in a non-empty Array!'));
            });

            it('should throw an error for an empty array', function () {
                var input = [];

                expect(function () {
                    service.kadaneAlgorithm(input);
                }).toThrow(new Error('You must pass in a non-empty Array!'));
            });

            it('should return the sum of the array for an all positive array', function () {
                var input = [1, 2, 3],
                    expected = 6,
                    result = service.kadaneAlgorithm(input);

                expect(result).toEqual(expected);
            });

            it('should return the max of the array for an all negative array', function () {
                var input = [-2, -1, -3],
                    expected = -1,
                    result = service.kadaneAlgorithm(input);

                expect(result).toEqual(expected);
            });

            it('should return 8 for [8]', function () {
                var input = [8],
                    expected = 8,
                    result = service.kadaneAlgorithm(input);

                expect(result).toEqual(expected);
            });

            it('should return -8 for [-8]', function () {
                var input = [-8],
                    expected = -8,
                    result = service.kadaneAlgorithm(input);

                expect(result).toEqual(expected);
            });

            it('should return 6 for [-1, 1, 2, 3]', function () {
                var input = [-1, 1, 2, 3],
                    expected = 6,
                    result = service.kadaneAlgorithm(input);

                expect(result).toEqual(expected);
            });

            it('should return 4 for [-1, 3, -2, 2, 1]', function () {
                var input = [-1, 3, -2, 2, 1],
                    expected = 4,
                    result = service.kadaneAlgorithm(input);

                expect(result).toEqual(expected);
            });

            it('should return 6 for [1, 2, -16, 3, 2, 1, -8]', function () {
                var input = [1, 2, -16, 3, 2, 1, -8],
                    expected = 6,
                    result = service.kadaneAlgorithm(input);

                expect(result).toEqual(expected);
            });

        });

        describe('getAllSubArrays', function () {

            it('should return a new empty array for an empty array', function () {
                var input = [],
                    expected = [],
                    result = service.getAllSubArrays(input);

                expect(result).toEqual(expected);
                expect(result).not.toBe(input);
            });

            it('should return an array of 1 sub-array total for an array with 1 element', function () {
                var input = [0],
                    expected = [
                        [
                            [0]
                        ]
                    ],
                    result = service.getAllSubArrays(input);

                expect(result).toEqual(expected);
            });

            it('should return an array of 6 sub-arrays total for an array with 3 elements', function () {
                var input = [1, 2, 3],
                    expected = [
                        [
                            [1],
                            [1, 2],
                            [1, 2, 3]
                        ],
                        [
                            [2],
                            [2, 3]
                        ],
                        [
                            [3]
                        ]
                    ],
                    result = service.getAllSubArrays(input);

                expect(result).toEqual(expected);
            });

            it('should return an array of 15 sub-arrays total for an array with 5 elements', function () {
                var input = [-1, 3, -2, 2, 1],
                    expected = [
                        [
                            [-1],
                            [-1, 3],
                            [-1, 3, -2],
                            [-1, 3, -2, 2],
                            [-1, 3, -2, 2, 1]
                        ],
                        [
                            [3],
                            [3, -2],
                            [3, -2, 2],
                            [3, -2, 2, 1]
                        ],
                        [
                            [-2],
                            [-2, 2],
                            [-2, 2, 1]
                        ],
                        [
                            [2],
                            [2, 1]
                        ],
                        [
                            [1]
                        ]
                    ],
                    result = service.getAllSubArrays(input);

                expect(result).toEqual(expected);
            });

        });

    });

}(window.maxSubArraySumService));
