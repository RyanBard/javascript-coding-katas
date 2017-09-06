# Asyncify

[Run Tests](https://ryanbard.github.io/coding-katas/javascript/concurrency/asyncify/asyncify.html)

This will make a callback run in the next event loop if it wasn't already designed to be called that way.  This protects against the situation where you aren't sure if code after registering your callback will run before or after the 3rd party calls your callback.  Inspired by [Kyle Simpson's Asyncify](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch2.md).
