(function (timeoutifyService) {
    'use strict';

    describe('timeoutifyService', function () {

        describe('timeoutify', function () {

            it('should call succeed when the callback is called within the time limit', function (done) {
                var result = 0;

                function untrusted(cb, timeToWait) {
                    setTimeout(function () {
                        cb(null, 10);
                    }, timeToWait);
                }
                
                function cb(error, amount) {
                    if (error) {
                        result = error;
                        return;
                    }
                    result += amount;
                }

                untrusted(timeoutifyService.timeoutify(cb, 200), 100);

                setTimeout(function () {
                    expect(result).toBe(10);

                    done();
                }, 400);
            });

            it('should call error when the callback is not called within the time limit and noop on the later call', function (done) {
                var result = 0;

                function untrusted(cb, timeToWait) {
                    setTimeout(function () {
                        cb(null, 10);
                    }, timeToWait);
                }
                
                function cb(error, amount) {
                    if (error) {
                        result = error;
                        return;
                    }
                    result += amount;
                }

                untrusted(timeoutifyService.timeoutify(cb, 200), 300);

                setTimeout(function () {
                    expect(result).toEqual(new Error('Timeout triggered: Call took longer than 200 ms!'));

                    done();
                }, 400);
            });

            it('should error if the callback is never called', function (done) {
                var result = 0;

                function cb(error, amount) {
                    if (error) {
                        result = error;
                        return;
                    }
                    result += amount;
                }

                timeoutifyService.timeoutify(cb, 200);

                setTimeout(function () {
                    expect(result).toEqual(new Error('Timeout triggered: Call took longer than 200 ms!'));

                    done();
                }, 400);
            });

        });

    });

}(window.timeoutifyService));
