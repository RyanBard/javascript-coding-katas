var quicksortService = (function () {
    'use strict';

    function validateInput(array) {
        if (!Array.isArray(array)) {
            throw new Error('You must pass in a non-empty Array!');
        }
    }

    function swap(array, i, j) {
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    function partition(array, low, high) {
        var pivot = array[high],
            i = low - 1,
            j;

        for (j = low; j < high; j += 1) {
            if (array[j] < pivot) {
                i += 1;
                swap(array, i, j);
            }
        }

        if (array[high] < array[i + 1]) {
            swap(array, i + 1, high);
        }

        return i + 1;
    }

    function quicksortHelper(array, low, high) {
        var partitionIndex;

        if (low < high) {
            partitionIndex = partition(array, low, high);
            quicksortHelper(array, low, partitionIndex - 1);
            quicksortHelper(array, partitionIndex + 1, high);
        }
    }

    /**
     * An implementation of Quick Sort using recursion for simplicity.
     * left++
     * right++
     * swap if high-low is wrong
     * when meet in the middle, recurse w/ 2 halves
     */
    function quicksort(array) {
        validateInput(array);

        var toRet = array.slice();

        quicksortHelper(toRet, 0, array.length - 1);

        return toRet;
    }

    /*
     * Methods to expose.
     */
    return {
        quicksort: quicksort
    };

}());
