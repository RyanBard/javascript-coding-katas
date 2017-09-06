var MyPromise = (function () {
    'use strict';


    // call callback
    // if result is a rejected promise, pass promise's value to error's callback (via a setTimeout)
    // alternative: if error thrown, do the same
    // else if result is a resolved promise, pass promise's value to success's callback (via a setTimeout)
    // else if result is an unresolved promise, wait
    // else if result is not a promise, pass that value to success's callback


    // step 1, implement then only, with return value (not wait for promise), single then
    // step 2. chained thens
    // step 3. throw interrupts then chain
    // step 4. throw triggers catch callback
    // step ?. return non-rejected triggers then callback
    // step ?. resolved promise continues then chain
    // step ?. rejected promise switches to catch


    // var chain = {
    //     status: 'registered',
    //     callback: function () {},
    //     success: {
    //         status: 'registered',
    //         callback: function () {},
    //         success: null,
    //         error: null
    //     },
    //     error: {
    //         status: 'registered',
    //         callback: function () {},
    //         success: null,
    //         error: null
    //     }
    // };

    // var handles = [
    //     {error: false, callback: function (data) { return data; }},
    //     {error: false, callback: function (data) { return data; }},
    //     {error: false, callback: function (data) { return data; }},
    //     {}
    // ];

    function MyPromise(callback) {
        console.log(
            'MyPromise called: callback=',
            callback
        );

        var that = this;

        this.childPromises = [];

        callback.call(
            this,
            this.resolve.bind(this),
            this.reject.bind(this)
        );

        // TODO - this cancel method isn't needed?
        // or at least, something needs to keep global references to the promises
        that.cancel = setInterval(function () {
            console.log(
                'setInterval triggered, that=',
                that
            );

            that.step();
        }, 100);
        // setTimeout(function () {
        //     if (that.cancel) {
        //         clearInterval(that.cancel);
        //     }
        // }, 5000);
    }

    // TODO - the then and catch functions probably have to be on the prototype
    // function then(successCallback, errorCallback) {
    //     // TODO - add to callbacks
    //     return new MyPromise(function (resolve, reject) {
    //         this.successCallbacks.pus
    //     });
    // }

    // function catch(callback) {
    //     return;
    // }

    // MyPromise.resolve = function (data) {
    //     return new MyPromise(function (resolve, reject) {
    //         resolve(data);
    //     });
    // };

    // MyPromise.reject = function (reason) {
    //     return new MyPromise(function (resolve, reject) {
    //         reject(reason);
    //     });
    // }

    MyPromise.prototype.resolve = function resolve(data) {
        console.log(
            'resolve called: data=%s, this=',
            data,
            this
        );

        this.data = data;
        this.status = 'resolved';
    };

    MyPromise.prototype.reject = function reject(reason) {
        console.log(
            'reject called: reason=%s, this=',
            reason,
            this
        );

        this.data = reason;
        this.status = 'rejected';
    };

    MyPromise.prototype.then = function then(successCallback, errorCallback) {
        console.log(
            'then called: successCallback=',
            successCallback
        );

        var p = new MyPromise(function (resolve, reject) {
            this.successCallback = successCallback;
            this.errorCallback = errorCallback;
        });

        this.childPromises.push(p);

        return p;
    };

    MyPromise.prototype.catch = function (errorCallback) {
        return this.then(null, errorCallback);
    };

    MyPromise.prototype.step = function step() {
        console.log(
            'step called: status=%s, data=%s, successCallback=',
            this.status,
            this.data,
            this.successCallback
        );

        var that = this,
            shouldResolve;

        if (that.status === 'resolved') {
            shouldResolve = true;
            if (that.successCallback) {
                try {
                    that.data = that.successCallback(that.data);
                    // TODO - should check if promise and rejected???
                    shouldResolve = true;
                } catch (reason) {
                    that.data = reason;
                    shouldResolve = false;
                }
                that.successCallback = null; // TODO - do I need this?
            }
            if (that.childPromises) {
                // TODO - is this the right place to resolve/reject? this promise stays resolved and later chains are rejected right???


                // TODO - I don't think so b/c if this one steps, then later you 'then' it, how would the child know to be resolved?



                if (shouldResolve) {
                    that.childPromises.forEach(function (p) {
                        p.resolve(that.data);
                    });
                } else {
                    that.childPromises.forEach(function (p) {
                        p.reject(that.data);
                    });
                }
            }
            // TODO - maybe put this on top after doing a try-catch
            // Now that the promise has been resolved, we do not need to check again.
            clearInterval(that.cancel);
            that.cancel = null;
        } else if (that.status === 'rejected') {
            shouldResolve = false;
            if (that.errorCallback) {
                try {
                    that.data = that.errorCallback(that.data);
                    // TODO - should check if promise and rejected???
                    shouldResolve = true;
                } catch (reason) {
                    that.data = reason;
                    shouldResolve = false;
                }
                that.errorCallback = null; // TODO - do I need this?
            }
            if (that.childPromises) {

                if (shouldResolve) {
                    that.childPromises.forEach(function (p) {
                        p.resolve(that.data);
                    });
                } else {
                    that.childPromises.forEach(function (p) {
                        p.reject(that.data);
                    });
                }
            }
            // TODO - maybe put this on top after doing a try-catch
            // Now that the promise has been resolved, we do not need to check again.
            clearInterval(that.cancel);
            that.cancel = null;
        }
    };

    return MyPromise;

}());
