(function (MyPromise) {
    'use strict';

    describe('MyPromise', function () {

        describe('then', function () {

            it('should trigger a then callback when resolved', function (done) {
                var p = new MyPromise(function (resolve, reject) {
                    resolve('hello');
                });

                p.then(function (data) {
                    expect(data).toBe('hello');
                    done();
                });
            });

            it('should be able to be chained', function (done) {
                var p = new MyPromise(function (resolve, reject) {
                    resolve('hello');
                });

                p.then(function (data) {
                    expect(data).toBe('hello');
                    return data;
                }).then(function (data) {
                    expect(data).toBe('hello');
                    done();
                });
            });

            it('should call callbacks only once', function (done) {
                var callbackCalled = '',
                    p = new MyPromise(function (resolve, reject) {
                        resolve('hello');
                    });

                p.then(function (data) {
                    callbackCalled += 'first';
                    expect(data).toBe('hello');
                    return data;
                }).then(function (data) {
                    callbackCalled += 'second';
                    expect(data).toBe('hello');
                    expect(callbackCalled).toBe('firstsecond');
                    done();
                });
            });

            it('should pass data returned from earlier chains to later chains', function (done) {
                var callbackCalled = '',
                    p = new MyPromise(function (resolve, reject) {
                        resolve('hello');
                    });

                p.then(function (data) {
                    callbackCalled += 'first';
                    expect(data).toBe('hello');
                    return 'HELLO';
                }).then(function (data) {
                    callbackCalled += 'second';
                    expect(data).toBe('HELLO');
                    return 'Hello';
                }).then(function (data) {
                    callbackCalled += 'third';
                    expect(data).toBe('Hello');
                    expect(callbackCalled).toBe('firstsecondthird');
                    done();
                });
            });

            it('should skip then chains when rejected', function (done) {
                var successCalled = '',
                    p = new MyPromise(function (resolve, reject) {
                        reject('error reason');
                    });

                p.then(function (data) {
                    successCalled += 'first';
                    return 'HELLO';
                }).then(function (data) {
                    successCalled += 'second';
                    return 'Hello';
                }).catch(function (reason) {
                    expect(reason).toBe('error reason');
                    expect(successCalled).toBe('');
                    done();
                });
            });

            it('should recover back to then chains when catch function does not throw or return a rejected promise', function (done) {
                var errorCalled = '',
                    successCalled = '',
                    p = new MyPromise(function (resolve, reject) {
                        reject('error reason: ');
                    });

                p.catch(function (reason) {
                    // TODO - off by one layer?  this first catch is getting skipped
                    errorCalled += 'FIRST';
                    return reason + 'HELLO';
                }).then(function (data) {
                    successCalled += 'second';
                    return data + 'Hello';
                }).then(function (data) {
                    successCalled += 'third';
                    expect(data).toBe('error reason: HELLOHello');
                    expect(errorCalled).toBe('FIRST');
                    expect(successCalled).toBe('secondthird');
                    done();
                });
            });

            it('should call all of the callbacks when multiple chains', function (done) {

                var p1 = new MyPromise(function (resolve, reject) {
                        resolve('one');
                    }),
                    chainOne = '',
                    successCalled = '',
                    p2 = p1.then(function (data) {
                        chainOne += 'FIRST';
                        successCalled += 'first';
                        return data + 'two';
                    }),
                    p3 = p2.then(function (data) {
                        chainOne += 'SECOND';
                        successCalled += 'second';
                        return data + 'three';
                    }),
                    chainTwo = '',
                    p4 = p1.then(function (data) {
                        chainTwo += 'First';
                        successCalled += 'third';
                        return data + 'four';
                    }),
                    p5 = p4.then(function (data) {
                        chainTwo += 'Second';
                        successCalled += 'fourth';
                        return data + 'five';
                    });

                setTimeout(function () {
                    expect(chainOne).toBe('FIRSTSECOND');
                    expect(chainTwo).toBe('FirstSecond');
                    expect(successCalled).toContain('first');
                    expect(successCalled).toContain('second');
                    expect(successCalled).toContain('third');
                    expect(successCalled).toContain('fourth');
                    done();
                }, 1000);
            });

            it('should call the correct callbacks before/after error thrown when multiple chains', function (done) {

                var p1 = new MyPromise(function (resolve, reject) {
                        resolve('hello');
                    }),
                    p2 = p1.then(function (data) {
                        throw new Error(data);
                    }),
                    p3Called = false,
                    p3 = p2.then(function (data) {
                        p3Called = true;
                        return data;
                    }),
                    p4Called = false,
                    p4 = p1.then(function (data) {
                        p4Called = true;
                        return data;
                    });

                setTimeout(function () {
                    expect(p3Called).toBe(false);
                    expect(p4Called).toBe(true);
                    done();
                }, 1000);
            });

        });

    });

}(window.MyPromise));
