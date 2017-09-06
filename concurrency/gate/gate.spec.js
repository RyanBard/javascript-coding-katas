(function (gateService) {
    'use strict';

    describe('manual gate', function () {

        it('should only call finished when all functions were called and only called once', function (done) {
            var finishCalled = 0,
                cb1Called = false,
                cb2Called = false,
                cb3Called = false;

            function finished() {
                finishCalled += 1;
                console.log('finished called');
            }

            function cb1() {
                cb1Called = [].slice.apply(arguments);
                console.log('cb1 called');
                if (!finishCalled && cb1Called && cb2Called && cb3Called) {
                    finished();
                }
            }

            function cb2() {
                cb2Called = [].slice.apply(arguments);
                console.log('cb2 called');
                if (!finishCalled && cb1Called && cb2Called && cb3Called) {
                    finished();
                }
            }

            function cb3() {
                cb3Called = [].slice.apply(arguments);
                console.log('cb3 called');
                if (!finishCalled && cb1Called && cb2Called && cb3Called) {
                    finished();
                }
            }

            expect(finishCalled).toBe(0);
            cb1();
            expect(finishCalled).toBe(0);

            setTimeout(function () {
                expect(finishCalled).toBe(0);
                cb2();
                expect(finishCalled).toBe(0);
            }, 1000);

            setTimeout(function () {
                expect(finishCalled).toBe(0);
                cb3();
            }, 2000);

            setTimeout(function () {
                expect(finishCalled).toBe(1);

                /* Call the callbacks again to check that finished is only called once. */
                cb1(1, 2, 3);
                cb2('a', 'b', 'c');
                cb3(true, false, true);

                /* This should be the same as before. */
                expect(finishCalled).toBe(1);

                /* Verify parameters were passed down to the methods. */
                expect(cb1Called).toEqual([1, 2, 3]);
                expect(cb2Called).toEqual(['a', 'b', 'c']);
                expect(cb3Called).toEqual([true, false, true]);

                done();
            }, 3000);

            expect(finishCalled).toBe(0);
        });

    });

    describe('gateService', function () {

        describe('gateOnParams', function () {

            it('should only call the finishedCallback when all params were called and only called once', function (done) {
                var finishCalled = 0,
                    cb1Called = false,
                    cb2Called = false,
                    cb3Called = false,
                    results = gateService.gateOnParams(
                        function () {
                            finishCalled += 1;
                            console.log('Finished callback called');
                        },
                        function () {
                            cb1Called = [].slice.apply(arguments);
                            console.log('Callback 1 called');
                        },
                        function () {
                            cb2Called = [].slice.apply(arguments);
                            console.log('Callback 2 called');
                        },
                        function () {
                            cb3Called = [].slice.apply(arguments);
                            console.log('Callback 3 called');
                        }
                    );

                expect(finishCalled).toBe(0);
                results[0]();
                expect(finishCalled).toBe(0);

                setTimeout(function () {
                    expect(finishCalled).toBe(0);
                    results[1]();
                    expect(finishCalled).toBe(0);
                }, 1000);

                setTimeout(function () {
                    expect(finishCalled).toBe(0);
                    results[2]();
                }, 2000);

                setTimeout(function () {
                    expect(finishCalled).toBe(1);

                    /* Call the callbacks again to check that finished is only called once. */
                    results[0](1, 2, 3);
                    results[1]('a', 'b', 'c');
                    results[2](true, false, true);

                    /* This should be the same as before. */
                    expect(finishCalled).toBe(1);

                    /* Verify parameters were passed down to the callbacks. */
                    expect(cb1Called).toEqual([1, 2, 3]);
                    expect(cb2Called).toEqual(['a', 'b', 'c']);
                    expect(cb3Called).toEqual([true, false, true]);

                    done();
                }, 3000);

                expect(finishCalled).toBe(0);
            });

        });

        describe('gateOnObjMethods', function () {

            it('should only call the finishedCallback when all methods were called and only called once', function (done) {
                var finishResult = 0,
                    cb1Called = false,
                    cb2Called = false,
                    cb3Called = false,
                    input = {
                        result: 0,
                        method1: function () {
                            cb1Called = [].slice.apply(arguments);
                            console.log('Method 1 called with this=', this);
                            this.result += 10;
                        },
                        method2: function () {
                            cb2Called = [].slice.apply(arguments);
                            console.log('Method 2 called with this=', this);
                            this.result += 200;
                        },
                        method3: function () {
                            cb3Called = [].slice.apply(arguments);
                            console.log('Method 3 called with this=', this);
                            this.result += 3000;
                        }
                    },
                    results = gateService.gateOnObjMethods(
                        function () {
                            console.log('Finish callback called with this=', this);
                            finishResult += this.result;
                        },
                        input
                    );

                expect(results).toBe(input);

                expect(finishResult).toBe(0);
                input.method1();
                expect(finishResult).toBe(0);

                setTimeout(function () {
                    expect(finishResult).toBe(0);
                    input.method2();
                    expect(finishResult).toBe(0);
                }, 1000);

                setTimeout(function () {
                    expect(finishResult).toBe(0);
                    input.method3();
                }, 2000);

                setTimeout(function () {
                    expect(finishResult).toBe(3210);

                    /* Call the methods again to check that finished is only called once. */
                    input.method1(1, 2, 3);
                    input.method2('a', 'b', 'c');
                    input.method3(true, false, true);

                    /* This should be the same as before. */
                    expect(finishResult).toBe(3210);

                    /* The running total on the object, however, should now be double. */
                    expect(input.result).toBe(2 * 3210);

                    /* Verify parameters were passed down to the methods. */
                    expect(cb1Called).toEqual([1, 2, 3]);
                    expect(cb2Called).toEqual(['a', 'b', 'c']);
                    expect(cb3Called).toEqual([true, false, true]);

                    done();
                }, 3000);

                expect(finishResult).toBe(0);
            });

        });

    });

}(window.gateService));
