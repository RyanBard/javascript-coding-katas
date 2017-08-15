var bubblesortService = (function () {
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

    /**
     * An implementation of bubble sort (the easiest sort to implement, but
     * usually the worst to choose).  Bubble sort has a terrible runtime
     * complexity [ O(N^2) ], but is very small on memory footprint.
     */
    function bubblesort(array) {
        validateInput(array);

        var toRet = array.slice(),
            swapped = true,
            i;

        while (swapped) {

            swapped = false;

            for (i = 1; i < toRet.length; i += 1) {
                if (toRet[i - 1] > toRet[i]) {
                    swap(toRet, i - 1, i);
                    swapped = true;
                }
            }

        }

        return toRet;
    }

    /*
     * Methods to expose.
     */
    return {
        bubblesort: bubblesort
    };

}());
