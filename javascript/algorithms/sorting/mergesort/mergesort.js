var mergesortService = (function () {
    'use strict';

    function validateInput(array) {
        if (!Array.isArray(array)) {
            throw new Error('You must pass in a non-empty Array!');
        }
    }

    function merge(array1, array2) {
        var array = [],
            i = 0,
            j = 0;

        while (i < array1.length || j < array2.length) {

            if (i === array1.length) {
                array.push(array2[j]);
                j += 1;
            } else if (j === array2.length) {
                array.push(array1[i]);
                i += 1;
            } else if (array1[i] < array2[j]) {
                array.push(array1[i]);
                i += 1;
            } else {
                array.push(array2[j]);
                j += 1;
            }

        }

        return array;
    }

    /**
     * This leverages recursion for simplicity.
     */
    function mergesort(array) {
        var arr1,
            arr2;

        validateInput(array);

        if (array.length <= 1) {
            return array.slice();
        }

        arr1 = array.slice(0, array.length / 2);
        arr2 = array.slice(array.length / 2);

        return merge(
            mergesort(arr1),
            mergesort(arr2)
        );
    }

    return {
        mergesort: mergesort
    };

}());
