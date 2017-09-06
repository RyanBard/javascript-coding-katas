(function (onifyService) {
    'use strict';

    describe('onifyService', function () {

        describe('onify', function () {

            it('should only be called once', function () {
                var result;

                function untrusted(cb, times) {
                    var i;

                    for (i = 0; i < times; i += 1) {
                        cb(10);
                    }
                }

                function cb(toAdd) {
                    result += toAdd;
                }

                /* Verify the untrusted code calls multiple times. */
                result = 0;
                untrusted(cb, 3);
                expect(result).toBe(30);

                /* Verify onify solves the problem of our callback being called multiple times. */
                result = 0;
                untrusted(onifyService.onify(cb), 3);
                expect(result).toBe(10);

                /* Verify a new call to onify for the same callback calls once. */
                result = 200;
                untrusted(onifyService.onify(cb), 3);
                expect(result).toBe(210);
            });

        });

    });

}(window.onifyService));
