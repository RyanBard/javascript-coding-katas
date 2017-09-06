(function () {
    'use strict';

    /**
     * A common validation function for all of the algorithms to use.
     */
    function validateArrayInput(array) {
        if (!Array.isArray(array) || !array.length) {
            throw new Error('You must pass in a non-empty Array!');
        }
    }

    function add(x, y) {
        return x + y;
    }

    function sumArray(array) {
        return array.reduce(add, 0);
    }

    /**
     * This probably shouldn't be exposed, however, I found it easier to get
     * this right by testing this individual piece independant of the
     * map-reduce implementation, so I left the tests in.
     */
    function getAllSubArrays(array) {
        return array.map(function (value, index) {
            var i,
                subArraysForIndex = [];

            for (i = index; i < array.length; i += 1) {
                subArraysForIndex.push(array.slice(index, i + 1));
            }

            return subArraysForIndex;
        });
    }

    function findMaxSubArray(max, subArray) {
        var sum = sumArray(subArray);
        return Math.max(max, sum);
    }

    /**
     * An implementation of the max sub-array sum algorithm that leverages
     * Array's map/reduce functions.  This is a very ineffecient algorithm
     * in both runtime complexity [ O(N^3) ] and memory because it calculates
     * all possible sub-arrays before reducing them to a sum.
     *
     * In theory, this is highly parallelizable, however, this is javascript
     * and we haven't done anything to split this up into smaller pieces for
     * the web workers to run, so the single thread will probably just run this
     * sequentially (I don't think Array's map/reduce functions can optimize
     * any of this very well unless the JS engine is REALLY good and sees that
     * I'm not mutating anything outside of the map/reduce callbacks, I've
     * chosen a very ineffecient algorithm for large data sets, and does some
     * insane magic -- very unlikely).
     */
    function bruteForceLoopMapReduce(array) {
        validateArrayInput(array);

        return getAllSubArrays(array).reduce(
            function (currentMax, subArrays) {
                var potentialMax = subArrays.reduce(findMaxSubArray, currentMax);
                return Math.max(currentMax, potentialMax);
            },
            array[0]
        );
    }

    /**
     * An implementation of the max sub-array sum algorithm that is just a
     * simple loop within a loop within a loop [ O(N^3) ].
     */
    function bruteForceLoop(array) {
        validateArrayInput(array);

        var i,
            j,
            subArraySum,
            maxSum = array[0];

        for (i = 0; i < array.length; i += 1) {
            for (j = i; j < array.length; j += 1) {
                subArraySum = sumArray(array.slice(i, j + 1));
                maxSum = Math.max(maxSum, subArraySum);
            }
        }

        return maxSum;
    }

    /**
     * Kadane's algorithm for finding the max sub-array sum.  This is
     * significantly more efficient than the other implementations [ O(N) ].
     * It recognizes that you don't have to go back and check other
     * permutations if you keep 2 maximums (1 for the current sub-array being
     * walked, the other for your highest max so far).
     */
    function kadaneAlgorithm(array) {
        validateArrayInput(array);

        var globalMaxSum = array[0],
            currentSubArrayMaxSum;

        array.forEach(
            function (value) {
                currentSubArrayMaxSum = Math.max(
                    value,
                    value + (currentSubArrayMaxSum || 0)
                );
                globalMaxSum = Math.max(globalMaxSum, currentSubArrayMaxSum);
            }
        );

        return globalMaxSum;
    }

    /*
     * Methods to expose.
     */
    window.maxSubArraySumService = {
        getAllSubArrays: getAllSubArrays,
        bruteForceLoopMapReduce: bruteForceLoopMapReduce,
        bruteForceLoop: bruteForceLoop,
        kadaneAlgorithm: kadaneAlgorithm
    };

}());
