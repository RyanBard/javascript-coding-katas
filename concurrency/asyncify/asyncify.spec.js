(function (asyncifyService) {
    'use strict';

    describe('asyncifyService', function () {

        describe('asyncify', function () {

            it('should run the callback in the next eventloop if 3rd party calls immediately', function (done) {
                var expectedNonAsyncify = 'ACB',
                    expectedAsyncify = 'ABC',
                    result,
                    params;

                function untrusted(fn) {
                    fn('param1', 'param2', 'param3');
                }

                function callback() {
                    params = [].slice.apply(arguments);
                    result += 'C';
                }

                params = null;
                result = 'A';
                untrusted(callback);
                result += 'B';

                expect(result).toBe(expectedNonAsyncify);
                expect(params).toEqual(['param1', 'param2', 'param3']);

                params = null;
                result = 'A';
                untrusted(asyncifyService.asyncify(callback));
                result += 'B';

                setTimeout(function () {
                    expect(result).toBe(expectedAsyncify);
                    expect(params).toEqual(['param1', 'param2', 'param3']);

                    done();
                }, 100);
            });

            it('should run the callback in the next eventloop if 3rd party calls asynchronously', function (done) {
                var expectedNonAsyncify = 'ABC',
                    expectedAsyncify = 'ABC',
                    result,
                    params;

                function untrusted(fn) {
                    setTimeout(function () {
                        fn('param1', 'param2', 'param3');
                    }, 10);
                }

                function callback() {
                    params = [].slice.apply(arguments);
                    result += 'C';
                }

                params = null;
                result = 'A';
                untrusted(callback);
                result += 'B';

                setTimeout(function () {
                    expect(result).toBe(expectedNonAsyncify);
                    expect(params).toEqual(['param1', 'param2', 'param3']);
                }, 100);

                setTimeout(function () {
                    params = null;
                    result = 'A';
                    untrusted(asyncifyService.asyncify(callback));
                    result += 'B';
                }, 200);

                setTimeout(function () {
                    expect(result).toBe(expectedAsyncify);
                    expect(params).toEqual(['param1', 'param2', 'param3']);

                    done();
                }, 300);
            });

        });

    });

}(window.asyncifyService));
