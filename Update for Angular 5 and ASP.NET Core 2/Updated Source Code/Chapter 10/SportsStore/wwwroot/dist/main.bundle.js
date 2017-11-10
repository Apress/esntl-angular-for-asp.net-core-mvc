webpackJsonp(["main"],{

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/BehaviorSubject.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BehaviorSubject; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subject__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_ObjectUnsubscribedError__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/ObjectUnsubscribedError.js");
/** PURE_IMPORTS_START ._Subject,._util_ObjectUnsubscribedError PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/**
 * @class BehaviorSubject<T>
 */
var BehaviorSubject = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(BehaviorSubject, _super);
    function BehaviorSubject(_value) {
        _super.call(this);
        this._value = _value;
    }
    Object.defineProperty(BehaviorSubject.prototype, "value", {
        get: function () {
            return this.getValue();
        },
        enumerable: true,
        configurable: true
    });
    BehaviorSubject.prototype._subscribe = function (subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        if (subscription && !subscription.closed) {
            subscriber.next(this._value);
        }
        return subscription;
    };
    BehaviorSubject.prototype.getValue = function () {
        if (this.hasError) {
            throw this.thrownError;
        }
        else if (this.closed) {
            throw new __WEBPACK_IMPORTED_MODULE_1__util_ObjectUnsubscribedError__["a" /* ObjectUnsubscribedError */]();
        }
        else {
            return this._value;
        }
    };
    BehaviorSubject.prototype.next = function (value) {
        _super.prototype.next.call(this, this._value = value);
    };
    return BehaviorSubject;
}(__WEBPACK_IMPORTED_MODULE_0__Subject__["a" /* Subject */]));
//# sourceMappingURL=BehaviorSubject.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/InnerSubscriber.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InnerSubscriber; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subscriber__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Subscriber.js");
/** PURE_IMPORTS_START ._Subscriber PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var InnerSubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(InnerSubscriber, _super);
    function InnerSubscriber(parent, outerValue, outerIndex) {
        _super.call(this);
        this.parent = parent;
        this.outerValue = outerValue;
        this.outerIndex = outerIndex;
        this.index = 0;
    }
    InnerSubscriber.prototype._next = function (value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
    };
    InnerSubscriber.prototype._error = function (error) {
        this.parent.notifyError(error, this);
        this.unsubscribe();
    };
    InnerSubscriber.prototype._complete = function () {
        this.parent.notifyComplete(this);
        this.unsubscribe();
    };
    return InnerSubscriber;
}(__WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */]));
//# sourceMappingURL=InnerSubscriber.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Notification.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Notification; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Observable.js");
/** PURE_IMPORTS_START ._Observable PURE_IMPORTS_END */

/**
 * Represents a push-based event or value that an {@link Observable} can emit.
 * This class is particularly useful for operators that manage notifications,
 * like {@link materialize}, {@link dematerialize}, {@link observeOn}, and
 * others. Besides wrapping the actual delivered value, it also annotates it
 * with metadata of, for instance, what type of push message it is (`next`,
 * `error`, or `complete`).
 *
 * @see {@link materialize}
 * @see {@link dematerialize}
 * @see {@link observeOn}
 *
 * @class Notification<T>
 */
var Notification = /*@__PURE__*/ (/*@__PURE__*/ function () {
    function Notification(kind, value, error) {
        this.kind = kind;
        this.value = value;
        this.error = error;
        this.hasValue = kind === 'N';
    }
    /**
     * Delivers to the given `observer` the value wrapped by this Notification.
     * @param {Observer} observer
     * @return
     */
    Notification.prototype.observe = function (observer) {
        switch (this.kind) {
            case 'N':
                return observer.next && observer.next(this.value);
            case 'E':
                return observer.error && observer.error(this.error);
            case 'C':
                return observer.complete && observer.complete();
        }
    };
    /**
     * Given some {@link Observer} callbacks, deliver the value represented by the
     * current Notification to the correctly corresponding callback.
     * @param {function(value: T): void} next An Observer `next` callback.
     * @param {function(err: any): void} [error] An Observer `error` callback.
     * @param {function(): void} [complete] An Observer `complete` callback.
     * @return {any}
     */
    Notification.prototype.do = function (next, error, complete) {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return next && next(this.value);
            case 'E':
                return error && error(this.error);
            case 'C':
                return complete && complete();
        }
    };
    /**
     * Takes an Observer or its individual callback functions, and calls `observe`
     * or `do` methods accordingly.
     * @param {Observer|function(value: T): void} nextOrObserver An Observer or
     * the `next` callback.
     * @param {function(err: any): void} [error] An Observer `error` callback.
     * @param {function(): void} [complete] An Observer `complete` callback.
     * @return {any}
     */
    Notification.prototype.accept = function (nextOrObserver, error, complete) {
        if (nextOrObserver && typeof nextOrObserver.next === 'function') {
            return this.observe(nextOrObserver);
        }
        else {
            return this.do(nextOrObserver, error, complete);
        }
    };
    /**
     * Returns a simple Observable that just delivers the notification represented
     * by this Notification instance.
     * @return {any}
     */
    Notification.prototype.toObservable = function () {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */].of(this.value);
            case 'E':
                return __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */].throw(this.error);
            case 'C':
                return __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */].empty();
        }
        throw new Error('unexpected notification kind value');
    };
    /**
     * A shortcut to create a Notification instance of the type `next` from a
     * given value.
     * @param {T} value The `next` value.
     * @return {Notification<T>} The "next" Notification representing the
     * argument.
     */
    Notification.createNext = function (value) {
        if (typeof value !== 'undefined') {
            return new Notification('N', value);
        }
        return Notification.undefinedValueNotification;
    };
    /**
     * A shortcut to create a Notification instance of the type `error` from a
     * given error.
     * @param {any} [err] The `error` error.
     * @return {Notification<T>} The "error" Notification representing the
     * argument.
     */
    Notification.createError = function (err) {
        return new Notification('E', undefined, err);
    };
    /**
     * A shortcut to create a Notification instance of the type `complete`.
     * @return {Notification<any>} The valueless "complete" Notification.
     */
    Notification.createComplete = function () {
        return Notification.completeNotification;
    };
    Notification.completeNotification = new Notification('C');
    Notification.undefinedValueNotification = new Notification('N', undefined);
    return Notification;
}());
//# sourceMappingURL=Notification.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Observable.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Observable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_root__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/root.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_toSubscriber__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/toSubscriber.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__symbol_observable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/symbol/observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_pipe__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/pipe.js");
/** PURE_IMPORTS_START ._util_root,._util_toSubscriber,._symbol_observable,._util_pipe PURE_IMPORTS_END */




/**
 * A representation of any set of values over any amount of time. This is the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable = /*@__PURE__*/ (/*@__PURE__*/ function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is called when the Observable is
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     */
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @return {Observable} a new observable with the Operator applied
     */
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    /**
     * Invokes an execution of an Observable and registers Observer handlers for notifications it will emit.
     *
     * <span class="informal">Use it when you have all these Observables, but still nothing is happening.</span>
     *
     * `subscribe` is not a regular operator, but a method that calls Observable's internal `subscribe` function. It
     * might be for example a function that you passed to a {@link create} static factory, but most of the time it is
     * a library implementation, which defines what and when will be emitted by an Observable. This means that calling
     * `subscribe` is actually the moment when Observable starts its work, not when it is created, as it is often
     * thought.
     *
     * Apart from starting the execution of an Observable, this method allows you to listen for values
     * that an Observable emits, as well as for when it completes or errors. You can achieve this in two
     * following ways.
     *
     * The first way is creating an object that implements {@link Observer} interface. It should have methods
     * defined by that interface, but note that it should be just a regular JavaScript object, which you can create
     * yourself in any way you want (ES6 class, classic function constructor, object literal etc.). In particular do
     * not attempt to use any RxJS implementation details to create Observers - you don't need them. Remember also
     * that your object does not have to implement all methods. If you find yourself creating a method that doesn't
     * do anything, you can simply omit it. Note however, that if `error` method is not provided, all errors will
     * be left uncaught.
     *
     * The second way is to give up on Observer object altogether and simply provide callback functions in place of its methods.
     * This means you can provide three functions as arguments to `subscribe`, where first function is equivalent
     * of a `next` method, second of an `error` method and third of a `complete` method. Just as in case of Observer,
     * if you do not need to listen for something, you can omit a function, preferably by passing `undefined` or `null`,
     * since `subscribe` recognizes these functions by where they were placed in function call. When it comes
     * to `error` function, just as before, if not provided, errors emitted by an Observable will be thrown.
     *
     * Whatever style of calling `subscribe` you use, in both cases it returns a Subscription object.
     * This object allows you to call `unsubscribe` on it, which in turn will stop work that an Observable does and will clean
     * up all resources that an Observable used. Note that cancelling a subscription will not call `complete` callback
     * provided to `subscribe` function, which is reserved for a regular completion signal that comes from an Observable.
     *
     * Remember that callbacks provided to `subscribe` are not guaranteed to be called asynchronously.
     * It is an Observable itself that decides when these functions will be called. For example {@link of}
     * by default emits all its values synchronously. Always check documentation for how given Observable
     * will behave when subscribed and if its default behavior can be modified with a {@link Scheduler}.
     *
     * @example <caption>Subscribe with an Observer</caption>
     * const sumObserver = {
     *   sum: 0,
     *   next(value) {
     *     console.log('Adding: ' + value);
     *     this.sum = this.sum + value;
     *   },
     *   error() { // We actually could just remove this method,
     *   },        // since we do not really care about errors right now.
     *   complete() {
     *     console.log('Sum equals: ' + this.sum);
     *   }
     * };
     *
     * Rx.Observable.of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.
     * .subscribe(sumObserver);
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Subscribe with functions</caption>
     * let sum = 0;
     *
     * Rx.Observable.of(1, 2, 3)
     * .subscribe(
     *   function(value) {
     *     console.log('Adding: ' + value);
     *     sum = sum + value;
     *   },
     *   undefined,
     *   function() {
     *     console.log('Sum equals: ' + sum);
     *   }
     * );
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Cancel a subscription</caption>
     * const subscription = Rx.Observable.interval(1000).subscribe(
     *   num => console.log(num),
     *   undefined,
     *   () => console.log('completed!') // Will not be called, even
     * );                                // when cancelling subscription
     *
     *
     * setTimeout(() => {
     *   subscription.unsubscribe();
     *   console.log('unsubscribed!');
     * }, 2500);
     *
     * // Logs:
     * // 0 after 1s
     * // 1 after 2s
     * // "unsubscribed!" after 2.5s
     *
     *
     * @param {Observer|Function} observerOrNext (optional) Either an observer with methods to be called,
     *  or the first of three possible handlers, which is the handler for each value emitted from the subscribed
     *  Observable.
     * @param {Function} error (optional) A handler for a terminal event resulting from an error. If no error handler is provided,
     *  the error will be thrown as unhandled.
     * @param {Function} complete (optional) A handler for a terminal event resulting from successful completion.
     * @return {ISubscription} a subscription reference to the registered handlers
     * @method subscribe
     */
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = Object(__WEBPACK_IMPORTED_MODULE_1__util_toSubscriber__["a" /* toSubscriber */])(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink.add(this.source ? this._subscribe(sink) : this._trySubscribe(sink));
        }
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }
        return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.syncErrorThrown = true;
            sink.syncErrorValue = err;
            sink.error(err);
        }
    };
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
     * @return {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    Observable.prototype.forEach = function (next, PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (__WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].Rx && __WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].Rx.config && __WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].Rx.config.Promise) {
                PromiseCtor = __WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].Rx.config.Promise;
            }
            else if (__WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].Promise) {
                PromiseCtor = __WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            // Must be declared in a separate statement to avoid a RefernceError when
            // accessing subscription below in the closure due to Temporal Dead Zone.
            var subscription;
            subscription = _this.subscribe(function (value) {
                if (subscription) {
                    // if there is a subscription, then we can surmise
                    // the next handling is asynchronous. Any errors thrown
                    // need to be rejected explicitly and unsubscribe must be
                    // called manually
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscription.unsubscribe();
                    }
                }
                else {
                    // if there is NO subscription, then we're getting a nexted
                    // value synchronously during subscription. We can just call it.
                    // If it errors, Observable's `subscribe` will ensure the
                    // unsubscription logic is called, then synchronously rethrow the error.
                    // After that, Promise will trap the error and send it
                    // down the rejection path.
                    next(value);
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        return this.source.subscribe(subscriber);
    };
    /**
     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     * @method Symbol.observable
     * @return {Observable} this instance of the observable
     */
    Observable.prototype[__WEBPACK_IMPORTED_MODULE_2__symbol_observable__["a" /* observable */]] = function () {
        return this;
    };
    /* tslint:enable:max-line-length */
    /**
     * Used to stitch together functional operators into a chain.
     * @method pipe
     * @return {Observable} the Observable result of all of the operators having
     * been called in the order they were passed in.
     *
     * @example
     *
     * import { map, filter, scan } from 'rxjs/operators';
     *
     * Rx.Observable.interval(1000)
     *   .pipe(
     *     filter(x => x % 2 === 0),
     *     map(x => x + x),
     *     scan((acc, x) => acc + x)
     *   )
     *   .subscribe(x => console.log(x))
     */
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i - 0] = arguments[_i];
        }
        if (operations.length === 0) {
            return this;
        }
        return Object(__WEBPACK_IMPORTED_MODULE_3__util_pipe__["b" /* pipeFromArray */])(operations)(this);
    };
    /* tslint:enable:max-line-length */
    Observable.prototype.toPromise = function (PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (__WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].Rx && __WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].Rx.config && __WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].Rx.config.Promise) {
                PromiseCtor = __WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].Rx.config.Promise;
            }
            else if (__WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].Promise) {
                PromiseCtor = __WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature
    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @static true
     * @owner Observable
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @return {Observable} a new cold observable
     */
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
//# sourceMappingURL=Observable.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Observer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return empty; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var empty = {
    closed: true,
    next: function (value) { },
    error: function (err) { throw err; },
    complete: function () { }
};
//# sourceMappingURL=Observer.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/OuterSubscriber.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OuterSubscriber; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subscriber__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Subscriber.js");
/** PURE_IMPORTS_START ._Subscriber PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var OuterSubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(OuterSubscriber, _super);
    function OuterSubscriber() {
        _super.apply(this, arguments);
    }
    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
        this.destination.error(error);
    };
    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
        this.destination.complete();
    };
    return OuterSubscriber;
}(__WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */]));
//# sourceMappingURL=OuterSubscriber.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Subject.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SubjectSubscriber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Subject; });
/* unused harmony export AnonymousSubject */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Subscriber__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Subscriber.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Subscription__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Subscription.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_ObjectUnsubscribedError__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/ObjectUnsubscribedError.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__SubjectSubscription__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/SubjectSubscription.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__symbol_rxSubscriber__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/symbol/rxSubscriber.js");
/** PURE_IMPORTS_START ._Observable,._Subscriber,._Subscription,._util_ObjectUnsubscribedError,._SubjectSubscription,._symbol_rxSubscriber PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};






/**
 * @class SubjectSubscriber<T>
 */
var SubjectSubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(SubjectSubscriber, _super);
    function SubjectSubscriber(destination) {
        _super.call(this, destination);
        this.destination = destination;
    }
    return SubjectSubscriber;
}(__WEBPACK_IMPORTED_MODULE_1__Subscriber__["a" /* Subscriber */]));
/**
 * @class Subject<T>
 */
var Subject = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(Subject, _super);
    function Subject() {
        _super.call(this);
        this.observers = [];
        this.closed = false;
        this.isStopped = false;
        this.hasError = false;
        this.thrownError = null;
    }
    Subject.prototype[__WEBPACK_IMPORTED_MODULE_5__symbol_rxSubscriber__["a" /* rxSubscriber */]] = function () {
        return new SubjectSubscriber(this);
    };
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype.next = function (value) {
        if (this.closed) {
            throw new __WEBPACK_IMPORTED_MODULE_3__util_ObjectUnsubscribedError__["a" /* ObjectUnsubscribedError */]();
        }
        if (!this.isStopped) {
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].next(value);
            }
        }
    };
    Subject.prototype.error = function (err) {
        if (this.closed) {
            throw new __WEBPACK_IMPORTED_MODULE_3__util_ObjectUnsubscribedError__["a" /* ObjectUnsubscribedError */]();
        }
        this.hasError = true;
        this.thrownError = err;
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].error(err);
        }
        this.observers.length = 0;
    };
    Subject.prototype.complete = function () {
        if (this.closed) {
            throw new __WEBPACK_IMPORTED_MODULE_3__util_ObjectUnsubscribedError__["a" /* ObjectUnsubscribedError */]();
        }
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].complete();
        }
        this.observers.length = 0;
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = true;
        this.closed = true;
        this.observers = null;
    };
    Subject.prototype._trySubscribe = function (subscriber) {
        if (this.closed) {
            throw new __WEBPACK_IMPORTED_MODULE_3__util_ObjectUnsubscribedError__["a" /* ObjectUnsubscribedError */]();
        }
        else {
            return _super.prototype._trySubscribe.call(this, subscriber);
        }
    };
    Subject.prototype._subscribe = function (subscriber) {
        if (this.closed) {
            throw new __WEBPACK_IMPORTED_MODULE_3__util_ObjectUnsubscribedError__["a" /* ObjectUnsubscribedError */]();
        }
        else if (this.hasError) {
            subscriber.error(this.thrownError);
            return __WEBPACK_IMPORTED_MODULE_2__Subscription__["a" /* Subscription */].EMPTY;
        }
        else if (this.isStopped) {
            subscriber.complete();
            return __WEBPACK_IMPORTED_MODULE_2__Subscription__["a" /* Subscription */].EMPTY;
        }
        else {
            this.observers.push(subscriber);
            return new __WEBPACK_IMPORTED_MODULE_4__SubjectSubscription__["a" /* SubjectSubscription */](this, subscriber);
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */]();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(__WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */]));
/**
 * @class AnonymousSubject<T>
 */
var AnonymousSubject = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        _super.call(this);
        this.destination = destination;
        this.source = source;
    }
    AnonymousSubject.prototype.next = function (value) {
        var destination = this.destination;
        if (destination && destination.next) {
            destination.next(value);
        }
    };
    AnonymousSubject.prototype.error = function (err) {
        var destination = this.destination;
        if (destination && destination.error) {
            this.destination.error(err);
        }
    };
    AnonymousSubject.prototype.complete = function () {
        var destination = this.destination;
        if (destination && destination.complete) {
            this.destination.complete();
        }
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var source = this.source;
        if (source) {
            return this.source.subscribe(subscriber);
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_2__Subscription__["a" /* Subscription */].EMPTY;
        }
    };
    return AnonymousSubject;
}(Subject));
//# sourceMappingURL=Subject.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/SubjectSubscription.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubjectSubscription; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subscription__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Subscription.js");
/** PURE_IMPORTS_START ._Subscription PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SubjectSubscription = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(SubjectSubscription, _super);
    function SubjectSubscription(subject, subscriber) {
        _super.call(this);
        this.subject = subject;
        this.subscriber = subscriber;
        this.closed = false;
    }
    SubjectSubscription.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.closed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
            return;
        }
        var subscriberIndex = observers.indexOf(this.subscriber);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    };
    return SubjectSubscription;
}(__WEBPACK_IMPORTED_MODULE_0__Subscription__["a" /* Subscription */]));
//# sourceMappingURL=SubjectSubscription.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Subscriber.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Subscriber; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_isFunction__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/isFunction.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Subscription__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Subscription.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Observer__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Observer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__symbol_rxSubscriber__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/symbol/rxSubscriber.js");
/** PURE_IMPORTS_START ._util_isFunction,._Subscription,._Observer,._symbol_rxSubscriber PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};




/**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
 * consuming the values of an {@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 * @class Subscriber<T>
 */
var Subscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(Subscriber, _super);
    /**
     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
     * defined Observer or a `next` callback function.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     */
    function Subscriber(destinationOrNext, error, complete) {
        _super.call(this);
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
            case 0:
                this.destination = __WEBPACK_IMPORTED_MODULE_2__Observer__["a" /* empty */];
                break;
            case 1:
                if (!destinationOrNext) {
                    this.destination = __WEBPACK_IMPORTED_MODULE_2__Observer__["a" /* empty */];
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        this.destination = destinationOrNext;
                        this.destination.add(this);
                    }
                    else {
                        this.syncErrorThrowable = true;
                        this.destination = new SafeSubscriber(this, destinationOrNext);
                    }
                    break;
                }
            default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                break;
        }
    }
    Subscriber.prototype[__WEBPACK_IMPORTED_MODULE_3__symbol_rxSubscriber__["a" /* rxSubscriber */]] = function () { return this; };
    /**
     * A static factory for a Subscriber, given a (potentially partial) definition
     * of an Observer.
     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
     * Observer represented by the given arguments.
     */
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    /**
     * The {@link Observer} callback to receive notifications of type `next` from
     * the Observable, with a value. The Observable may call this method 0 or more
     * times.
     * @param {T} [value] The `next` value.
     * @return {void}
     */
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    /**
     * The {@link Observer} callback to receive notifications of type `error` from
     * the Observable, with an attached {@link Error}. Notifies the Observer that
     * the Observable has experienced an error condition.
     * @param {any} [err] The `error` exception.
     * @return {void}
     */
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    /**
     * The {@link Observer} callback to receive a valueless notification of type
     * `complete` from the Observable. Notifies the Observer that the Observable
     * has finished sending push-based notifications.
     * @return {void}
     */
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        this._parent = null;
        this._parents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parent = _parent;
        this._parents = _parents;
        return this;
    };
    return Subscriber;
}(__WEBPACK_IMPORTED_MODULE_1__Subscription__["a" /* Subscription */]));
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SafeSubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        _super.call(this);
        this._parentSubscriber = _parentSubscriber;
        var next;
        var context = this;
        if (Object(__WEBPACK_IMPORTED_MODULE_0__util_isFunction__["a" /* isFunction */])(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== __WEBPACK_IMPORTED_MODULE_2__Observer__["a" /* empty */]) {
                context = Object.create(observerOrNext);
                if (Object(__WEBPACK_IMPORTED_MODULE_0__util_isFunction__["a" /* isFunction */])(context.unsubscribe)) {
                    this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = this.unsubscribe.bind(this);
            }
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._error) {
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                throw err;
            }
            else {
                _parentSubscriber.syncErrorValue = err;
                _parentSubscriber.syncErrorThrown = true;
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function () { return _this._complete.call(_this._context); };
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            throw err;
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));
//# sourceMappingURL=Subscriber.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Subscription.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Subscription; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_isArray__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/isArray.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_isObject__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/isObject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_isFunction__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/isFunction.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_tryCatch__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/tryCatch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_errorObject__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/errorObject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_UnsubscriptionError__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/UnsubscriptionError.js");
/** PURE_IMPORTS_START ._util_isArray,._util_isObject,._util_isFunction,._util_tryCatch,._util_errorObject,._util_UnsubscriptionError PURE_IMPORTS_END */






/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription = /*@__PURE__*/ (/*@__PURE__*/ function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription(unsubscribe) {
        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        // null out _subscriptions first so any child subscriptions that attempt
        // to remove themselves from this subscription will noop
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        // if this._parent is null, then so is this._parents, and we
        // don't have to remove ourselves from any parent subscriptions.
        while (_parent) {
            _parent.remove(this);
            // if this._parents is null or index >= len,
            // then _parent is set to null, and the loop exits
            _parent = ++index < len && _parents[index] || null;
        }
        if (Object(__WEBPACK_IMPORTED_MODULE_2__util_isFunction__["a" /* isFunction */])(_unsubscribe)) {
            var trial = Object(__WEBPACK_IMPORTED_MODULE_3__util_tryCatch__["a" /* tryCatch */])(_unsubscribe).call(this);
            if (trial === __WEBPACK_IMPORTED_MODULE_4__util_errorObject__["a" /* errorObject */]) {
                hasErrors = true;
                errors = errors || (__WEBPACK_IMPORTED_MODULE_4__util_errorObject__["a" /* errorObject */].e instanceof __WEBPACK_IMPORTED_MODULE_5__util_UnsubscriptionError__["a" /* UnsubscriptionError */] ?
                    flattenUnsubscriptionErrors(__WEBPACK_IMPORTED_MODULE_4__util_errorObject__["a" /* errorObject */].e.errors) : [__WEBPACK_IMPORTED_MODULE_4__util_errorObject__["a" /* errorObject */].e]);
            }
        }
        if (Object(__WEBPACK_IMPORTED_MODULE_0__util_isArray__["a" /* isArray */])(_subscriptions)) {
            index = -1;
            len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (Object(__WEBPACK_IMPORTED_MODULE_1__util_isObject__["a" /* isObject */])(sub)) {
                    var trial = Object(__WEBPACK_IMPORTED_MODULE_3__util_tryCatch__["a" /* tryCatch */])(sub.unsubscribe).call(sub);
                    if (trial === __WEBPACK_IMPORTED_MODULE_4__util_errorObject__["a" /* errorObject */]) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = __WEBPACK_IMPORTED_MODULE_4__util_errorObject__["a" /* errorObject */].e;
                        if (err instanceof __WEBPACK_IMPORTED_MODULE_5__util_UnsubscriptionError__["a" /* UnsubscriptionError */]) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new __WEBPACK_IMPORTED_MODULE_5__util_UnsubscriptionError__["a" /* UnsubscriptionError */](errors);
        }
    };
    /**
     * Adds a tear down to be called during the unsubscribe() of this
     * Subscription.
     *
     * If the tear down being added is a subscription that is already
     * unsubscribed, is the same reference `add` is being called on, or is
     * `Subscription.EMPTY`, it will not be added.
     *
     * If this subscription is already in an `closed` state, the passed
     * tear down logic will be executed immediately.
     *
     * @param {TeardownLogic} teardown The additional logic to execute on
     * teardown.
     * @return {Subscription} Returns the Subscription used or created to be
     * added to the inner subscriptions list. This Subscription can be used with
     * `remove()` to remove the passed teardown logic from the inner subscriptions
     * list.
     */
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var subscription = teardown;
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (typeof subscription._addParent !== 'function' /* quack quack */) {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
    };
    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param {Subscription} subscription The subscription to remove.
     * @return {void}
     */
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.prototype._addParent = function (parent) {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        if (!_parent || _parent === parent) {
            // If we don't have a parent, or the new parent is the same as the
            // current parent, then set this._parent to the new parent.
            this._parent = parent;
        }
        else if (!_parents) {
            // If there's already one parent, but not multiple, allocate an Array to
            // store the rest of the parent Subscriptions.
            this._parents = [parent];
        }
        else if (_parents.indexOf(parent) === -1) {
            // Only add the new parent to the _parents list if it's not already there.
            _parents.push(parent);
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof __WEBPACK_IMPORTED_MODULE_5__util_UnsubscriptionError__["a" /* UnsubscriptionError */]) ? err.errors : err); }, []);
}
//# sourceMappingURL=Subscription.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/add/operator/catch.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__operator_catch__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operator/catch.js");
/** PURE_IMPORTS_START .._.._Observable,.._.._operator_catch PURE_IMPORTS_END */


__WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */].prototype.catch = __WEBPACK_IMPORTED_MODULE_1__operator_catch__["a" /* _catch */];
__WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */].prototype._catch = __WEBPACK_IMPORTED_MODULE_1__operator_catch__["a" /* _catch */];
//# sourceMappingURL=catch.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/add/operator/filter.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__operator_filter__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operator/filter.js");
/** PURE_IMPORTS_START .._.._Observable,.._.._operator_filter PURE_IMPORTS_END */


__WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */].prototype.filter = __WEBPACK_IMPORTED_MODULE_1__operator_filter__["a" /* filter */];
//# sourceMappingURL=filter.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/add/operator/map.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__operator_map__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operator/map.js");
/** PURE_IMPORTS_START .._.._Observable,.._.._operator_map PURE_IMPORTS_END */


__WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */].prototype.map = __WEBPACK_IMPORTED_MODULE_1__operator_map__["a" /* map */];
//# sourceMappingURL=map.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/ArrayLikeObservable.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrayLikeObservable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ScalarObservable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/ScalarObservable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__EmptyObservable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/EmptyObservable.js");
/** PURE_IMPORTS_START .._Observable,._ScalarObservable,._EmptyObservable PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};



/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ArrayLikeObservable = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(ArrayLikeObservable, _super);
    function ArrayLikeObservable(arrayLike, scheduler) {
        _super.call(this);
        this.arrayLike = arrayLike;
        this.scheduler = scheduler;
        if (!scheduler && arrayLike.length === 1) {
            this._isScalar = true;
            this.value = arrayLike[0];
        }
    }
    ArrayLikeObservable.create = function (arrayLike, scheduler) {
        var length = arrayLike.length;
        if (length === 0) {
            return new __WEBPACK_IMPORTED_MODULE_2__EmptyObservable__["a" /* EmptyObservable */]();
        }
        else if (length === 1) {
            return new __WEBPACK_IMPORTED_MODULE_1__ScalarObservable__["a" /* ScalarObservable */](arrayLike[0], scheduler);
        }
        else {
            return new ArrayLikeObservable(arrayLike, scheduler);
        }
    };
    ArrayLikeObservable.dispatch = function (state) {
        var arrayLike = state.arrayLike, index = state.index, length = state.length, subscriber = state.subscriber;
        if (subscriber.closed) {
            return;
        }
        if (index >= length) {
            subscriber.complete();
            return;
        }
        subscriber.next(arrayLike[index]);
        state.index = index + 1;
        this.schedule(state);
    };
    ArrayLikeObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var _a = this, arrayLike = _a.arrayLike, scheduler = _a.scheduler;
        var length = arrayLike.length;
        if (scheduler) {
            return scheduler.schedule(ArrayLikeObservable.dispatch, 0, {
                arrayLike: arrayLike, index: index, length: length, subscriber: subscriber
            });
        }
        else {
            for (var i = 0; i < length && !subscriber.closed; i++) {
                subscriber.next(arrayLike[i]);
            }
            subscriber.complete();
        }
    };
    return ArrayLikeObservable;
}(__WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */]));
//# sourceMappingURL=ArrayLikeObservable.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/ArrayObservable.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrayObservable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ScalarObservable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/ScalarObservable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__EmptyObservable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/EmptyObservable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_isScheduler__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/isScheduler.js");
/** PURE_IMPORTS_START .._Observable,._ScalarObservable,._EmptyObservable,.._util_isScheduler PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};




/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ArrayObservable = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(ArrayObservable, _super);
    function ArrayObservable(array, scheduler) {
        _super.call(this);
        this.array = array;
        this.scheduler = scheduler;
        if (!scheduler && array.length === 1) {
            this._isScalar = true;
            this.value = array[0];
        }
    }
    ArrayObservable.create = function (array, scheduler) {
        return new ArrayObservable(array, scheduler);
    };
    /**
     * Creates an Observable that emits some values you specify as arguments,
     * immediately one after the other, and then emits a complete notification.
     *
     * <span class="informal">Emits the arguments you provide, then completes.
     * </span>
     *
     * <img src="./img/of.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the arguments given, and the complete notification thereafter. It can
     * be used for composing with other Observables, such as with {@link concat}.
     * By default, it uses a `null` IScheduler, which means the `next`
     * notifications are sent synchronously, although with a different IScheduler
     * it is possible to determine when those notifications will be delivered.
     *
     * @example <caption>Emit 10, 20, 30, then 'a', 'b', 'c', then start ticking every second.</caption>
     * var numbers = Rx.Observable.of(10, 20, 30);
     * var letters = Rx.Observable.of('a', 'b', 'c');
     * var interval = Rx.Observable.interval(1000);
     * var result = numbers.concat(letters).concat(interval);
     * result.subscribe(x => console.log(x));
     *
     * @see {@link create}
     * @see {@link empty}
     * @see {@link never}
     * @see {@link throw}
     *
     * @param {...T} values Arguments that represent `next` values to be emitted.
     * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
     * the emissions of the `next` notifications.
     * @return {Observable<T>} An Observable that emits each given input value.
     * @static true
     * @name of
     * @owner Observable
     */
    ArrayObservable.of = function () {
        var array = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            array[_i - 0] = arguments[_i];
        }
        var scheduler = array[array.length - 1];
        if (Object(__WEBPACK_IMPORTED_MODULE_3__util_isScheduler__["a" /* isScheduler */])(scheduler)) {
            array.pop();
        }
        else {
            scheduler = null;
        }
        var len = array.length;
        if (len > 1) {
            return new ArrayObservable(array, scheduler);
        }
        else if (len === 1) {
            return new __WEBPACK_IMPORTED_MODULE_1__ScalarObservable__["a" /* ScalarObservable */](array[0], scheduler);
        }
        else {
            return new __WEBPACK_IMPORTED_MODULE_2__EmptyObservable__["a" /* EmptyObservable */](scheduler);
        }
    };
    ArrayObservable.dispatch = function (state) {
        var array = state.array, index = state.index, count = state.count, subscriber = state.subscriber;
        if (index >= count) {
            subscriber.complete();
            return;
        }
        subscriber.next(array[index]);
        if (subscriber.closed) {
            return;
        }
        state.index = index + 1;
        this.schedule(state);
    };
    ArrayObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var array = this.array;
        var count = array.length;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ArrayObservable.dispatch, 0, {
                array: array, index: index, count: count, subscriber: subscriber
            });
        }
        else {
            for (var i = 0; i < count && !subscriber.closed; i++) {
                subscriber.next(array[i]);
            }
            subscriber.complete();
        }
    };
    return ArrayObservable;
}(__WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */]));
//# sourceMappingURL=ArrayObservable.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/ConnectableObservable.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ConnectableObservable */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return connectableObservableDescriptor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subject__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Observable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Subscriber__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Subscriber.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Subscription__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Subscription.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__operators_refCount__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/refCount.js");
/** PURE_IMPORTS_START .._Subject,.._Observable,.._Subscriber,.._Subscription,.._operators_refCount PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};





/**
 * @class ConnectableObservable<T>
 */
var ConnectableObservable = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(ConnectableObservable, _super);
    function ConnectableObservable(source, subjectFactory) {
        _super.call(this);
        this.source = source;
        this.subjectFactory = subjectFactory;
        this._refCount = 0;
        this._isComplete = false;
    }
    ConnectableObservable.prototype._subscribe = function (subscriber) {
        return this.getSubject().subscribe(subscriber);
    };
    ConnectableObservable.prototype.getSubject = function () {
        var subject = this._subject;
        if (!subject || subject.isStopped) {
            this._subject = this.subjectFactory();
        }
        return this._subject;
    };
    ConnectableObservable.prototype.connect = function () {
        var connection = this._connection;
        if (!connection) {
            this._isComplete = false;
            connection = this._connection = new __WEBPACK_IMPORTED_MODULE_3__Subscription__["a" /* Subscription */]();
            connection.add(this.source
                .subscribe(new ConnectableSubscriber(this.getSubject(), this)));
            if (connection.closed) {
                this._connection = null;
                connection = __WEBPACK_IMPORTED_MODULE_3__Subscription__["a" /* Subscription */].EMPTY;
            }
            else {
                this._connection = connection;
            }
        }
        return connection;
    };
    ConnectableObservable.prototype.refCount = function () {
        return Object(__WEBPACK_IMPORTED_MODULE_4__operators_refCount__["a" /* refCount */])()(this);
    };
    return ConnectableObservable;
}(__WEBPACK_IMPORTED_MODULE_1__Observable__["a" /* Observable */]));
var connectableProto = ConnectableObservable.prototype;
var connectableObservableDescriptor = {
    operator: { value: null },
    _refCount: { value: 0, writable: true },
    _subject: { value: null, writable: true },
    _connection: { value: null, writable: true },
    _subscribe: { value: connectableProto._subscribe },
    _isComplete: { value: connectableProto._isComplete, writable: true },
    getSubject: { value: connectableProto.getSubject },
    connect: { value: connectableProto.connect },
    refCount: { value: connectableProto.refCount }
};
var ConnectableSubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(ConnectableSubscriber, _super);
    function ConnectableSubscriber(destination, connectable) {
        _super.call(this, destination);
        this.connectable = connectable;
    }
    ConnectableSubscriber.prototype._error = function (err) {
        this._unsubscribe();
        _super.prototype._error.call(this, err);
    };
    ConnectableSubscriber.prototype._complete = function () {
        this.connectable._isComplete = true;
        this._unsubscribe();
        _super.prototype._complete.call(this);
    };
    ConnectableSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (connectable) {
            this.connectable = null;
            var connection = connectable._connection;
            connectable._refCount = 0;
            connectable._subject = null;
            connectable._connection = null;
            if (connection) {
                connection.unsubscribe();
            }
        }
    };
    return ConnectableSubscriber;
}(__WEBPACK_IMPORTED_MODULE_0__Subject__["b" /* SubjectSubscriber */]));
var RefCountOperator = /*@__PURE__*/ (/*@__PURE__*/ function () {
    function RefCountOperator(connectable) {
        this.connectable = connectable;
    }
    RefCountOperator.prototype.call = function (subscriber, source) {
        var connectable = this.connectable;
        connectable._refCount++;
        var refCounter = new RefCountSubscriber(subscriber, connectable);
        var subscription = source.subscribe(refCounter);
        if (!refCounter.closed) {
            refCounter.connection = connectable.connect();
        }
        return subscription;
    };
    return RefCountOperator;
}());
var RefCountSubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(RefCountSubscriber, _super);
    function RefCountSubscriber(destination, connectable) {
        _super.call(this, destination);
        this.connectable = connectable;
    }
    RefCountSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (!connectable) {
            this.connection = null;
            return;
        }
        this.connectable = null;
        var refCount = connectable._refCount;
        if (refCount <= 0) {
            this.connection = null;
            return;
        }
        connectable._refCount = refCount - 1;
        if (refCount > 1) {
            this.connection = null;
            return;
        }
        ///
        // Compare the local RefCountSubscriber's connection Subscription to the
        // connection Subscription on the shared ConnectableObservable. In cases
        // where the ConnectableObservable source synchronously emits values, and
        // the RefCountSubscriber's downstream Observers synchronously unsubscribe,
        // execution continues to here before the RefCountOperator has a chance to
        // supply the RefCountSubscriber with the shared connection Subscription.
        // For example:
        // ```
        // Observable.range(0, 10)
        //   .publish()
        //   .refCount()
        //   .take(5)
        //   .subscribe();
        // ```
        // In order to account for this case, RefCountSubscriber should only dispose
        // the ConnectableObservable's shared connection Subscription if the
        // connection Subscription exists, *and* either:
        //   a. RefCountSubscriber doesn't have a reference to the shared connection
        //      Subscription yet, or,
        //   b. RefCountSubscriber's connection Subscription reference is identical
        //      to the shared connection Subscription
        ///
        var connection = this.connection;
        var sharedConnection = connectable._connection;
        this.connection = null;
        if (sharedConnection && (!connection || sharedConnection === connection)) {
            sharedConnection.unsubscribe();
        }
    };
    return RefCountSubscriber;
}(__WEBPACK_IMPORTED_MODULE_2__Subscriber__["a" /* Subscriber */]));
//# sourceMappingURL=ConnectableObservable.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/EmptyObservable.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmptyObservable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Observable.js");
/** PURE_IMPORTS_START .._Observable PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var EmptyObservable = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(EmptyObservable, _super);
    function EmptyObservable(scheduler) {
        _super.call(this);
        this.scheduler = scheduler;
    }
    /**
     * Creates an Observable that emits no items to the Observer and immediately
     * emits a complete notification.
     *
     * <span class="informal">Just emits 'complete', and nothing else.
     * </span>
     *
     * <img src="./img/empty.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the complete notification. It can be used for composing with other
     * Observables, such as in a {@link mergeMap}.
     *
     * @example <caption>Emit the number 7, then complete.</caption>
     * var result = Rx.Observable.empty().startWith(7);
     * result.subscribe(x => console.log(x));
     *
     * @example <caption>Map and flatten only odd numbers to the sequence 'a', 'b', 'c'</caption>
     * var interval = Rx.Observable.interval(1000);
     * var result = interval.mergeMap(x =>
     *   x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty()
     * );
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following to the console:
     * // x is equal to the count on the interval eg(0,1,2,3,...)
     * // x will occur every 1000ms
     * // if x % 2 is equal to 1 print abc
     * // if x % 2 is not equal to 1 nothing will be output
     *
     * @see {@link create}
     * @see {@link never}
     * @see {@link of}
     * @see {@link throw}
     *
     * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
     * the emission of the complete notification.
     * @return {Observable} An "empty" Observable: emits only the complete
     * notification.
     * @static true
     * @name empty
     * @owner Observable
     */
    EmptyObservable.create = function (scheduler) {
        return new EmptyObservable(scheduler);
    };
    EmptyObservable.dispatch = function (arg) {
        var subscriber = arg.subscriber;
        subscriber.complete();
    };
    EmptyObservable.prototype._subscribe = function (subscriber) {
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber: subscriber });
        }
        else {
            subscriber.complete();
        }
    };
    return EmptyObservable;
}(__WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */]));
//# sourceMappingURL=EmptyObservable.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/ForkJoinObservable.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForkJoinObservable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EmptyObservable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/EmptyObservable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_isArray__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/isArray.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_subscribeToResult__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/subscribeToResult.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__OuterSubscriber__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/OuterSubscriber.js");
/** PURE_IMPORTS_START .._Observable,._EmptyObservable,.._util_isArray,.._util_subscribeToResult,.._OuterSubscriber PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};





/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ForkJoinObservable = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(ForkJoinObservable, _super);
    function ForkJoinObservable(sources, resultSelector) {
        _super.call(this);
        this.sources = sources;
        this.resultSelector = resultSelector;
    }
    /* tslint:enable:max-line-length */
    /**
     * Joins last values emitted by passed Observables.
     *
     * <span class="informal">Wait for Observables to complete and then combine last values they emitted.</span>
     *
     * <img src="./img/forkJoin.png" width="100%">
     *
     * `forkJoin` is an operator that takes any number of Observables which can be passed either as an array
     * or directly as arguments. If no input Observables are provided, resulting stream will complete
     * immediately.
     *
     * `forkJoin` will wait for all passed Observables to complete and then it will emit an array with last
     * values from corresponding Observables. So if you pass `n` Observables to the operator, resulting
     * array will have `n` values, where first value is the last thing emitted by the first Observable,
     * second value is the last thing emitted by the second Observable and so on. That means `forkJoin` will
     * not emit more than once and it will complete after that. If you need to emit combined values not only
     * at the end of lifecycle of passed Observables, but also throughout it, try out {@link combineLatest}
     * or {@link zip} instead.
     *
     * In order for resulting array to have the same length as the number of input Observables, whenever any of
     * that Observables completes without emitting any value, `forkJoin` will complete at that moment as well
     * and it will not emit anything either, even if it already has some last values from other Observables.
     * Conversely, if there is an Observable that never completes, `forkJoin` will never complete as well,
     * unless at any point some other Observable completes without emitting value, which brings us back to
     * the previous case. Overall, in order for `forkJoin` to emit a value, all Observables passed as arguments
     * have to emit something at least once and complete.
     *
     * If any input Observable errors at some point, `forkJoin` will error as well and all other Observables
     * will be immediately unsubscribed.
     *
     * Optionally `forkJoin` accepts project function, that will be called with values which normally
     * would land in emitted array. Whatever is returned by project function, will appear in output
     * Observable instead. This means that default project can be thought of as a function that takes
     * all its arguments and puts them into an array. Note that project function will be called only
     * when output Observable is supposed to emit a result.
     *
     * @example <caption>Use forkJoin with operator emitting immediately</caption>
     * const observable = Rx.Observable.forkJoin(
     *   Rx.Observable.of(1, 2, 3, 4),
     *   Rx.Observable.of(5, 6, 7, 8)
     * );
     * observable.subscribe(
     *   value => console.log(value),
     *   err => {},
     *   () => console.log('This is how it ends!')
     * );
     *
     * // Logs:
     * // [4, 8]
     * // "This is how it ends!"
     *
     *
     * @example <caption>Use forkJoin with operator emitting after some time</caption>
     * const observable = Rx.Observable.forkJoin(
     *   Rx.Observable.interval(1000).take(3), // emit 0, 1, 2 every second and complete
     *   Rx.Observable.interval(500).take(4) // emit 0, 1, 2, 3 every half a second and complete
     * );
     * observable.subscribe(
     *   value => console.log(value),
     *   err => {},
     *   () => console.log('This is how it ends!')
     * );
     *
     * // Logs:
     * // [2, 3] after 3 seconds
     * // "This is how it ends!" immediately after
     *
     *
     * @example <caption>Use forkJoin with project function</caption>
     * const observable = Rx.Observable.forkJoin(
     *   Rx.Observable.interval(1000).take(3), // emit 0, 1, 2 every second and complete
     *   Rx.Observable.interval(500).take(4), // emit 0, 1, 2, 3 every half a second and complete
     *   (n, m) => n + m
     * );
     * observable.subscribe(
     *   value => console.log(value),
     *   err => {},
     *   () => console.log('This is how it ends!')
     * );
     *
     * // Logs:
     * // 5 after 3 seconds
     * // "This is how it ends!" immediately after
     *
     * @see {@link combineLatest}
     * @see {@link zip}
     *
     * @param {...SubscribableOrPromise} sources Any number of Observables provided either as an array or as an arguments
     * passed directly to the operator.
     * @param {function} [project] Function that takes values emitted by input Observables and returns value
     * that will appear in resulting Observable instead of default array.
     * @return {Observable} Observable emitting either an array of last values emitted by passed Observables
     * or value from project function.
     * @static true
     * @name forkJoin
     * @owner Observable
     */
    ForkJoinObservable.create = function () {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sources[_i - 0] = arguments[_i];
        }
        if (sources === null || arguments.length === 0) {
            return new __WEBPACK_IMPORTED_MODULE_1__EmptyObservable__["a" /* EmptyObservable */]();
        }
        var resultSelector = null;
        if (typeof sources[sources.length - 1] === 'function') {
            resultSelector = sources.pop();
        }
        // if the first and only other argument besides the resultSelector is an array
        // assume it's been called with `forkJoin([obs1, obs2, obs3], resultSelector)`
        if (sources.length === 1 && Object(__WEBPACK_IMPORTED_MODULE_2__util_isArray__["a" /* isArray */])(sources[0])) {
            sources = sources[0];
        }
        if (sources.length === 0) {
            return new __WEBPACK_IMPORTED_MODULE_1__EmptyObservable__["a" /* EmptyObservable */]();
        }
        return new ForkJoinObservable(sources, resultSelector);
    };
    ForkJoinObservable.prototype._subscribe = function (subscriber) {
        return new ForkJoinSubscriber(subscriber, this.sources, this.resultSelector);
    };
    return ForkJoinObservable;
}(__WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */]));
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ForkJoinSubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(ForkJoinSubscriber, _super);
    function ForkJoinSubscriber(destination, sources, resultSelector) {
        _super.call(this, destination);
        this.sources = sources;
        this.resultSelector = resultSelector;
        this.completed = 0;
        this.haveValues = 0;
        var len = sources.length;
        this.total = len;
        this.values = new Array(len);
        for (var i = 0; i < len; i++) {
            var source = sources[i];
            var innerSubscription = Object(__WEBPACK_IMPORTED_MODULE_3__util_subscribeToResult__["a" /* subscribeToResult */])(this, source, null, i);
            if (innerSubscription) {
                innerSubscription.outerIndex = i;
                this.add(innerSubscription);
            }
        }
    }
    ForkJoinSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.values[outerIndex] = innerValue;
        if (!innerSub._hasValue) {
            innerSub._hasValue = true;
            this.haveValues++;
        }
    };
    ForkJoinSubscriber.prototype.notifyComplete = function (innerSub) {
        var destination = this.destination;
        var _a = this, haveValues = _a.haveValues, resultSelector = _a.resultSelector, values = _a.values;
        var len = values.length;
        if (!innerSub._hasValue) {
            destination.complete();
            return;
        }
        this.completed++;
        if (this.completed !== len) {
            return;
        }
        if (haveValues === len) {
            var value = resultSelector ? resultSelector.apply(this, values) : values;
            destination.next(value);
        }
        destination.complete();
    };
    return ForkJoinSubscriber;
}(__WEBPACK_IMPORTED_MODULE_4__OuterSubscriber__["a" /* OuterSubscriber */]));
//# sourceMappingURL=ForkJoinObservable.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/FromObservable.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FromObservable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_isArray__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/isArray.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_isArrayLike__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/isArrayLike.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_isPromise__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/isPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__PromiseObservable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/PromiseObservable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__IteratorObservable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/IteratorObservable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ArrayObservable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/ArrayObservable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ArrayLikeObservable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/ArrayLikeObservable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__symbol_iterator__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/symbol/iterator.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Observable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__operators_observeOn__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/observeOn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__symbol_observable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/symbol/observable.js");
/** PURE_IMPORTS_START .._util_isArray,.._util_isArrayLike,.._util_isPromise,._PromiseObservable,._IteratorObservable,._ArrayObservable,._ArrayLikeObservable,.._symbol_iterator,.._Observable,.._operators_observeOn,.._symbol_observable PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};











/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var FromObservable = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(FromObservable, _super);
    function FromObservable(ish, scheduler) {
        _super.call(this, null);
        this.ish = ish;
        this.scheduler = scheduler;
    }
    /**
     * Creates an Observable from an Array, an array-like object, a Promise, an
     * iterable object, or an Observable-like object.
     *
     * <span class="informal">Converts almost anything to an Observable.</span>
     *
     * <img src="./img/from.png" width="100%">
     *
     * Convert various other objects and data types into Observables. `from`
     * converts a Promise or an array-like or an
     * [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)
     * object into an Observable that emits the items in that promise or array or
     * iterable. A String, in this context, is treated as an array of characters.
     * Observable-like objects (contains a function named with the ES2015 Symbol
     * for Observable) can also be converted through this operator.
     *
     * @example <caption>Converts an array to an Observable</caption>
     * var array = [10, 20, 30];
     * var result = Rx.Observable.from(array);
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following:
     * // 10 20 30
     *
     * @example <caption>Convert an infinite iterable (from a generator) to an Observable</caption>
     * function* generateDoubles(seed) {
     *   var i = seed;
     *   while (true) {
     *     yield i;
     *     i = 2 * i; // double it
     *   }
     * }
     *
     * var iterator = generateDoubles(3);
     * var result = Rx.Observable.from(iterator).take(10);
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following:
     * // 3 6 12 24 48 96 192 384 768 1536
     *
     * @see {@link create}
     * @see {@link fromEvent}
     * @see {@link fromEventPattern}
     * @see {@link fromPromise}
     *
     * @param {ObservableInput<T>} ish A subscribable object, a Promise, an
     * Observable-like, an Array, an iterable or an array-like object to be
     * converted.
     * @param {Scheduler} [scheduler] The scheduler on which to schedule the
     * emissions of values.
     * @return {Observable<T>} The Observable whose values are originally from the
     * input object that was converted.
     * @static true
     * @name from
     * @owner Observable
     */
    FromObservable.create = function (ish, scheduler) {
        if (ish != null) {
            if (typeof ish[__WEBPACK_IMPORTED_MODULE_10__symbol_observable__["a" /* observable */]] === 'function') {
                if (ish instanceof __WEBPACK_IMPORTED_MODULE_8__Observable__["a" /* Observable */] && !scheduler) {
                    return ish;
                }
                return new FromObservable(ish, scheduler);
            }
            else if (Object(__WEBPACK_IMPORTED_MODULE_0__util_isArray__["a" /* isArray */])(ish)) {
                return new __WEBPACK_IMPORTED_MODULE_5__ArrayObservable__["a" /* ArrayObservable */](ish, scheduler);
            }
            else if (Object(__WEBPACK_IMPORTED_MODULE_2__util_isPromise__["a" /* isPromise */])(ish)) {
                return new __WEBPACK_IMPORTED_MODULE_3__PromiseObservable__["a" /* PromiseObservable */](ish, scheduler);
            }
            else if (typeof ish[__WEBPACK_IMPORTED_MODULE_7__symbol_iterator__["a" /* iterator */]] === 'function' || typeof ish === 'string') {
                return new __WEBPACK_IMPORTED_MODULE_4__IteratorObservable__["a" /* IteratorObservable */](ish, scheduler);
            }
            else if (Object(__WEBPACK_IMPORTED_MODULE_1__util_isArrayLike__["a" /* isArrayLike */])(ish)) {
                return new __WEBPACK_IMPORTED_MODULE_6__ArrayLikeObservable__["a" /* ArrayLikeObservable */](ish, scheduler);
            }
        }
        throw new TypeError((ish !== null && typeof ish || ish) + ' is not observable');
    };
    FromObservable.prototype._subscribe = function (subscriber) {
        var ish = this.ish;
        var scheduler = this.scheduler;
        if (scheduler == null) {
            return ish[__WEBPACK_IMPORTED_MODULE_10__symbol_observable__["a" /* observable */]]().subscribe(subscriber);
        }
        else {
            return ish[__WEBPACK_IMPORTED_MODULE_10__symbol_observable__["a" /* observable */]]().subscribe(new __WEBPACK_IMPORTED_MODULE_9__operators_observeOn__["a" /* ObserveOnSubscriber */](subscriber, scheduler, 0));
        }
    };
    return FromObservable;
}(__WEBPACK_IMPORTED_MODULE_8__Observable__["a" /* Observable */]));
//# sourceMappingURL=FromObservable.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/IteratorObservable.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IteratorObservable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_root__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/root.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Observable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__symbol_iterator__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/symbol/iterator.js");
/** PURE_IMPORTS_START .._util_root,.._Observable,.._symbol_iterator PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};



/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var IteratorObservable = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(IteratorObservable, _super);
    function IteratorObservable(iterator, scheduler) {
        _super.call(this);
        this.scheduler = scheduler;
        if (iterator == null) {
            throw new Error('iterator cannot be null.');
        }
        this.iterator = getIterator(iterator);
    }
    IteratorObservable.create = function (iterator, scheduler) {
        return new IteratorObservable(iterator, scheduler);
    };
    IteratorObservable.dispatch = function (state) {
        var index = state.index, hasError = state.hasError, iterator = state.iterator, subscriber = state.subscriber;
        if (hasError) {
            subscriber.error(state.error);
            return;
        }
        var result = iterator.next();
        if (result.done) {
            subscriber.complete();
            return;
        }
        subscriber.next(result.value);
        state.index = index + 1;
        if (subscriber.closed) {
            if (typeof iterator.return === 'function') {
                iterator.return();
            }
            return;
        }
        this.schedule(state);
    };
    IteratorObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var _a = this, iterator = _a.iterator, scheduler = _a.scheduler;
        if (scheduler) {
            return scheduler.schedule(IteratorObservable.dispatch, 0, {
                index: index, iterator: iterator, subscriber: subscriber
            });
        }
        else {
            do {
                var result = iterator.next();
                if (result.done) {
                    subscriber.complete();
                    break;
                }
                else {
                    subscriber.next(result.value);
                }
                if (subscriber.closed) {
                    if (typeof iterator.return === 'function') {
                        iterator.return();
                    }
                    break;
                }
            } while (true);
        }
    };
    return IteratorObservable;
}(__WEBPACK_IMPORTED_MODULE_1__Observable__["a" /* Observable */]));
var StringIterator = /*@__PURE__*/ (/*@__PURE__*/ function () {
    function StringIterator(str, idx, len) {
        if (idx === void 0) {
            idx = 0;
        }
        if (len === void 0) {
            len = str.length;
        }
        this.str = str;
        this.idx = idx;
        this.len = len;
    }
    StringIterator.prototype[__WEBPACK_IMPORTED_MODULE_2__symbol_iterator__["a" /* iterator */]] = function () { return (this); };
    StringIterator.prototype.next = function () {
        return this.idx < this.len ? {
            done: false,
            value: this.str.charAt(this.idx++)
        } : {
            done: true,
            value: undefined
        };
    };
    return StringIterator;
}());
var ArrayIterator = /*@__PURE__*/ (/*@__PURE__*/ function () {
    function ArrayIterator(arr, idx, len) {
        if (idx === void 0) {
            idx = 0;
        }
        if (len === void 0) {
            len = toLength(arr);
        }
        this.arr = arr;
        this.idx = idx;
        this.len = len;
    }
    ArrayIterator.prototype[__WEBPACK_IMPORTED_MODULE_2__symbol_iterator__["a" /* iterator */]] = function () { return this; };
    ArrayIterator.prototype.next = function () {
        return this.idx < this.len ? {
            done: false,
            value: this.arr[this.idx++]
        } : {
            done: true,
            value: undefined
        };
    };
    return ArrayIterator;
}());
function getIterator(obj) {
    var i = obj[__WEBPACK_IMPORTED_MODULE_2__symbol_iterator__["a" /* iterator */]];
    if (!i && typeof obj === 'string') {
        return new StringIterator(obj);
    }
    if (!i && obj.length !== undefined) {
        return new ArrayIterator(obj);
    }
    if (!i) {
        throw new TypeError('object is not iterable');
    }
    return obj[__WEBPACK_IMPORTED_MODULE_2__symbol_iterator__["a" /* iterator */]]();
}
var maxSafeInteger = /*@__PURE__*/ Math.pow(2, 53) - 1;
function toLength(o) {
    var len = +o.length;
    if (isNaN(len)) {
        return 0;
    }
    if (len === 0 || !numberIsFinite(len)) {
        return len;
    }
    len = sign(len) * Math.floor(Math.abs(len));
    if (len <= 0) {
        return 0;
    }
    if (len > maxSafeInteger) {
        return maxSafeInteger;
    }
    return len;
}
function numberIsFinite(value) {
    return typeof value === 'number' && __WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].isFinite(value);
}
function sign(value) {
    var valueAsNumber = +value;
    if (valueAsNumber === 0) {
        return valueAsNumber;
    }
    if (isNaN(valueAsNumber)) {
        return valueAsNumber;
    }
    return valueAsNumber < 0 ? -1 : 1;
}
//# sourceMappingURL=IteratorObservable.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/PromiseObservable.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PromiseObservable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_root__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/root.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Observable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Observable.js");
/** PURE_IMPORTS_START .._util_root,.._Observable PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var PromiseObservable = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(PromiseObservable, _super);
    function PromiseObservable(promise, scheduler) {
        _super.call(this);
        this.promise = promise;
        this.scheduler = scheduler;
    }
    /**
     * Converts a Promise to an Observable.
     *
     * <span class="informal">Returns an Observable that just emits the Promise's
     * resolved value, then completes.</span>
     *
     * Converts an ES2015 Promise or a Promises/A+ spec compliant Promise to an
     * Observable. If the Promise resolves with a value, the output Observable
     * emits that resolved value as a `next`, and then completes. If the Promise
     * is rejected, then the output Observable emits the corresponding Error.
     *
     * @example <caption>Convert the Promise returned by Fetch to an Observable</caption>
     * var result = Rx.Observable.fromPromise(fetch('http://myserver.com/'));
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     * @see {@link bindCallback}
     * @see {@link from}
     *
     * @param {PromiseLike<T>} promise The promise to be converted.
     * @param {Scheduler} [scheduler] An optional IScheduler to use for scheduling
     * the delivery of the resolved value (or the rejection).
     * @return {Observable<T>} An Observable which wraps the Promise.
     * @static true
     * @name fromPromise
     * @owner Observable
     */
    PromiseObservable.create = function (promise, scheduler) {
        return new PromiseObservable(promise, scheduler);
    };
    PromiseObservable.prototype._subscribe = function (subscriber) {
        var _this = this;
        var promise = this.promise;
        var scheduler = this.scheduler;
        if (scheduler == null) {
            if (this._isScalar) {
                if (!subscriber.closed) {
                    subscriber.next(this.value);
                    subscriber.complete();
                }
            }
            else {
                promise.then(function (value) {
                    _this.value = value;
                    _this._isScalar = true;
                    if (!subscriber.closed) {
                        subscriber.next(value);
                        subscriber.complete();
                    }
                }, function (err) {
                    if (!subscriber.closed) {
                        subscriber.error(err);
                    }
                })
                    .then(null, function (err) {
                    // escape the promise trap, throw unhandled errors
                    __WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].setTimeout(function () { throw err; });
                });
            }
        }
        else {
            if (this._isScalar) {
                if (!subscriber.closed) {
                    return scheduler.schedule(dispatchNext, 0, { value: this.value, subscriber: subscriber });
                }
            }
            else {
                promise.then(function (value) {
                    _this.value = value;
                    _this._isScalar = true;
                    if (!subscriber.closed) {
                        subscriber.add(scheduler.schedule(dispatchNext, 0, { value: value, subscriber: subscriber }));
                    }
                }, function (err) {
                    if (!subscriber.closed) {
                        subscriber.add(scheduler.schedule(dispatchError, 0, { err: err, subscriber: subscriber }));
                    }
                })
                    .then(null, function (err) {
                    // escape the promise trap, throw unhandled errors
                    __WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].setTimeout(function () { throw err; });
                });
            }
        }
    };
    return PromiseObservable;
}(__WEBPACK_IMPORTED_MODULE_1__Observable__["a" /* Observable */]));
function dispatchNext(arg) {
    var value = arg.value, subscriber = arg.subscriber;
    if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
    }
}
function dispatchError(arg) {
    var err = arg.err, subscriber = arg.subscriber;
    if (!subscriber.closed) {
        subscriber.error(err);
    }
}
//# sourceMappingURL=PromiseObservable.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/ScalarObservable.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScalarObservable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Observable.js");
/** PURE_IMPORTS_START .._Observable PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ScalarObservable = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(ScalarObservable, _super);
    function ScalarObservable(value, scheduler) {
        _super.call(this);
        this.value = value;
        this.scheduler = scheduler;
        this._isScalar = true;
        if (scheduler) {
            this._isScalar = false;
        }
    }
    ScalarObservable.create = function (value, scheduler) {
        return new ScalarObservable(value, scheduler);
    };
    ScalarObservable.dispatch = function (state) {
        var done = state.done, value = state.value, subscriber = state.subscriber;
        if (done) {
            subscriber.complete();
            return;
        }
        subscriber.next(value);
        if (subscriber.closed) {
            return;
        }
        state.done = true;
        this.schedule(state);
    };
    ScalarObservable.prototype._subscribe = function (subscriber) {
        var value = this.value;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ScalarObservable.dispatch, 0, {
                done: false, value: value, subscriber: subscriber
            });
        }
        else {
            subscriber.next(value);
            if (!subscriber.closed) {
                subscriber.complete();
            }
        }
    };
    return ScalarObservable;
}(__WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */]));
//# sourceMappingURL=ScalarObservable.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/forkJoin.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return forkJoin; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ForkJoinObservable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/ForkJoinObservable.js");
/** PURE_IMPORTS_START ._ForkJoinObservable PURE_IMPORTS_END */

var forkJoin = __WEBPACK_IMPORTED_MODULE_0__ForkJoinObservable__["a" /* ForkJoinObservable */].create;
//# sourceMappingURL=forkJoin.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/from.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return from; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FromObservable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/FromObservable.js");
/** PURE_IMPORTS_START ._FromObservable PURE_IMPORTS_END */

var from = __WEBPACK_IMPORTED_MODULE_0__FromObservable__["a" /* FromObservable */].create;
//# sourceMappingURL=from.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/fromPromise.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fromPromise; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PromiseObservable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/PromiseObservable.js");
/** PURE_IMPORTS_START ._PromiseObservable PURE_IMPORTS_END */

var fromPromise = __WEBPACK_IMPORTED_MODULE_0__PromiseObservable__["a" /* PromiseObservable */].create;
//# sourceMappingURL=fromPromise.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/merge.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return merge; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__operator_merge__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operator/merge.js");
/** PURE_IMPORTS_START .._operator_merge PURE_IMPORTS_END */

var merge = __WEBPACK_IMPORTED_MODULE_0__operator_merge__["a" /* mergeStatic */];
//# sourceMappingURL=merge.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/of.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return of; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ArrayObservable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/ArrayObservable.js");
/** PURE_IMPORTS_START ._ArrayObservable PURE_IMPORTS_END */

var of = __WEBPACK_IMPORTED_MODULE_0__ArrayObservable__["a" /* ArrayObservable */].of;
//# sourceMappingURL=of.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operator/catch.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = _catch;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__operators_catchError__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/catchError.js");
/** PURE_IMPORTS_START .._operators_catchError PURE_IMPORTS_END */

/**
 * Catches errors on the observable to be handled by returning a new observable or throwing an error.
 *
 * <img src="./img/catch.png" width="100%">
 *
 * @example <caption>Continues with a different Observable when there's an error</caption>
 *
 * Observable.of(1, 2, 3, 4, 5)
 *   .map(n => {
 * 	   if (n == 4) {
 * 	     throw 'four!';
 *     }
 *	   return n;
 *   })
 *   .catch(err => Observable.of('I', 'II', 'III', 'IV', 'V'))
 *   .subscribe(x => console.log(x));
 *   // 1, 2, 3, I, II, III, IV, V
 *
 * @example <caption>Retries the caught source Observable again in case of error, similar to retry() operator</caption>
 *
 * Observable.of(1, 2, 3, 4, 5)
 *   .map(n => {
 * 	   if (n === 4) {
 * 	     throw 'four!';
 *     }
 * 	   return n;
 *   })
 *   .catch((err, caught) => caught)
 *   .take(30)
 *   .subscribe(x => console.log(x));
 *   // 1, 2, 3, 1, 2, 3, ...
 *
 * @example <caption>Throws a new error when the source Observable throws an error</caption>
 *
 * Observable.of(1, 2, 3, 4, 5)
 *   .map(n => {
 *     if (n == 4) {
 *       throw 'four!';
 *     }
 *     return n;
 *   })
 *   .catch(err => {
 *     throw 'error in source. Details: ' + err;
 *   })
 *   .subscribe(
 *     x => console.log(x),
 *     err => console.log(err)
 *   );
 *   // 1, 2, 3, error in source. Details: four!
 *
 * @param {function} selector a function that takes as arguments `err`, which is the error, and `caught`, which
 *  is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
 *  is returned by the `selector` will be used to continue the observable chain.
 * @return {Observable} An observable that originates from either the source or the observable returned by the
 *  catch `selector` function.
 * @method catch
 * @name catch
 * @owner Observable
 */
function _catch(selector) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__operators_catchError__["a" /* catchError */])(selector)(this);
}
//# sourceMappingURL=catch.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operator/concatAll.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = concatAll;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__operators_concatAll__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/concatAll.js");
/** PURE_IMPORTS_START .._operators_concatAll PURE_IMPORTS_END */

/* tslint:enable:max-line-length */
/**
 * Converts a higher-order Observable into a first-order Observable by
 * concatenating the inner Observables in order.
 *
 * <span class="informal">Flattens an Observable-of-Observables by putting one
 * inner Observable after the other.</span>
 *
 * <img src="./img/concatAll.png" width="100%">
 *
 * Joins every Observable emitted by the source (a higher-order Observable), in
 * a serial fashion. It subscribes to each inner Observable only after the
 * previous inner Observable has completed, and merges all of their values into
 * the returned observable.
 *
 * __Warning:__ If the source Observable emits Observables quickly and
 * endlessly, and the inner Observables it emits generally complete slower than
 * the source emits, you can run into memory issues as the incoming Observables
 * collect in an unbounded buffer.
 *
 * Note: `concatAll` is equivalent to `mergeAll` with concurrency parameter set
 * to `1`.
 *
 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map(ev => Rx.Observable.interval(1000).take(4));
 * var firstOrder = higherOrder.concatAll();
 * firstOrder.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // (results are not concurrent)
 * // For every click on the "document" it will emit values 0 to 3 spaced
 * // on a 1000ms interval
 * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
 *
 * @see {@link combineAll}
 * @see {@link concat}
 * @see {@link concatMap}
 * @see {@link concatMapTo}
 * @see {@link exhaust}
 * @see {@link mergeAll}
 * @see {@link switch}
 * @see {@link zipAll}
 *
 * @return {Observable} An Observable emitting values from all the inner
 * Observables concatenated.
 * @method concatAll
 * @owner Observable
 */
function concatAll() {
    return Object(__WEBPACK_IMPORTED_MODULE_0__operators_concatAll__["a" /* concatAll */])()(this);
}
//# sourceMappingURL=concatAll.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operator/concatMap.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = concatMap;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__operators_concatMap__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/concatMap.js");
/** PURE_IMPORTS_START .._operators_concatMap PURE_IMPORTS_END */

/* tslint:enable:max-line-length */
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable, in a serialized fashion waiting for each one to complete before
 * merging the next.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link concatAll}.</span>
 *
 * <img src="./img/concatMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an (so-called "inner") Observable. Each new inner Observable is
 * concatenated with the previous inner Observable.
 *
 * __Warning:__ if source values arrive endlessly and faster than their
 * corresponding inner Observables can complete, it will result in memory issues
 * as inner Observables amass in an unbounded buffer waiting for their turn to
 * be subscribed to.
 *
 * Note: `concatMap` is equivalent to `mergeMap` with concurrency parameter set
 * to `1`.
 *
 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.concatMap(ev => Rx.Observable.interval(1000).take(4));
 * result.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // (results are not concurrent)
 * // For every click on the "document" it will emit values 0 to 3 spaced
 * // on a 1000ms interval
 * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
 *
 * @see {@link concat}
 * @see {@link concatAll}
 * @see {@link concatMapTo}
 * @see {@link exhaustMap}
 * @see {@link mergeMap}
 * @see {@link switchMap}
 *
 * @param {function(value: T, ?index: number): ObservableInput} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and taking values from each projected inner
 * Observable sequentially.
 * @method concatMap
 * @owner Observable
 */
function concatMap(project, resultSelector) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__operators_concatMap__["a" /* concatMap */])(project, resultSelector)(this);
}
//# sourceMappingURL=concatMap.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operator/every.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = every;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__operators_every__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/every.js");
/** PURE_IMPORTS_START .._operators_every PURE_IMPORTS_END */

/**
 * Returns an Observable that emits whether or not every item of the source satisfies the condition specified.
 *
 * @example <caption>A simple example emitting true if all elements are less than 5, false otherwise</caption>
 *  Observable.of(1, 2, 3, 4, 5, 6)
 *     .every(x => x < 5)
 *     .subscribe(x => console.log(x)); // -> false
 *
 * @param {function} predicate A function for determining if an item meets a specified condition.
 * @param {any} [thisArg] Optional object to use for `this` in the callback.
 * @return {Observable} An Observable of booleans that determines if all items of the source Observable meet the condition specified.
 * @method every
 * @owner Observable
 */
function every(predicate, thisArg) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__operators_every__["a" /* every */])(predicate, thisArg)(this);
}
//# sourceMappingURL=every.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operator/filter.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = filter;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__operators_filter__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/filter.js");
/** PURE_IMPORTS_START .._operators_filter PURE_IMPORTS_END */

/* tslint:enable:max-line-length */
/**
 * Filter items emitted by the source Observable by only emitting those that
 * satisfy a specified predicate.
 *
 * <span class="informal">Like
 * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
 * it only emits a value from the source if it passes a criterion function.</span>
 *
 * <img src="./img/filter.png" width="100%">
 *
 * Similar to the well-known `Array.prototype.filter` method, this operator
 * takes values from the source Observable, passes them through a `predicate`
 * function and only emits those values that yielded `true`.
 *
 * @example <caption>Emit only click events whose target was a DIV element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
 * clicksOnDivs.subscribe(x => console.log(x));
 *
 * @see {@link distinct}
 * @see {@link distinctUntilChanged}
 * @see {@link distinctUntilKeyChanged}
 * @see {@link ignoreElements}
 * @see {@link partition}
 * @see {@link skip}
 *
 * @param {function(value: T, index: number): boolean} predicate A function that
 * evaluates each value emitted by the source Observable. If it returns `true`,
 * the value is emitted, if `false` the value is not passed to the output
 * Observable. The `index` parameter is the number `i` for the i-th source
 * emission that has happened since the subscription, starting from the number
 * `0`.
 * @param {any} [thisArg] An optional argument to determine the value of `this`
 * in the `predicate` function.
 * @return {Observable} An Observable of values from the source that were
 * allowed by the `predicate` function.
 * @method filter
 * @owner Observable
 */
function filter(predicate, thisArg) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__operators_filter__["a" /* filter */])(predicate, thisArg)(this);
}
//# sourceMappingURL=filter.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operator/first.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = first;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__operators_first__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/first.js");
/** PURE_IMPORTS_START .._operators_first PURE_IMPORTS_END */

/**
 * Emits only the first value (or the first value that meets some condition)
 * emitted by the source Observable.
 *
 * <span class="informal">Emits only the first value. Or emits only the first
 * value that passes some test.</span>
 *
 * <img src="./img/first.png" width="100%">
 *
 * If called with no arguments, `first` emits the first value of the source
 * Observable, then completes. If called with a `predicate` function, `first`
 * emits the first value of the source that matches the specified condition. It
 * may also take a `resultSelector` function to produce the output value from
 * the input value, and a `defaultValue` to emit in case the source completes
 * before it is able to emit a valid value. Throws an error if `defaultValue`
 * was not provided and a matching element is not found.
 *
 * @example <caption>Emit only the first click that happens on the DOM</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.first();
 * result.subscribe(x => console.log(x));
 *
 * @example <caption>Emits the first click that happens on a DIV</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.first(ev => ev.target.tagName === 'DIV');
 * result.subscribe(x => console.log(x));
 *
 * @see {@link filter}
 * @see {@link find}
 * @see {@link take}
 *
 * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
 * callback if the Observable completes before any `next` notification was sent.
 *
 * @param {function(value: T, index: number, source: Observable<T>): boolean} [predicate]
 * An optional function called with each item to test for condition matching.
 * @param {function(value: T, index: number): R} [resultSelector] A function to
 * produce the value on the output Observable based on the values
 * and the indices of the source Observable. The arguments passed to this
 * function are:
 * - `value`: the value that was emitted on the source.
 * - `index`: the "index" of the value from the source.
 * @param {R} [defaultValue] The default value emitted in case no valid value
 * was found on the source.
 * @return {Observable<T|R>} An Observable of the first item that matches the
 * condition.
 * @method first
 * @owner Observable
 */
function first(predicate, resultSelector, defaultValue) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__operators_first__["a" /* first */])(predicate, resultSelector, defaultValue)(this);
}
//# sourceMappingURL=first.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operator/last.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = last;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__operators_last__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/last.js");
/** PURE_IMPORTS_START .._operators_last PURE_IMPORTS_END */

/* tslint:enable:max-line-length */
/**
 * Returns an Observable that emits only the last item emitted by the source Observable.
 * It optionally takes a predicate function as a parameter, in which case, rather than emitting
 * the last item from the source Observable, the resulting Observable will emit the last item
 * from the source Observable that satisfies the predicate.
 *
 * <img src="./img/last.png" width="100%">
 *
 * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
 * callback if the Observable completes before any `next` notification was sent.
 * @param {function} predicate - The condition any source emitted item has to satisfy.
 * @return {Observable} An Observable that emits only the last item satisfying the given condition
 * from the source, or an NoSuchElementException if no such items are emitted.
 * @throws - Throws if no items that match the predicate are emitted by the source Observable.
 * @method last
 * @owner Observable
 */
function last(predicate, resultSelector, defaultValue) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__operators_last__["a" /* last */])(predicate, resultSelector, defaultValue)(this);
}
//# sourceMappingURL=last.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operator/map.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = map;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__operators_map__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/map.js");
/** PURE_IMPORTS_START .._operators_map PURE_IMPORTS_END */

/**
 * Applies a given `project` function to each value emitted by the source
 * Observable, and emits the resulting values as an Observable.
 *
 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
 * it passes each source value through a transformation function to get
 * corresponding output values.</span>
 *
 * <img src="./img/map.png" width="100%">
 *
 * Similar to the well known `Array.prototype.map` function, this operator
 * applies a projection to each value and emits that projection in the output
 * Observable.
 *
 * @example <caption>Map every click to the clientX position of that click</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks.map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link mapTo}
 * @see {@link pluck}
 *
 * @param {function(value: T, index: number): R} project The function to apply
 * to each `value` emitted by the source Observable. The `index` parameter is
 * the number `i` for the i-th emission that has happened since the
 * subscription, starting from the number `0`.
 * @param {any} [thisArg] An optional argument to define what `this` is in the
 * `project` function.
 * @return {Observable<R>} An Observable that emits the values from the source
 * Observable transformed by the given `project` function.
 * @method map
 * @owner Observable
 */
function map(project, thisArg) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__operators_map__["a" /* map */])(project, thisArg)(this);
}
//# sourceMappingURL=map.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operator/merge.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export merge */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__operators_merge__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/merge.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__operators_merge__["b"]; });
/** PURE_IMPORTS_START .._operators_merge PURE_IMPORTS_END */


/* tslint:enable:max-line-length */
/**
 * Creates an output Observable which concurrently emits all values from every
 * given input Observable.
 *
 * <span class="informal">Flattens multiple Observables together by blending
 * their values into one Observable.</span>
 *
 * <img src="./img/merge.png" width="100%">
 *
 * `merge` subscribes to each given input Observable (either the source or an
 * Observable given as argument), and simply forwards (without doing any
 * transformation) all the values from all the input Observables to the output
 * Observable. The output Observable only completes once all input Observables
 * have completed. Any error delivered by an input Observable will be immediately
 * emitted on the output Observable.
 *
 * @example <caption>Merge together two Observables: 1s interval and clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var clicksOrTimer = clicks.merge(timer);
 * clicksOrTimer.subscribe(x => console.log(x));
 *
 * @example <caption>Merge together 3 Observables, but only 2 run concurrently</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var concurrent = 2; // the argument
 * var merged = timer1.merge(timer2, timer3, concurrent);
 * merged.subscribe(x => console.log(x));
 *
 * @see {@link mergeAll}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 *
 * @param {ObservableInput} other An input Observable to merge with the source
 * Observable. More than one input Observables may be given as argument.
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @param {Scheduler} [scheduler=null] The IScheduler to use for managing
 * concurrency of input Observables.
 * @return {Observable} An Observable that emits items that are the result of
 * every input Observable.
 * @method merge
 * @owner Observable
 */
function merge() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    return __WEBPACK_IMPORTED_MODULE_0__operators_merge__["a" /* merge */].apply(void 0, observables)(this);
}
//# sourceMappingURL=merge.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operator/mergeAll.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = mergeAll;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__operators_mergeAll__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/mergeAll.js");
/** PURE_IMPORTS_START .._operators_mergeAll PURE_IMPORTS_END */

/**
 * Converts a higher-order Observable into a first-order Observable which
 * concurrently delivers all values that are emitted on the inner Observables.
 *
 * <span class="informal">Flattens an Observable-of-Observables.</span>
 *
 * <img src="./img/mergeAll.png" width="100%">
 *
 * `mergeAll` subscribes to an Observable that emits Observables, also known as
 * a higher-order Observable. Each time it observes one of these emitted inner
 * Observables, it subscribes to that and delivers all the values from the
 * inner Observable on the output Observable. The output Observable only
 * completes once all inner Observables have completed. Any error delivered by
 * a inner Observable will be immediately emitted on the output Observable.
 *
 * @example <caption>Spawn a new interval Observable for each click event, and blend their outputs as one Observable</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
 * var firstOrder = higherOrder.mergeAll();
 * firstOrder.subscribe(x => console.log(x));
 *
 * @example <caption>Count from 0 to 9 every second for each click, but only allow 2 concurrent timers</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000).take(10));
 * var firstOrder = higherOrder.mergeAll(2);
 * firstOrder.subscribe(x => console.log(x));
 *
 * @see {@link combineAll}
 * @see {@link concatAll}
 * @see {@link exhaust}
 * @see {@link merge}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 * @see {@link switch}
 * @see {@link zipAll}
 *
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of inner
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits values coming from all the
 * inner Observables emitted by the source Observable.
 * @method mergeAll
 * @owner Observable
 */
function mergeAll(concurrent) {
    if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
    }
    return Object(__WEBPACK_IMPORTED_MODULE_0__operators_mergeAll__["a" /* mergeAll */])(concurrent)(this);
}
//# sourceMappingURL=mergeAll.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operator/mergeMap.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = mergeMap;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__operators_mergeMap__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/mergeMap.js");
/** PURE_IMPORTS_START .._operators_mergeMap PURE_IMPORTS_END */

/* tslint:enable:max-line-length */
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link mergeAll}.</span>
 *
 * <img src="./img/mergeMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an Observable, and then merging those resulting Observables and
 * emitting the results of this merger.
 *
 * @example <caption>Map and flatten each letter to an Observable ticking every 1 second</caption>
 * var letters = Rx.Observable.of('a', 'b', 'c');
 * var result = letters.mergeMap(x =>
 *   Rx.Observable.interval(1000).map(i => x+i)
 * );
 * result.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // a0
 * // b0
 * // c0
 * // a1
 * // b1
 * // c1
 * // continues to list a,b,c with respective ascending integers
 *
 * @see {@link concatMap}
 * @see {@link exhaustMap}
 * @see {@link merge}
 * @see {@link mergeAll}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 * @see {@link switchMap}
 *
 * @param {function(value: T, ?index: number): ObservableInput} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and merging the results of the Observables obtained
 * from this transformation.
 * @method mergeMap
 * @owner Observable
 */
function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
    }
    return Object(__WEBPACK_IMPORTED_MODULE_0__operators_mergeMap__["a" /* mergeMap */])(project, resultSelector, concurrent)(this);
}
//# sourceMappingURL=mergeMap.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operator/reduce.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = reduce;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__operators_reduce__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/reduce.js");
/** PURE_IMPORTS_START .._operators_reduce PURE_IMPORTS_END */

/* tslint:enable:max-line-length */
/**
 * Applies an accumulator function over the source Observable, and returns the
 * accumulated result when the source completes, given an optional seed value.
 *
 * <span class="informal">Combines together all values emitted on the source,
 * using an accumulator function that knows how to join a new source value into
 * the accumulation from the past.</span>
 *
 * <img src="./img/reduce.png" width="100%">
 *
 * Like
 * [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce),
 * `reduce` applies an `accumulator` function against an accumulation and each
 * value of the source Observable (from the past) to reduce it to a single
 * value, emitted on the output Observable. Note that `reduce` will only emit
 * one value, only when the source Observable completes. It is equivalent to
 * applying operator {@link scan} followed by operator {@link last}.
 *
 * Returns an Observable that applies a specified `accumulator` function to each
 * item emitted by the source Observable. If a `seed` value is specified, then
 * that value will be used as the initial value for the accumulator. If no seed
 * value is specified, the first item of the source is used as the seed.
 *
 * @example <caption>Count the number of click events that happened in 5 seconds</caption>
 * var clicksInFiveSeconds = Rx.Observable.fromEvent(document, 'click')
 *   .takeUntil(Rx.Observable.interval(5000));
 * var ones = clicksInFiveSeconds.mapTo(1);
 * var seed = 0;
 * var count = ones.reduce((acc, one) => acc + one, seed);
 * count.subscribe(x => console.log(x));
 *
 * @see {@link count}
 * @see {@link expand}
 * @see {@link mergeScan}
 * @see {@link scan}
 *
 * @param {function(acc: R, value: T, index: number): R} accumulator The accumulator function
 * called on each source value.
 * @param {R} [seed] The initial accumulation value.
 * @return {Observable<R>} An Observable that emits a single value that is the
 * result of accumulating the values emitted by the source Observable.
 * @method reduce
 * @owner Observable
 */
function reduce(accumulator, seed) {
    // providing a seed of `undefined` *should* be valid and trigger
    // hasSeed! so don't use `seed !== undefined` checks!
    // For this reason, we have to check it here at the original call site
    // otherwise inside Operator/Subscriber we won't know if `undefined`
    // means they didn't provide anything or if they literally provided `undefined`
    if (arguments.length >= 2) {
        return Object(__WEBPACK_IMPORTED_MODULE_0__operators_reduce__["a" /* reduce */])(accumulator, seed)(this);
    }
    return Object(__WEBPACK_IMPORTED_MODULE_0__operators_reduce__["a" /* reduce */])(accumulator)(this);
}
//# sourceMappingURL=reduce.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operator/share.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = share;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__operators_share__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/share.js");
/** PURE_IMPORTS_START .._operators_share PURE_IMPORTS_END */

/**
 * Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one
 * Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will
 * unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream `hot`.
 *
 * This behaves similarly to .publish().refCount(), with a behavior difference when the source observable emits complete.
 * .publish().refCount() will not resubscribe to the original source, however .share() will resubscribe to the original source.
 * Observable.of("test").publish().refCount() will not re-emit "test" on new subscriptions, Observable.of("test").share() will
 * re-emit "test" to new subscriptions.
 *
 * <img src="./img/share.png" width="100%">
 *
 * @return {Observable<T>} An Observable that upon connection causes the source Observable to emit items to its Observers.
 * @method share
 * @owner Observable
 */
function share() {
    return Object(__WEBPACK_IMPORTED_MODULE_0__operators_share__["a" /* share */])()(this);
}
;
//# sourceMappingURL=share.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/catchError.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = catchError;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__OuterSubscriber__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/OuterSubscriber.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_subscribeToResult__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/subscribeToResult.js");
/** PURE_IMPORTS_START .._OuterSubscriber,.._util_subscribeToResult PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/**
 * Catches errors on the observable to be handled by returning a new observable or throwing an error.
 *
 * <img src="./img/catch.png" width="100%">
 *
 * @example <caption>Continues with a different Observable when there's an error</caption>
 *
 * Observable.of(1, 2, 3, 4, 5)
 *   .map(n => {
 * 	   if (n == 4) {
 * 	     throw 'four!';
 *     }
 *	   return n;
 *   })
 *   .catch(err => Observable.of('I', 'II', 'III', 'IV', 'V'))
 *   .subscribe(x => console.log(x));
 *   // 1, 2, 3, I, II, III, IV, V
 *
 * @example <caption>Retries the caught source Observable again in case of error, similar to retry() operator</caption>
 *
 * Observable.of(1, 2, 3, 4, 5)
 *   .map(n => {
 * 	   if (n === 4) {
 * 	     throw 'four!';
 *     }
 * 	   return n;
 *   })
 *   .catch((err, caught) => caught)
 *   .take(30)
 *   .subscribe(x => console.log(x));
 *   // 1, 2, 3, 1, 2, 3, ...
 *
 * @example <caption>Throws a new error when the source Observable throws an error</caption>
 *
 * Observable.of(1, 2, 3, 4, 5)
 *   .map(n => {
 *     if (n == 4) {
 *       throw 'four!';
 *     }
 *     return n;
 *   })
 *   .catch(err => {
 *     throw 'error in source. Details: ' + err;
 *   })
 *   .subscribe(
 *     x => console.log(x),
 *     err => console.log(err)
 *   );
 *   // 1, 2, 3, error in source. Details: four!
 *
 * @param {function} selector a function that takes as arguments `err`, which is the error, and `caught`, which
 *  is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
 *  is returned by the `selector` will be used to continue the observable chain.
 * @return {Observable} An observable that originates from either the source or the observable returned by the
 *  catch `selector` function.
 * @name catchError
 */
function catchError(selector) {
    return function catchErrorOperatorFunction(source) {
        var operator = new CatchOperator(selector);
        var caught = source.lift(operator);
        return (operator.caught = caught);
    };
}
var CatchOperator = /*@__PURE__*/ (/*@__PURE__*/ function () {
    function CatchOperator(selector) {
        this.selector = selector;
    }
    CatchOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new CatchSubscriber(subscriber, this.selector, this.caught));
    };
    return CatchOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var CatchSubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(CatchSubscriber, _super);
    function CatchSubscriber(destination, selector, caught) {
        _super.call(this, destination);
        this.selector = selector;
        this.caught = caught;
    }
    // NOTE: overriding `error` instead of `_error` because we don't want
    // to have this flag this subscriber as `isStopped`. We can mimic the
    // behavior of the RetrySubscriber (from the `retry` operator), where
    // we unsubscribe from our source chain, reset our Subscriber flags,
    // then subscribe to the selector result.
    CatchSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var result = void 0;
            try {
                result = this.selector(err, this.caught);
            }
            catch (err2) {
                _super.prototype.error.call(this, err2);
                return;
            }
            this._unsubscribeAndRecycle();
            this.add(Object(__WEBPACK_IMPORTED_MODULE_1__util_subscribeToResult__["a" /* subscribeToResult */])(this, result));
        }
    };
    return CatchSubscriber;
}(__WEBPACK_IMPORTED_MODULE_0__OuterSubscriber__["a" /* OuterSubscriber */]));
//# sourceMappingURL=catchError.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/concatAll.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = concatAll;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mergeAll__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/mergeAll.js");
/** PURE_IMPORTS_START ._mergeAll PURE_IMPORTS_END */

/**
 * Converts a higher-order Observable into a first-order Observable by
 * concatenating the inner Observables in order.
 *
 * <span class="informal">Flattens an Observable-of-Observables by putting one
 * inner Observable after the other.</span>
 *
 * <img src="./img/concatAll.png" width="100%">
 *
 * Joins every Observable emitted by the source (a higher-order Observable), in
 * a serial fashion. It subscribes to each inner Observable only after the
 * previous inner Observable has completed, and merges all of their values into
 * the returned observable.
 *
 * __Warning:__ If the source Observable emits Observables quickly and
 * endlessly, and the inner Observables it emits generally complete slower than
 * the source emits, you can run into memory issues as the incoming Observables
 * collect in an unbounded buffer.
 *
 * Note: `concatAll` is equivalent to `mergeAll` with concurrency parameter set
 * to `1`.
 *
 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map(ev => Rx.Observable.interval(1000).take(4));
 * var firstOrder = higherOrder.concatAll();
 * firstOrder.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // (results are not concurrent)
 * // For every click on the "document" it will emit values 0 to 3 spaced
 * // on a 1000ms interval
 * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
 *
 * @see {@link combineAll}
 * @see {@link concat}
 * @see {@link concatMap}
 * @see {@link concatMapTo}
 * @see {@link exhaust}
 * @see {@link mergeAll}
 * @see {@link switch}
 * @see {@link zipAll}
 *
 * @return {Observable} An Observable emitting values from all the inner
 * Observables concatenated.
 * @method concatAll
 * @owner Observable
 */
function concatAll() {
    return Object(__WEBPACK_IMPORTED_MODULE_0__mergeAll__["a" /* mergeAll */])(1);
}
//# sourceMappingURL=concatAll.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/concatMap.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = concatMap;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mergeMap__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/mergeMap.js");
/** PURE_IMPORTS_START ._mergeMap PURE_IMPORTS_END */

/* tslint:enable:max-line-length */
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable, in a serialized fashion waiting for each one to complete before
 * merging the next.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link concatAll}.</span>
 *
 * <img src="./img/concatMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an (so-called "inner") Observable. Each new inner Observable is
 * concatenated with the previous inner Observable.
 *
 * __Warning:__ if source values arrive endlessly and faster than their
 * corresponding inner Observables can complete, it will result in memory issues
 * as inner Observables amass in an unbounded buffer waiting for their turn to
 * be subscribed to.
 *
 * Note: `concatMap` is equivalent to `mergeMap` with concurrency parameter set
 * to `1`.
 *
 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.concatMap(ev => Rx.Observable.interval(1000).take(4));
 * result.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // (results are not concurrent)
 * // For every click on the "document" it will emit values 0 to 3 spaced
 * // on a 1000ms interval
 * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
 *
 * @see {@link concat}
 * @see {@link concatAll}
 * @see {@link concatMapTo}
 * @see {@link exhaustMap}
 * @see {@link mergeMap}
 * @see {@link switchMap}
 *
 * @param {function(value: T, ?index: number): ObservableInput} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and taking values from each projected inner
 * Observable sequentially.
 * @method concatMap
 * @owner Observable
 */
function concatMap(project, resultSelector) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__mergeMap__["a" /* mergeMap */])(project, resultSelector, 1);
}
//# sourceMappingURL=concatMap.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/defaultIfEmpty.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = defaultIfEmpty;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subscriber__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Subscriber.js");
/** PURE_IMPORTS_START .._Subscriber PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/* tslint:enable:max-line-length */
/**
 * Emits a given value if the source Observable completes without emitting any
 * `next` value, otherwise mirrors the source Observable.
 *
 * <span class="informal">If the source Observable turns out to be empty, then
 * this operator will emit a default value.</span>
 *
 * <img src="./img/defaultIfEmpty.png" width="100%">
 *
 * `defaultIfEmpty` emits the values emitted by the source Observable or a
 * specified default value if the source Observable is empty (completes without
 * having emitted any `next` value).
 *
 * @example <caption>If no clicks happen in 5 seconds, then emit "no clicks"</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var clicksBeforeFive = clicks.takeUntil(Rx.Observable.interval(5000));
 * var result = clicksBeforeFive.defaultIfEmpty('no clicks');
 * result.subscribe(x => console.log(x));
 *
 * @see {@link empty}
 * @see {@link last}
 *
 * @param {any} [defaultValue=null] The default value used if the source
 * Observable is empty.
 * @return {Observable} An Observable that emits either the specified
 * `defaultValue` if the source Observable emits no items, or the values emitted
 * by the source Observable.
 * @method defaultIfEmpty
 * @owner Observable
 */
function defaultIfEmpty(defaultValue) {
    if (defaultValue === void 0) {
        defaultValue = null;
    }
    return function (source) { return source.lift(new DefaultIfEmptyOperator(defaultValue)); };
}
var DefaultIfEmptyOperator = /*@__PURE__*/ (/*@__PURE__*/ function () {
    function DefaultIfEmptyOperator(defaultValue) {
        this.defaultValue = defaultValue;
    }
    DefaultIfEmptyOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new DefaultIfEmptySubscriber(subscriber, this.defaultValue));
    };
    return DefaultIfEmptyOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DefaultIfEmptySubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(DefaultIfEmptySubscriber, _super);
    function DefaultIfEmptySubscriber(destination, defaultValue) {
        _super.call(this, destination);
        this.defaultValue = defaultValue;
        this.isEmpty = true;
    }
    DefaultIfEmptySubscriber.prototype._next = function (value) {
        this.isEmpty = false;
        this.destination.next(value);
    };
    DefaultIfEmptySubscriber.prototype._complete = function () {
        if (this.isEmpty) {
            this.destination.next(this.defaultValue);
        }
        this.destination.complete();
    };
    return DefaultIfEmptySubscriber;
}(__WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */]));
//# sourceMappingURL=defaultIfEmpty.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/every.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = every;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subscriber__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Subscriber.js");
/** PURE_IMPORTS_START .._Subscriber PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * Returns an Observable that emits whether or not every item of the source satisfies the condition specified.
 *
 * @example <caption>A simple example emitting true if all elements are less than 5, false otherwise</caption>
 *  Observable.of(1, 2, 3, 4, 5, 6)
 *     .every(x => x < 5)
 *     .subscribe(x => console.log(x)); // -> false
 *
 * @param {function} predicate A function for determining if an item meets a specified condition.
 * @param {any} [thisArg] Optional object to use for `this` in the callback.
 * @return {Observable} An Observable of booleans that determines if all items of the source Observable meet the condition specified.
 * @method every
 * @owner Observable
 */
function every(predicate, thisArg) {
    return function (source) { return source.lift(new EveryOperator(predicate, thisArg, source)); };
}
var EveryOperator = /*@__PURE__*/ (/*@__PURE__*/ function () {
    function EveryOperator(predicate, thisArg, source) {
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
    }
    EveryOperator.prototype.call = function (observer, source) {
        return source.subscribe(new EverySubscriber(observer, this.predicate, this.thisArg, this.source));
    };
    return EveryOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var EverySubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(EverySubscriber, _super);
    function EverySubscriber(destination, predicate, thisArg, source) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
        this.index = 0;
        this.thisArg = thisArg || this;
    }
    EverySubscriber.prototype.notifyComplete = function (everyValueMatch) {
        this.destination.next(everyValueMatch);
        this.destination.complete();
    };
    EverySubscriber.prototype._next = function (value) {
        var result = false;
        try {
            result = this.predicate.call(this.thisArg, value, this.index++, this.source);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (!result) {
            this.notifyComplete(false);
        }
    };
    EverySubscriber.prototype._complete = function () {
        this.notifyComplete(true);
    };
    return EverySubscriber;
}(__WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */]));
//# sourceMappingURL=every.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/filter.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = filter;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subscriber__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Subscriber.js");
/** PURE_IMPORTS_START .._Subscriber PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/* tslint:enable:max-line-length */
/**
 * Filter items emitted by the source Observable by only emitting those that
 * satisfy a specified predicate.
 *
 * <span class="informal">Like
 * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
 * it only emits a value from the source if it passes a criterion function.</span>
 *
 * <img src="./img/filter.png" width="100%">
 *
 * Similar to the well-known `Array.prototype.filter` method, this operator
 * takes values from the source Observable, passes them through a `predicate`
 * function and only emits those values that yielded `true`.
 *
 * @example <caption>Emit only click events whose target was a DIV element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
 * clicksOnDivs.subscribe(x => console.log(x));
 *
 * @see {@link distinct}
 * @see {@link distinctUntilChanged}
 * @see {@link distinctUntilKeyChanged}
 * @see {@link ignoreElements}
 * @see {@link partition}
 * @see {@link skip}
 *
 * @param {function(value: T, index: number): boolean} predicate A function that
 * evaluates each value emitted by the source Observable. If it returns `true`,
 * the value is emitted, if `false` the value is not passed to the output
 * Observable. The `index` parameter is the number `i` for the i-th source
 * emission that has happened since the subscription, starting from the number
 * `0`.
 * @param {any} [thisArg] An optional argument to determine the value of `this`
 * in the `predicate` function.
 * @return {Observable} An Observable of values from the source that were
 * allowed by the `predicate` function.
 * @method filter
 * @owner Observable
 */
function filter(predicate, thisArg) {
    return function filterOperatorFunction(source) {
        return source.lift(new FilterOperator(predicate, thisArg));
    };
}
var FilterOperator = /*@__PURE__*/ (/*@__PURE__*/ function () {
    function FilterOperator(predicate, thisArg) {
        this.predicate = predicate;
        this.thisArg = thisArg;
    }
    FilterOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
    };
    return FilterOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var FilterSubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(FilterSubscriber, _super);
    function FilterSubscriber(destination, predicate, thisArg) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.count = 0;
    }
    // the try catch block below is left specifically for
    // optimization and perf reasons. a tryCatcher is not necessary here.
    FilterSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.predicate.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.destination.next(value);
        }
    };
    return FilterSubscriber;
}(__WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */]));
//# sourceMappingURL=filter.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/first.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = first;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subscriber__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Subscriber.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_EmptyError__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/EmptyError.js");
/** PURE_IMPORTS_START .._Subscriber,.._util_EmptyError PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/**
 * Emits only the first value (or the first value that meets some condition)
 * emitted by the source Observable.
 *
 * <span class="informal">Emits only the first value. Or emits only the first
 * value that passes some test.</span>
 *
 * <img src="./img/first.png" width="100%">
 *
 * If called with no arguments, `first` emits the first value of the source
 * Observable, then completes. If called with a `predicate` function, `first`
 * emits the first value of the source that matches the specified condition. It
 * may also take a `resultSelector` function to produce the output value from
 * the input value, and a `defaultValue` to emit in case the source completes
 * before it is able to emit a valid value. Throws an error if `defaultValue`
 * was not provided and a matching element is not found.
 *
 * @example <caption>Emit only the first click that happens on the DOM</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.first();
 * result.subscribe(x => console.log(x));
 *
 * @example <caption>Emits the first click that happens on a DIV</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.first(ev => ev.target.tagName === 'DIV');
 * result.subscribe(x => console.log(x));
 *
 * @see {@link filter}
 * @see {@link find}
 * @see {@link take}
 *
 * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
 * callback if the Observable completes before any `next` notification was sent.
 *
 * @param {function(value: T, index: number, source: Observable<T>): boolean} [predicate]
 * An optional function called with each item to test for condition matching.
 * @param {function(value: T, index: number): R} [resultSelector] A function to
 * produce the value on the output Observable based on the values
 * and the indices of the source Observable. The arguments passed to this
 * function are:
 * - `value`: the value that was emitted on the source.
 * - `index`: the "index" of the value from the source.
 * @param {R} [defaultValue] The default value emitted in case no valid value
 * was found on the source.
 * @return {Observable<T|R>} An Observable of the first item that matches the
 * condition.
 * @method first
 * @owner Observable
 */
function first(predicate, resultSelector, defaultValue) {
    return function (source) { return source.lift(new FirstOperator(predicate, resultSelector, defaultValue, source)); };
}
var FirstOperator = /*@__PURE__*/ (/*@__PURE__*/ function () {
    function FirstOperator(predicate, resultSelector, defaultValue, source) {
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
    }
    FirstOperator.prototype.call = function (observer, source) {
        return source.subscribe(new FirstSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));
    };
    return FirstOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var FirstSubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(FirstSubscriber, _super);
    function FirstSubscriber(destination, predicate, resultSelector, defaultValue, source) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
        this.index = 0;
        this.hasCompleted = false;
        this._emitted = false;
    }
    FirstSubscriber.prototype._next = function (value) {
        var index = this.index++;
        if (this.predicate) {
            this._tryPredicate(value, index);
        }
        else {
            this._emit(value, index);
        }
    };
    FirstSubscriber.prototype._tryPredicate = function (value, index) {
        var result;
        try {
            result = this.predicate(value, index, this.source);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this._emit(value, index);
        }
    };
    FirstSubscriber.prototype._emit = function (value, index) {
        if (this.resultSelector) {
            this._tryResultSelector(value, index);
            return;
        }
        this._emitFinal(value);
    };
    FirstSubscriber.prototype._tryResultSelector = function (value, index) {
        var result;
        try {
            result = this.resultSelector(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this._emitFinal(result);
    };
    FirstSubscriber.prototype._emitFinal = function (value) {
        var destination = this.destination;
        if (!this._emitted) {
            this._emitted = true;
            destination.next(value);
            destination.complete();
            this.hasCompleted = true;
        }
    };
    FirstSubscriber.prototype._complete = function () {
        var destination = this.destination;
        if (!this.hasCompleted && typeof this.defaultValue !== 'undefined') {
            destination.next(this.defaultValue);
            destination.complete();
        }
        else if (!this.hasCompleted) {
            destination.error(new __WEBPACK_IMPORTED_MODULE_1__util_EmptyError__["a" /* EmptyError */]);
        }
    };
    return FirstSubscriber;
}(__WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */]));
//# sourceMappingURL=first.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/last.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = last;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subscriber__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Subscriber.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_EmptyError__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/EmptyError.js");
/** PURE_IMPORTS_START .._Subscriber,.._util_EmptyError PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/* tslint:enable:max-line-length */
/**
 * Returns an Observable that emits only the last item emitted by the source Observable.
 * It optionally takes a predicate function as a parameter, in which case, rather than emitting
 * the last item from the source Observable, the resulting Observable will emit the last item
 * from the source Observable that satisfies the predicate.
 *
 * <img src="./img/last.png" width="100%">
 *
 * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
 * callback if the Observable completes before any `next` notification was sent.
 * @param {function} predicate - The condition any source emitted item has to satisfy.
 * @return {Observable} An Observable that emits only the last item satisfying the given condition
 * from the source, or an NoSuchElementException if no such items are emitted.
 * @throws - Throws if no items that match the predicate are emitted by the source Observable.
 * @method last
 * @owner Observable
 */
function last(predicate, resultSelector, defaultValue) {
    return function (source) { return source.lift(new LastOperator(predicate, resultSelector, defaultValue, source)); };
}
var LastOperator = /*@__PURE__*/ (/*@__PURE__*/ function () {
    function LastOperator(predicate, resultSelector, defaultValue, source) {
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
    }
    LastOperator.prototype.call = function (observer, source) {
        return source.subscribe(new LastSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));
    };
    return LastOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var LastSubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(LastSubscriber, _super);
    function LastSubscriber(destination, predicate, resultSelector, defaultValue, source) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
        this.hasValue = false;
        this.index = 0;
        if (typeof defaultValue !== 'undefined') {
            this.lastValue = defaultValue;
            this.hasValue = true;
        }
    }
    LastSubscriber.prototype._next = function (value) {
        var index = this.index++;
        if (this.predicate) {
            this._tryPredicate(value, index);
        }
        else {
            if (this.resultSelector) {
                this._tryResultSelector(value, index);
                return;
            }
            this.lastValue = value;
            this.hasValue = true;
        }
    };
    LastSubscriber.prototype._tryPredicate = function (value, index) {
        var result;
        try {
            result = this.predicate(value, index, this.source);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            if (this.resultSelector) {
                this._tryResultSelector(value, index);
                return;
            }
            this.lastValue = value;
            this.hasValue = true;
        }
    };
    LastSubscriber.prototype._tryResultSelector = function (value, index) {
        var result;
        try {
            result = this.resultSelector(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.lastValue = result;
        this.hasValue = true;
    };
    LastSubscriber.prototype._complete = function () {
        var destination = this.destination;
        if (this.hasValue) {
            destination.next(this.lastValue);
            destination.complete();
        }
        else {
            destination.error(new __WEBPACK_IMPORTED_MODULE_1__util_EmptyError__["a" /* EmptyError */]);
        }
    };
    return LastSubscriber;
}(__WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */]));
//# sourceMappingURL=last.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/map.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = map;
/* unused harmony export MapOperator */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subscriber__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Subscriber.js");
/** PURE_IMPORTS_START .._Subscriber PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * Applies a given `project` function to each value emitted by the source
 * Observable, and emits the resulting values as an Observable.
 *
 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
 * it passes each source value through a transformation function to get
 * corresponding output values.</span>
 *
 * <img src="./img/map.png" width="100%">
 *
 * Similar to the well known `Array.prototype.map` function, this operator
 * applies a projection to each value and emits that projection in the output
 * Observable.
 *
 * @example <caption>Map every click to the clientX position of that click</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks.map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link mapTo}
 * @see {@link pluck}
 *
 * @param {function(value: T, index: number): R} project The function to apply
 * to each `value` emitted by the source Observable. The `index` parameter is
 * the number `i` for the i-th emission that has happened since the
 * subscription, starting from the number `0`.
 * @param {any} [thisArg] An optional argument to define what `this` is in the
 * `project` function.
 * @return {Observable<R>} An Observable that emits the values from the source
 * Observable transformed by the given `project` function.
 * @method map
 * @owner Observable
 */
function map(project, thisArg) {
    return function mapOperation(source) {
        if (typeof project !== 'function') {
            throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
        }
        return source.lift(new MapOperator(project, thisArg));
    };
}
var MapOperator = /*@__PURE__*/ (/*@__PURE__*/ function () {
    function MapOperator(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
    }
    MapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
    };
    return MapOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MapSubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(MapSubscriber, _super);
    function MapSubscriber(destination, project, thisArg) {
        _super.call(this, destination);
        this.project = project;
        this.count = 0;
        this.thisArg = thisArg || this;
    }
    // NOTE: This looks unoptimized, but it's actually purposefully NOT
    // using try/catch optimizations.
    MapSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.project.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return MapSubscriber;
}(__WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */]));
//# sourceMappingURL=map.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/merge.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = merge;
/* harmony export (immutable) */ __webpack_exports__["b"] = mergeStatic;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__observable_ArrayObservable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/ArrayObservable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mergeAll__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/mergeAll.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_isScheduler__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/isScheduler.js");
/** PURE_IMPORTS_START .._Observable,.._observable_ArrayObservable,._mergeAll,.._util_isScheduler PURE_IMPORTS_END */




/* tslint:enable:max-line-length */
function merge() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    return function (source) { return source.lift.call(mergeStatic.apply(void 0, [source].concat(observables))); };
}
/* tslint:enable:max-line-length */
/**
 * Creates an output Observable which concurrently emits all values from every
 * given input Observable.
 *
 * <span class="informal">Flattens multiple Observables together by blending
 * their values into one Observable.</span>
 *
 * <img src="./img/merge.png" width="100%">
 *
 * `merge` subscribes to each given input Observable (as arguments), and simply
 * forwards (without doing any transformation) all the values from all the input
 * Observables to the output Observable. The output Observable only completes
 * once all input Observables have completed. Any error delivered by an input
 * Observable will be immediately emitted on the output Observable.
 *
 * @example <caption>Merge together two Observables: 1s interval and clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var clicksOrTimer = Rx.Observable.merge(clicks, timer);
 * clicksOrTimer.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // timer will emit ascending values, one every second(1000ms) to console
 * // clicks logs MouseEvents to console everytime the "document" is clicked
 * // Since the two streams are merged you see these happening
 * // as they occur.
 *
 * @example <caption>Merge together 3 Observables, but only 2 run concurrently</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var concurrent = 2; // the argument
 * var merged = Rx.Observable.merge(timer1, timer2, timer3, concurrent);
 * merged.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // - First timer1 and timer2 will run concurrently
 * // - timer1 will emit a value every 1000ms for 10 iterations
 * // - timer2 will emit a value every 2000ms for 6 iterations
 * // - after timer1 hits it's max iteration, timer2 will
 * //   continue, and timer3 will start to run concurrently with timer2
 * // - when timer2 hits it's max iteration it terminates, and
 * //   timer3 will continue to emit a value every 500ms until it is complete
 *
 * @see {@link mergeAll}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 *
 * @param {...ObservableInput} observables Input Observables to merge together.
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @param {Scheduler} [scheduler=null] The IScheduler to use for managing
 * concurrency of input Observables.
 * @return {Observable} an Observable that emits items that are the result of
 * every input Observable.
 * @static true
 * @name merge
 * @owner Observable
 */
function mergeStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    var concurrent = Number.POSITIVE_INFINITY;
    var scheduler = null;
    var last = observables[observables.length - 1];
    if (Object(__WEBPACK_IMPORTED_MODULE_3__util_isScheduler__["a" /* isScheduler */])(last)) {
        scheduler = observables.pop();
        if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
            concurrent = observables.pop();
        }
    }
    else if (typeof last === 'number') {
        concurrent = observables.pop();
    }
    if (scheduler === null && observables.length === 1 && observables[0] instanceof __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */]) {
        return observables[0];
    }
    return Object(__WEBPACK_IMPORTED_MODULE_2__mergeAll__["a" /* mergeAll */])(concurrent)(new __WEBPACK_IMPORTED_MODULE_1__observable_ArrayObservable__["a" /* ArrayObservable */](observables, scheduler));
}
//# sourceMappingURL=merge.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/mergeAll.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = mergeAll;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mergeMap__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/mergeMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_identity__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/identity.js");
/** PURE_IMPORTS_START ._mergeMap,.._util_identity PURE_IMPORTS_END */


/**
 * Converts a higher-order Observable into a first-order Observable which
 * concurrently delivers all values that are emitted on the inner Observables.
 *
 * <span class="informal">Flattens an Observable-of-Observables.</span>
 *
 * <img src="./img/mergeAll.png" width="100%">
 *
 * `mergeAll` subscribes to an Observable that emits Observables, also known as
 * a higher-order Observable. Each time it observes one of these emitted inner
 * Observables, it subscribes to that and delivers all the values from the
 * inner Observable on the output Observable. The output Observable only
 * completes once all inner Observables have completed. Any error delivered by
 * a inner Observable will be immediately emitted on the output Observable.
 *
 * @example <caption>Spawn a new interval Observable for each click event, and blend their outputs as one Observable</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
 * var firstOrder = higherOrder.mergeAll();
 * firstOrder.subscribe(x => console.log(x));
 *
 * @example <caption>Count from 0 to 9 every second for each click, but only allow 2 concurrent timers</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000).take(10));
 * var firstOrder = higherOrder.mergeAll(2);
 * firstOrder.subscribe(x => console.log(x));
 *
 * @see {@link combineAll}
 * @see {@link concatAll}
 * @see {@link exhaust}
 * @see {@link merge}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 * @see {@link switch}
 * @see {@link zipAll}
 *
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of inner
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits values coming from all the
 * inner Observables emitted by the source Observable.
 * @method mergeAll
 * @owner Observable
 */
function mergeAll(concurrent) {
    if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
    }
    return Object(__WEBPACK_IMPORTED_MODULE_0__mergeMap__["a" /* mergeMap */])(__WEBPACK_IMPORTED_MODULE_1__util_identity__["a" /* identity */], null, concurrent);
}
//# sourceMappingURL=mergeAll.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/mergeMap.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = mergeMap;
/* unused harmony export MergeMapOperator */
/* unused harmony export MergeMapSubscriber */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_subscribeToResult__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/subscribeToResult.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__OuterSubscriber__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/OuterSubscriber.js");
/** PURE_IMPORTS_START .._util_subscribeToResult,.._OuterSubscriber PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/* tslint:enable:max-line-length */
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link mergeAll}.</span>
 *
 * <img src="./img/mergeMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an Observable, and then merging those resulting Observables and
 * emitting the results of this merger.
 *
 * @example <caption>Map and flatten each letter to an Observable ticking every 1 second</caption>
 * var letters = Rx.Observable.of('a', 'b', 'c');
 * var result = letters.mergeMap(x =>
 *   Rx.Observable.interval(1000).map(i => x+i)
 * );
 * result.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // a0
 * // b0
 * // c0
 * // a1
 * // b1
 * // c1
 * // continues to list a,b,c with respective ascending integers
 *
 * @see {@link concatMap}
 * @see {@link exhaustMap}
 * @see {@link merge}
 * @see {@link mergeAll}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 * @see {@link switchMap}
 *
 * @param {function(value: T, ?index: number): ObservableInput} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and merging the results of the Observables obtained
 * from this transformation.
 * @method mergeMap
 * @owner Observable
 */
function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
    }
    return function mergeMapOperatorFunction(source) {
        if (typeof resultSelector === 'number') {
            concurrent = resultSelector;
            resultSelector = null;
        }
        return source.lift(new MergeMapOperator(project, resultSelector, concurrent));
    };
}
var MergeMapOperator = /*@__PURE__*/ (/*@__PURE__*/ function () {
    function MergeMapOperator(project, resultSelector, concurrent) {
        if (concurrent === void 0) {
            concurrent = Number.POSITIVE_INFINITY;
        }
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
    }
    MergeMapOperator.prototype.call = function (observer, source) {
        return source.subscribe(new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent));
    };
    return MergeMapOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MergeMapSubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(MergeMapSubscriber, _super);
    function MergeMapSubscriber(destination, project, resultSelector, concurrent) {
        if (concurrent === void 0) {
            concurrent = Number.POSITIVE_INFINITY;
        }
        _super.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
        this.index = 0;
    }
    MergeMapSubscriber.prototype._next = function (value) {
        if (this.active < this.concurrent) {
            this._tryNext(value);
        }
        else {
            this.buffer.push(value);
        }
    };
    MergeMapSubscriber.prototype._tryNext = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.active++;
        this._innerSub(result, value, index);
    };
    MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
        this.add(Object(__WEBPACK_IMPORTED_MODULE_0__util_subscribeToResult__["a" /* subscribeToResult */])(this, ish, value, index));
    };
    MergeMapSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };
    MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (this.resultSelector) {
            this._notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            this.destination.next(innerValue);
        }
    };
    MergeMapSubscriber.prototype._notifyResultSelector = function (outerValue, innerValue, outerIndex, innerIndex) {
        var result;
        try {
            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };
    return MergeMapSubscriber;
}(__WEBPACK_IMPORTED_MODULE_1__OuterSubscriber__["a" /* OuterSubscriber */]));
//# sourceMappingURL=mergeMap.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/multicast.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = multicast;
/* unused harmony export MulticastOperator */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__observable_ConnectableObservable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/ConnectableObservable.js");
/** PURE_IMPORTS_START .._observable_ConnectableObservable PURE_IMPORTS_END */

/* tslint:enable:max-line-length */
/**
 * Returns an Observable that emits the results of invoking a specified selector on items
 * emitted by a ConnectableObservable that shares a single subscription to the underlying stream.
 *
 * <img src="./img/multicast.png" width="100%">
 *
 * @param {Function|Subject} subjectOrSubjectFactory - Factory function to create an intermediate subject through
 * which the source sequence's elements will be multicast to the selector function
 * or Subject to push source elements into.
 * @param {Function} [selector] - Optional selector function that can use the multicasted source stream
 * as many times as needed, without causing multiple subscriptions to the source stream.
 * Subscribers to the given source will receive all notifications of the source from the
 * time of the subscription forward.
 * @return {Observable} An Observable that emits the results of invoking the selector
 * on the items emitted by a `ConnectableObservable` that shares a single subscription to
 * the underlying stream.
 * @method multicast
 * @owner Observable
 */
function multicast(subjectOrSubjectFactory, selector) {
    return function multicastOperatorFunction(source) {
        var subjectFactory;
        if (typeof subjectOrSubjectFactory === 'function') {
            subjectFactory = subjectOrSubjectFactory;
        }
        else {
            subjectFactory = function subjectFactory() {
                return subjectOrSubjectFactory;
            };
        }
        if (typeof selector === 'function') {
            return source.lift(new MulticastOperator(subjectFactory, selector));
        }
        var connectable = Object.create(source, __WEBPACK_IMPORTED_MODULE_0__observable_ConnectableObservable__["a" /* connectableObservableDescriptor */]);
        connectable.source = source;
        connectable.subjectFactory = subjectFactory;
        return connectable;
    };
}
var MulticastOperator = /*@__PURE__*/ (/*@__PURE__*/ function () {
    function MulticastOperator(subjectFactory, selector) {
        this.subjectFactory = subjectFactory;
        this.selector = selector;
    }
    MulticastOperator.prototype.call = function (subscriber, source) {
        var selector = this.selector;
        var subject = this.subjectFactory();
        var subscription = selector(subject).subscribe(subscriber);
        subscription.add(source.subscribe(subject));
        return subscription;
    };
    return MulticastOperator;
}());
//# sourceMappingURL=multicast.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/observeOn.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export observeOn */
/* unused harmony export ObserveOnOperator */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObserveOnSubscriber; });
/* unused harmony export ObserveOnMessage */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subscriber__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Subscriber.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Notification__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Notification.js");
/** PURE_IMPORTS_START .._Subscriber,.._Notification PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/**
 *
 * Re-emits all notifications from source Observable with specified scheduler.
 *
 * <span class="informal">Ensure a specific scheduler is used, from outside of an Observable.</span>
 *
 * `observeOn` is an operator that accepts a scheduler as a first parameter, which will be used to reschedule
 * notifications emitted by the source Observable. It might be useful, if you do not have control over
 * internal scheduler of a given Observable, but want to control when its values are emitted nevertheless.
 *
 * Returned Observable emits the same notifications (nexted values, complete and error events) as the source Observable,
 * but rescheduled with provided scheduler. Note that this doesn't mean that source Observables internal
 * scheduler will be replaced in any way. Original scheduler still will be used, but when the source Observable emits
 * notification, it will be immediately scheduled again - this time with scheduler passed to `observeOn`.
 * An anti-pattern would be calling `observeOn` on Observable that emits lots of values synchronously, to split
 * that emissions into asynchronous chunks. For this to happen, scheduler would have to be passed into the source
 * Observable directly (usually into the operator that creates it). `observeOn` simply delays notifications a
 * little bit more, to ensure that they are emitted at expected moments.
 *
 * As a matter of fact, `observeOn` accepts second parameter, which specifies in milliseconds with what delay notifications
 * will be emitted. The main difference between {@link delay} operator and `observeOn` is that `observeOn`
 * will delay all notifications - including error notifications - while `delay` will pass through error
 * from source Observable immediately when it is emitted. In general it is highly recommended to use `delay` operator
 * for any kind of delaying of values in the stream, while using `observeOn` to specify which scheduler should be used
 * for notification emissions in general.
 *
 * @example <caption>Ensure values in subscribe are called just before browser repaint.</caption>
 * const intervals = Rx.Observable.interval(10); // Intervals are scheduled
 *                                               // with async scheduler by default...
 *
 * intervals
 * .observeOn(Rx.Scheduler.animationFrame)       // ...but we will observe on animationFrame
 * .subscribe(val => {                           // scheduler to ensure smooth animation.
 *   someDiv.style.height = val + 'px';
 * });
 *
 * @see {@link delay}
 *
 * @param {IScheduler} scheduler Scheduler that will be used to reschedule notifications from source Observable.
 * @param {number} [delay] Number of milliseconds that states with what delay every notification should be rescheduled.
 * @return {Observable<T>} Observable that emits the same notifications as the source Observable,
 * but with provided scheduler.
 *
 * @method observeOn
 * @owner Observable
 */
function observeOn(scheduler, delay) {
    if (delay === void 0) {
        delay = 0;
    }
    return function observeOnOperatorFunction(source) {
        return source.lift(new ObserveOnOperator(scheduler, delay));
    };
}
var ObserveOnOperator = /*@__PURE__*/ (/*@__PURE__*/ function () {
    function ObserveOnOperator(scheduler, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        this.scheduler = scheduler;
        this.delay = delay;
    }
    ObserveOnOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
    };
    return ObserveOnOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ObserveOnSubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(ObserveOnSubscriber, _super);
    function ObserveOnSubscriber(destination, scheduler, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        _super.call(this, destination);
        this.scheduler = scheduler;
        this.delay = delay;
    }
    ObserveOnSubscriber.dispatch = function (arg) {
        var notification = arg.notification, destination = arg.destination;
        notification.observe(destination);
        this.unsubscribe();
    };
    ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
        this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
    };
    ObserveOnSubscriber.prototype._next = function (value) {
        this.scheduleMessage(__WEBPACK_IMPORTED_MODULE_1__Notification__["a" /* Notification */].createNext(value));
    };
    ObserveOnSubscriber.prototype._error = function (err) {
        this.scheduleMessage(__WEBPACK_IMPORTED_MODULE_1__Notification__["a" /* Notification */].createError(err));
    };
    ObserveOnSubscriber.prototype._complete = function () {
        this.scheduleMessage(__WEBPACK_IMPORTED_MODULE_1__Notification__["a" /* Notification */].createComplete());
    };
    return ObserveOnSubscriber;
}(__WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */]));
var ObserveOnMessage = /*@__PURE__*/ (/*@__PURE__*/ function () {
    function ObserveOnMessage(notification, destination) {
        this.notification = notification;
        this.destination = destination;
    }
    return ObserveOnMessage;
}());
//# sourceMappingURL=observeOn.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/reduce.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = reduce;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scan__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/scan.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__takeLast__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/takeLast.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__defaultIfEmpty__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/defaultIfEmpty.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_pipe__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/pipe.js");
/** PURE_IMPORTS_START ._scan,._takeLast,._defaultIfEmpty,.._util_pipe PURE_IMPORTS_END */




/* tslint:enable:max-line-length */
/**
 * Applies an accumulator function over the source Observable, and returns the
 * accumulated result when the source completes, given an optional seed value.
 *
 * <span class="informal">Combines together all values emitted on the source,
 * using an accumulator function that knows how to join a new source value into
 * the accumulation from the past.</span>
 *
 * <img src="./img/reduce.png" width="100%">
 *
 * Like
 * [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce),
 * `reduce` applies an `accumulator` function against an accumulation and each
 * value of the source Observable (from the past) to reduce it to a single
 * value, emitted on the output Observable. Note that `reduce` will only emit
 * one value, only when the source Observable completes. It is equivalent to
 * applying operator {@link scan} followed by operator {@link last}.
 *
 * Returns an Observable that applies a specified `accumulator` function to each
 * item emitted by the source Observable. If a `seed` value is specified, then
 * that value will be used as the initial value for the accumulator. If no seed
 * value is specified, the first item of the source is used as the seed.
 *
 * @example <caption>Count the number of click events that happened in 5 seconds</caption>
 * var clicksInFiveSeconds = Rx.Observable.fromEvent(document, 'click')
 *   .takeUntil(Rx.Observable.interval(5000));
 * var ones = clicksInFiveSeconds.mapTo(1);
 * var seed = 0;
 * var count = ones.reduce((acc, one) => acc + one, seed);
 * count.subscribe(x => console.log(x));
 *
 * @see {@link count}
 * @see {@link expand}
 * @see {@link mergeScan}
 * @see {@link scan}
 *
 * @param {function(acc: R, value: T, index: number): R} accumulator The accumulator function
 * called on each source value.
 * @param {R} [seed] The initial accumulation value.
 * @return {Observable<R>} An Observable that emits a single value that is the
 * result of accumulating the values emitted by the source Observable.
 * @method reduce
 * @owner Observable
 */
function reduce(accumulator, seed) {
    // providing a seed of `undefined` *should* be valid and trigger
    // hasSeed! so don't use `seed !== undefined` checks!
    // For this reason, we have to check it here at the original call site
    // otherwise inside Operator/Subscriber we won't know if `undefined`
    // means they didn't provide anything or if they literally provided `undefined`
    if (arguments.length >= 2) {
        return function reduceOperatorFunctionWithSeed(source) {
            return Object(__WEBPACK_IMPORTED_MODULE_3__util_pipe__["a" /* pipe */])(Object(__WEBPACK_IMPORTED_MODULE_0__scan__["a" /* scan */])(accumulator, seed), Object(__WEBPACK_IMPORTED_MODULE_1__takeLast__["a" /* takeLast */])(1), Object(__WEBPACK_IMPORTED_MODULE_2__defaultIfEmpty__["a" /* defaultIfEmpty */])(seed))(source);
        };
    }
    return function reduceOperatorFunction(source) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__util_pipe__["a" /* pipe */])(Object(__WEBPACK_IMPORTED_MODULE_0__scan__["a" /* scan */])(function (acc, value, index) {
            return accumulator(acc, value, index + 1);
        }), Object(__WEBPACK_IMPORTED_MODULE_1__takeLast__["a" /* takeLast */])(1))(source);
    };
}
//# sourceMappingURL=reduce.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/refCount.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = refCount;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subscriber__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Subscriber.js");
/** PURE_IMPORTS_START .._Subscriber PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

function refCount() {
    return function refCountOperatorFunction(source) {
        return source.lift(new RefCountOperator(source));
    };
}
var RefCountOperator = /*@__PURE__*/ (/*@__PURE__*/ function () {
    function RefCountOperator(connectable) {
        this.connectable = connectable;
    }
    RefCountOperator.prototype.call = function (subscriber, source) {
        var connectable = this.connectable;
        connectable._refCount++;
        var refCounter = new RefCountSubscriber(subscriber, connectable);
        var subscription = source.subscribe(refCounter);
        if (!refCounter.closed) {
            refCounter.connection = connectable.connect();
        }
        return subscription;
    };
    return RefCountOperator;
}());
var RefCountSubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(RefCountSubscriber, _super);
    function RefCountSubscriber(destination, connectable) {
        _super.call(this, destination);
        this.connectable = connectable;
    }
    RefCountSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (!connectable) {
            this.connection = null;
            return;
        }
        this.connectable = null;
        var refCount = connectable._refCount;
        if (refCount <= 0) {
            this.connection = null;
            return;
        }
        connectable._refCount = refCount - 1;
        if (refCount > 1) {
            this.connection = null;
            return;
        }
        ///
        // Compare the local RefCountSubscriber's connection Subscription to the
        // connection Subscription on the shared ConnectableObservable. In cases
        // where the ConnectableObservable source synchronously emits values, and
        // the RefCountSubscriber's downstream Observers synchronously unsubscribe,
        // execution continues to here before the RefCountOperator has a chance to
        // supply the RefCountSubscriber with the shared connection Subscription.
        // For example:
        // ```
        // Observable.range(0, 10)
        //   .publish()
        //   .refCount()
        //   .take(5)
        //   .subscribe();
        // ```
        // In order to account for this case, RefCountSubscriber should only dispose
        // the ConnectableObservable's shared connection Subscription if the
        // connection Subscription exists, *and* either:
        //   a. RefCountSubscriber doesn't have a reference to the shared connection
        //      Subscription yet, or,
        //   b. RefCountSubscriber's connection Subscription reference is identical
        //      to the shared connection Subscription
        ///
        var connection = this.connection;
        var sharedConnection = connectable._connection;
        this.connection = null;
        if (sharedConnection && (!connection || sharedConnection === connection)) {
            sharedConnection.unsubscribe();
        }
    };
    return RefCountSubscriber;
}(__WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */]));
//# sourceMappingURL=refCount.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/scan.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = scan;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subscriber__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Subscriber.js");
/** PURE_IMPORTS_START .._Subscriber PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/* tslint:enable:max-line-length */
/**
 * Applies an accumulator function over the source Observable, and returns each
 * intermediate result, with an optional seed value.
 *
 * <span class="informal">It's like {@link reduce}, but emits the current
 * accumulation whenever the source emits a value.</span>
 *
 * <img src="./img/scan.png" width="100%">
 *
 * Combines together all values emitted on the source, using an accumulator
 * function that knows how to join a new source value into the accumulation from
 * the past. Is similar to {@link reduce}, but emits the intermediate
 * accumulations.
 *
 * Returns an Observable that applies a specified `accumulator` function to each
 * item emitted by the source Observable. If a `seed` value is specified, then
 * that value will be used as the initial value for the accumulator. If no seed
 * value is specified, the first item of the source is used as the seed.
 *
 * @example <caption>Count the number of click events</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var ones = clicks.mapTo(1);
 * var seed = 0;
 * var count = ones.scan((acc, one) => acc + one, seed);
 * count.subscribe(x => console.log(x));
 *
 * @see {@link expand}
 * @see {@link mergeScan}
 * @see {@link reduce}
 *
 * @param {function(acc: R, value: T, index: number): R} accumulator
 * The accumulator function called on each source value.
 * @param {T|R} [seed] The initial accumulation value.
 * @return {Observable<R>} An observable of the accumulated values.
 * @method scan
 * @owner Observable
 */
function scan(accumulator, seed) {
    var hasSeed = false;
    // providing a seed of `undefined` *should* be valid and trigger
    // hasSeed! so don't use `seed !== undefined` checks!
    // For this reason, we have to check it here at the original call site
    // otherwise inside Operator/Subscriber we won't know if `undefined`
    // means they didn't provide anything or if they literally provided `undefined`
    if (arguments.length >= 2) {
        hasSeed = true;
    }
    return function scanOperatorFunction(source) {
        return source.lift(new ScanOperator(accumulator, seed, hasSeed));
    };
}
var ScanOperator = /*@__PURE__*/ (/*@__PURE__*/ function () {
    function ScanOperator(accumulator, seed, hasSeed) {
        if (hasSeed === void 0) {
            hasSeed = false;
        }
        this.accumulator = accumulator;
        this.seed = seed;
        this.hasSeed = hasSeed;
    }
    ScanOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ScanSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
    };
    return ScanOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ScanSubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(ScanSubscriber, _super);
    function ScanSubscriber(destination, accumulator, _seed, hasSeed) {
        _super.call(this, destination);
        this.accumulator = accumulator;
        this._seed = _seed;
        this.hasSeed = hasSeed;
        this.index = 0;
    }
    Object.defineProperty(ScanSubscriber.prototype, "seed", {
        get: function () {
            return this._seed;
        },
        set: function (value) {
            this.hasSeed = true;
            this._seed = value;
        },
        enumerable: true,
        configurable: true
    });
    ScanSubscriber.prototype._next = function (value) {
        if (!this.hasSeed) {
            this.seed = value;
            this.destination.next(value);
        }
        else {
            return this._tryNext(value);
        }
    };
    ScanSubscriber.prototype._tryNext = function (value) {
        var index = this.index++;
        var result;
        try {
            result = this.accumulator(this.seed, value, index);
        }
        catch (err) {
            this.destination.error(err);
        }
        this.seed = result;
        this.destination.next(result);
    };
    return ScanSubscriber;
}(__WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */]));
//# sourceMappingURL=scan.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/share.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = share;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__multicast__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/multicast.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__refCount__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/refCount.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Subject__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Subject.js");
/** PURE_IMPORTS_START ._multicast,._refCount,.._Subject PURE_IMPORTS_END */



function shareSubjectFactory() {
    return new __WEBPACK_IMPORTED_MODULE_2__Subject__["a" /* Subject */]();
}
/**
 * Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one
 * Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will
 * unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream `hot`.
 * This is an alias for .multicast(() => new Subject()).refCount().
 *
 * <img src="./img/share.png" width="100%">
 *
 * @return {Observable<T>} An Observable that upon connection causes the source Observable to emit items to its Observers.
 * @method share
 * @owner Observable
 */
function share() {
    return function (source) { return Object(__WEBPACK_IMPORTED_MODULE_1__refCount__["a" /* refCount */])()(Object(__WEBPACK_IMPORTED_MODULE_0__multicast__["a" /* multicast */])(shareSubjectFactory)(source)); };
}
;
//# sourceMappingURL=share.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/operators/takeLast.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = takeLast;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subscriber__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Subscriber.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_ArgumentOutOfRangeError__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/ArgumentOutOfRangeError.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__observable_EmptyObservable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/observable/EmptyObservable.js");
/** PURE_IMPORTS_START .._Subscriber,.._util_ArgumentOutOfRangeError,.._observable_EmptyObservable PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};



/**
 * Emits only the last `count` values emitted by the source Observable.
 *
 * <span class="informal">Remembers the latest `count` values, then emits those
 * only when the source completes.</span>
 *
 * <img src="./img/takeLast.png" width="100%">
 *
 * `takeLast` returns an Observable that emits at most the last `count` values
 * emitted by the source Observable. If the source emits fewer than `count`
 * values then all of its values are emitted. This operator must wait until the
 * `complete` notification emission from the source in order to emit the `next`
 * values on the output Observable, because otherwise it is impossible to know
 * whether or not more values will be emitted on the source. For this reason,
 * all values are emitted synchronously, followed by the complete notification.
 *
 * @example <caption>Take the last 3 values of an Observable with many values</caption>
 * var many = Rx.Observable.range(1, 100);
 * var lastThree = many.takeLast(3);
 * lastThree.subscribe(x => console.log(x));
 *
 * @see {@link take}
 * @see {@link takeUntil}
 * @see {@link takeWhile}
 * @see {@link skip}
 *
 * @throws {ArgumentOutOfRangeError} When using `takeLast(i)`, it delivers an
 * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
 *
 * @param {number} count The maximum number of values to emit from the end of
 * the sequence of values emitted by the source Observable.
 * @return {Observable<T>} An Observable that emits at most the last count
 * values emitted by the source Observable.
 * @method takeLast
 * @owner Observable
 */
function takeLast(count) {
    return function takeLastOperatorFunction(source) {
        if (count === 0) {
            return new __WEBPACK_IMPORTED_MODULE_2__observable_EmptyObservable__["a" /* EmptyObservable */]();
        }
        else {
            return source.lift(new TakeLastOperator(count));
        }
    };
}
var TakeLastOperator = /*@__PURE__*/ (/*@__PURE__*/ function () {
    function TakeLastOperator(total) {
        this.total = total;
        if (this.total < 0) {
            throw new __WEBPACK_IMPORTED_MODULE_1__util_ArgumentOutOfRangeError__["a" /* ArgumentOutOfRangeError */];
        }
    }
    TakeLastOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new TakeLastSubscriber(subscriber, this.total));
    };
    return TakeLastOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TakeLastSubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(TakeLastSubscriber, _super);
    function TakeLastSubscriber(destination, total) {
        _super.call(this, destination);
        this.total = total;
        this.ring = new Array();
        this.count = 0;
    }
    TakeLastSubscriber.prototype._next = function (value) {
        var ring = this.ring;
        var total = this.total;
        var count = this.count++;
        if (ring.length < total) {
            ring.push(value);
        }
        else {
            var index = count % total;
            ring[index] = value;
        }
    };
    TakeLastSubscriber.prototype._complete = function () {
        var destination = this.destination;
        var count = this.count;
        if (count > 0) {
            var total = this.count >= this.total ? this.total : this.count;
            var ring = this.ring;
            for (var i = 0; i < total; i++) {
                var idx = (count++) % total;
                destination.next(ring[idx]);
            }
        }
        destination.complete();
    };
    return TakeLastSubscriber;
}(__WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */]));
//# sourceMappingURL=takeLast.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/symbol/iterator.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export symbolIteratorPonyfill */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return iterator; });
/* unused harmony export $$iterator */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_root__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/root.js");
/** PURE_IMPORTS_START .._util_root PURE_IMPORTS_END */

function symbolIteratorPonyfill(root) {
    var Symbol = root.Symbol;
    if (typeof Symbol === 'function') {
        if (!Symbol.iterator) {
            Symbol.iterator = Symbol('iterator polyfill');
        }
        return Symbol.iterator;
    }
    else {
        // [for Mozilla Gecko 27-35:](https://mzl.la/2ewE1zC)
        var Set_1 = root.Set;
        if (Set_1 && typeof new Set_1()['@@iterator'] === 'function') {
            return '@@iterator';
        }
        var Map_1 = root.Map;
        // required for compatability with es6-shim
        if (Map_1) {
            var keys = Object.getOwnPropertyNames(Map_1.prototype);
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                // according to spec, Map.prototype[@@iterator] and Map.orototype.entries must be equal.
                if (key !== 'entries' && key !== 'size' && Map_1.prototype[key] === Map_1.prototype['entries']) {
                    return key;
                }
            }
        }
        return '@@iterator';
    }
}
var iterator = /*@__PURE__*/ symbolIteratorPonyfill(__WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */]);
/**
 * @deprecated use iterator instead
 */
var $$iterator = iterator;
//# sourceMappingURL=iterator.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/symbol/observable.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getSymbolObservable */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return observable; });
/* unused harmony export $$observable */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_root__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/root.js");
/** PURE_IMPORTS_START .._util_root PURE_IMPORTS_END */

function getSymbolObservable(context) {
    var $$observable;
    var Symbol = context.Symbol;
    if (typeof Symbol === 'function') {
        if (Symbol.observable) {
            $$observable = Symbol.observable;
        }
        else {
            $$observable = Symbol('observable');
            Symbol.observable = $$observable;
        }
    }
    else {
        $$observable = '@@observable';
    }
    return $$observable;
}
var observable = /*@__PURE__*/ getSymbolObservable(__WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */]);
/**
 * @deprecated use observable instead
 */
var $$observable = observable;
//# sourceMappingURL=observable.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/symbol/rxSubscriber.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return rxSubscriber; });
/* unused harmony export $$rxSubscriber */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_root__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/root.js");
/** PURE_IMPORTS_START .._util_root PURE_IMPORTS_END */

var Symbol = __WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].Symbol;
var rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
    /*@__PURE__*/ Symbol.for('rxSubscriber') : '@@rxSubscriber';
/**
 * @deprecated use rxSubscriber instead
 */
var $$rxSubscriber = rxSubscriber;
//# sourceMappingURL=rxSubscriber.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/ArgumentOutOfRangeError.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArgumentOutOfRangeError; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when an element was queried at a certain index of an
 * Observable, but no such index or position exists in that sequence.
 *
 * @see {@link elementAt}
 * @see {@link take}
 * @see {@link takeLast}
 *
 * @class ArgumentOutOfRangeError
 */
var ArgumentOutOfRangeError = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(ArgumentOutOfRangeError, _super);
    function ArgumentOutOfRangeError() {
        var err = _super.call(this, 'argument out of range');
        this.name = err.name = 'ArgumentOutOfRangeError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return ArgumentOutOfRangeError;
}(Error));
//# sourceMappingURL=ArgumentOutOfRangeError.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/EmptyError.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmptyError; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when an Observable or a sequence was queried but has no
 * elements.
 *
 * @see {@link first}
 * @see {@link last}
 * @see {@link single}
 *
 * @class EmptyError
 */
var EmptyError = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(EmptyError, _super);
    function EmptyError() {
        var err = _super.call(this, 'no elements in sequence');
        this.name = err.name = 'EmptyError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return EmptyError;
}(Error));
//# sourceMappingURL=EmptyError.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/ObjectUnsubscribedError.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObjectUnsubscribedError; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when an action is invalid because the object has been
 * unsubscribed.
 *
 * @see {@link Subject}
 * @see {@link BehaviorSubject}
 *
 * @class ObjectUnsubscribedError
 */
var ObjectUnsubscribedError = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(ObjectUnsubscribedError, _super);
    function ObjectUnsubscribedError() {
        var err = _super.call(this, 'object unsubscribed');
        this.name = err.name = 'ObjectUnsubscribedError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return ObjectUnsubscribedError;
}(Error));
//# sourceMappingURL=ObjectUnsubscribedError.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/UnsubscriptionError.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UnsubscriptionError; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        _super.call(this);
        this.errors = errors;
        var err = Error.call(this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
        this.name = err.name = 'UnsubscriptionError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return UnsubscriptionError;
}(Error));
//# sourceMappingURL=UnsubscriptionError.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/errorObject.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return errorObject; });
// typeof any so that it we don't have to cast when comparing a result to the error object
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var errorObject = { e: {} };
//# sourceMappingURL=errorObject.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/identity.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = identity;
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function identity(x) {
    return x;
}
//# sourceMappingURL=identity.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/isArray.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isArray; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArray.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/isArrayLike.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isArrayLike; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var isArrayLike = (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArrayLike.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/isFunction.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isFunction;
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isFunction(x) {
    return typeof x === 'function';
}
//# sourceMappingURL=isFunction.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/isObject.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isObject;
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isObject(x) {
    return x != null && typeof x === 'object';
}
//# sourceMappingURL=isObject.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/isPromise.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isPromise;
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isPromise(value) {
    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}
//# sourceMappingURL=isPromise.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/isScheduler.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isScheduler;
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isScheduler(value) {
    return value && typeof value.schedule === 'function';
}
//# sourceMappingURL=isScheduler.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/noop.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = noop;
/* tslint:disable:no-empty */
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function noop() { }
//# sourceMappingURL=noop.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/pipe.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = pipe;
/* harmony export (immutable) */ __webpack_exports__["b"] = pipeFromArray;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__noop__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/noop.js");
/** PURE_IMPORTS_START ._noop PURE_IMPORTS_END */

/* tslint:enable:max-line-length */
function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i - 0] = arguments[_i];
    }
    return pipeFromArray(fns);
}
/* @internal */
function pipeFromArray(fns) {
    if (!fns) {
        return __WEBPACK_IMPORTED_MODULE_0__noop__["a" /* noop */];
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
//# sourceMappingURL=pipe.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/root.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _root; });
// CommonJS / Node have global context exposed as "global" variable.
// We don't want to include the whole node.d.ts this this compilation unit so we'll just fake
// the global "global" var for now.
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var __window = typeof window !== 'undefined' && window;
var __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope && self;
var __global = typeof global !== 'undefined' && global;
var _root = __window || __global || __self;
// Workaround Closure Compiler restriction: The body of a goog.module cannot use throw.
// This is needed when used with angular/tsickle which inserts a goog.module statement.
// Wrap in IIFE
/*@__PURE__*/ (function () {
    if (!_root) {
        throw new Error('RxJS could not find any global context (window, self, global)');
    }
})();

//# sourceMappingURL=root.js.map 

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/subscribeToResult.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = subscribeToResult;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/root.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__isArrayLike__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/isArrayLike.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isPromise__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/isPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__isObject__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/isObject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Observable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__symbol_iterator__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/symbol/iterator.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__InnerSubscriber__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/InnerSubscriber.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__symbol_observable__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/symbol/observable.js");
/** PURE_IMPORTS_START ._root,._isArrayLike,._isPromise,._isObject,.._Observable,.._symbol_iterator,.._InnerSubscriber,.._symbol_observable PURE_IMPORTS_END */








function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    var destination = new __WEBPACK_IMPORTED_MODULE_6__InnerSubscriber__["a" /* InnerSubscriber */](outerSubscriber, outerValue, outerIndex);
    if (destination.closed) {
        return null;
    }
    if (result instanceof __WEBPACK_IMPORTED_MODULE_4__Observable__["a" /* Observable */]) {
        if (result._isScalar) {
            destination.next(result.value);
            destination.complete();
            return null;
        }
        else {
            destination.syncErrorThrowable = true;
            return result.subscribe(destination);
        }
    }
    else if (Object(__WEBPACK_IMPORTED_MODULE_1__isArrayLike__["a" /* isArrayLike */])(result)) {
        for (var i = 0, len = result.length; i < len && !destination.closed; i++) {
            destination.next(result[i]);
        }
        if (!destination.closed) {
            destination.complete();
        }
    }
    else if (Object(__WEBPACK_IMPORTED_MODULE_2__isPromise__["a" /* isPromise */])(result)) {
        result.then(function (value) {
            if (!destination.closed) {
                destination.next(value);
                destination.complete();
            }
        }, function (err) { return destination.error(err); })
            .then(null, function (err) {
            // Escaping the Promise trap: globally throw unhandled errors
            __WEBPACK_IMPORTED_MODULE_0__root__["a" /* root */].setTimeout(function () { throw err; });
        });
        return destination;
    }
    else if (result && typeof result[__WEBPACK_IMPORTED_MODULE_5__symbol_iterator__["a" /* iterator */]] === 'function') {
        var iterator = result[__WEBPACK_IMPORTED_MODULE_5__symbol_iterator__["a" /* iterator */]]();
        do {
            var item = iterator.next();
            if (item.done) {
                destination.complete();
                break;
            }
            destination.next(item.value);
            if (destination.closed) {
                break;
            }
        } while (true);
    }
    else if (result && typeof result[__WEBPACK_IMPORTED_MODULE_7__symbol_observable__["a" /* observable */]] === 'function') {
        var obs = result[__WEBPACK_IMPORTED_MODULE_7__symbol_observable__["a" /* observable */]]();
        if (typeof obs.subscribe !== 'function') {
            destination.error(new TypeError('Provided object does not correctly implement Symbol.observable'));
        }
        else {
            return obs.subscribe(new __WEBPACK_IMPORTED_MODULE_6__InnerSubscriber__["a" /* InnerSubscriber */](outerSubscriber, outerValue, outerIndex));
        }
    }
    else {
        var value = Object(__WEBPACK_IMPORTED_MODULE_3__isObject__["a" /* isObject */])(result) ? 'an invalid object' : "'" + result + "'";
        var msg = ("You provided " + value + " where a stream was expected.")
            + ' You can provide an Observable, Promise, Array, or Iterable.';
        destination.error(new TypeError(msg));
    }
    return null;
}
//# sourceMappingURL=subscribeToResult.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/toSubscriber.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = toSubscriber;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subscriber__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Subscriber.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__symbol_rxSubscriber__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/symbol/rxSubscriber.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Observer__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Observer.js");
/** PURE_IMPORTS_START .._Subscriber,.._symbol_rxSubscriber,.._Observer PURE_IMPORTS_END */



function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof __WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */]) {
            return nextOrObserver;
        }
        if (nextOrObserver[__WEBPACK_IMPORTED_MODULE_1__symbol_rxSubscriber__["a" /* rxSubscriber */]]) {
            return nextOrObserver[__WEBPACK_IMPORTED_MODULE_1__symbol_rxSubscriber__["a" /* rxSubscriber */]]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new __WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */](__WEBPACK_IMPORTED_MODULE_2__Observer__["a" /* empty */]);
    }
    return new __WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */](nextOrObserver, error, complete);
}
//# sourceMappingURL=toSubscriber.js.map 


/***/ }),

/***/ "../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/tryCatch.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = tryCatch;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__errorObject__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/util/errorObject.js");
/** PURE_IMPORTS_START ._errorObject PURE_IMPORTS_END */

var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        __WEBPACK_IMPORTED_MODULE_0__errorObject__["a" /* errorObject */].e = e;
        return __WEBPACK_IMPORTED_MODULE_0__errorObject__["a" /* errorObject */];
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
;
//# sourceMappingURL=tryCatch.js.map 


/***/ }),

/***/ "./ClientApp/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./ClientApp/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./ClientApp/app/admin/admin.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"navbar bg-info mb-1\">\r\n  <a class=\"navbar-brand text-white\">SPORTS STORE Admin</a>\r\n</div>\r\n<div class=\"row no-gutters\">\r\n  <div class=\"col-3\">\r\n    <button class=\"btn btn-block btn-outline-info\" routerLink=\"/admin\"\r\n            routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact: true}\">\r\n      Overview\r\n    </button>\r\n    <button class=\"btn btn-block btn-outline-info\" routerLink=\"/admin/products\"\r\n            routerLinkActive=\"active\">\r\n      Products\r\n    </button>\r\n    <button class=\"btn btn-block btn-outline-info\" routerLink=\"/admin/orders\"\r\n            routerLinkActive=\"active\">\r\n      Orders\r\n    </button>\r\n  </div>\r\n  <div class=\"col p-2\">\r\n    <router-outlet></router-outlet>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./ClientApp/app/admin/admin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_repository__ = __webpack_require__("./ClientApp/app/models/repository.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AdminComponent = (function () {
    function AdminComponent(repo) {
        this.repo = repo;
        repo.filter.reset();
        repo.filter.related = true;
        this.repo.getProducts();
        this.repo.getSuppliers();
        this.repo.getOrders();
    }
    AdminComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            template: __webpack_require__("./ClientApp/app/admin/admin.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */]])
    ], AdminComponent);
    return AdminComponent;
}());



/***/ }),

/***/ "./ClientApp/app/admin/admin.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__admin_component__ = __webpack_require__("./ClientApp/app/admin/admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__overview_component__ = __webpack_require__("./ClientApp/app/admin/overview.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__productAdmin_component__ = __webpack_require__("./ClientApp/app/admin/productAdmin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__orderAdmin_component__ = __webpack_require__("./ClientApp/app/admin/orderAdmin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__productEditor_component__ = __webpack_require__("./ClientApp/app/admin/productEditor.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AdminModule = (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* RouterModule */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */]],
            declarations: [__WEBPACK_IMPORTED_MODULE_4__admin_component__["a" /* AdminComponent */], __WEBPACK_IMPORTED_MODULE_5__overview_component__["a" /* OverviewComponent */],
                __WEBPACK_IMPORTED_MODULE_6__productAdmin_component__["a" /* ProductAdminComponent */], __WEBPACK_IMPORTED_MODULE_7__orderAdmin_component__["a" /* OrderAdminComponent */], __WEBPACK_IMPORTED_MODULE_8__productEditor_component__["a" /* ProductEditorComponent */]]
        })
    ], AdminModule);
    return AdminModule;
}());



/***/ }),

/***/ "./ClientApp/app/admin/orderAdmin.component.html":
/***/ (function(module, exports) {

module.exports = "<table *ngIf=\"orders?.length > 0; else nodata\" class=\"table table-striped\">\r\n  <tr>\r\n    <th>Customer</th>\r\n    <th>Address</th>\r\n    <th>Products</th>\r\n    <th>Total</th>\r\n    <th></th>\r\n  </tr>\r\n  <tr *ngFor=\"let o of orders\">\r\n    <td>{{o.name}}</td>\r\n    <td>{{o.address}}</td>\r\n    <td>{{o.products.length}}</td>\r\n    <td>{{o.payment.total | currency:USD:true}}</td>\r\n    <td *ngIf=\"!o.shipped; else shipped\">\r\n      <button class=\"btn btn-sm btn-primary\"\r\n              (click)=\"markShipped(o)\">\r\n        Ship\r\n      </button>\r\n    </td>\r\n  </tr>\r\n</table>\r\n\r\n<ng-template #shipped>\r\n  <td>Shipped</td>\r\n</ng-template>\r\n\r\n<ng-template #nodata>\r\n  <h3 class=\"text-center\">There are no orders</h3>\r\n</ng-template>\r\n"

/***/ }),

/***/ "./ClientApp/app/admin/orderAdmin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderAdminComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_repository__ = __webpack_require__("./ClientApp/app/models/repository.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var OrderAdminComponent = (function () {
    function OrderAdminComponent(repo) {
        this.repo = repo;
    }
    Object.defineProperty(OrderAdminComponent.prototype, "orders", {
        get: function () {
            return this.repo.orders;
        },
        enumerable: true,
        configurable: true
    });
    OrderAdminComponent.prototype.markShipped = function (order) {
        this.repo.shipOrder(order);
    };
    OrderAdminComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            template: __webpack_require__("./ClientApp/app/admin/orderAdmin.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */]])
    ], OrderAdminComponent);
    return OrderAdminComponent;
}());



/***/ }),

/***/ "./ClientApp/app/admin/overview.component.html":
/***/ (function(module, exports) {

module.exports = "<table class=\"table m-1\">\r\n  <tr>\r\n    <td>There are {{products?.length || 0}} products for sale</td>\r\n    <td>\r\n      <button class=\"btn btn-sm btn-info btn-block\"\r\n              routerLink=\"/admin/products\">\r\n        Manage Products\r\n      </button>\r\n    </td>\r\n  </tr>\r\n  <tr>\r\n    <td>There are {{orders?.length || 0}} orders</td>\r\n    <td>\r\n      <button class=\"btn btn-sm btn-info btn-block\"\r\n              routerLink=\"/admin/orders\">\r\n        Manage Orders\r\n      </button>\r\n    </td>\r\n  </tr>\r\n</table>\r\n"

/***/ }),

/***/ "./ClientApp/app/admin/overview.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OverviewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_repository__ = __webpack_require__("./ClientApp/app/models/repository.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var OverviewComponent = (function () {
    function OverviewComponent(repo) {
        this.repo = repo;
    }
    Object.defineProperty(OverviewComponent.prototype, "products", {
        get: function () {
            return this.repo.products;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OverviewComponent.prototype, "orders", {
        get: function () {
            return this.repo.orders;
        },
        enumerable: true,
        configurable: true
    });
    OverviewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            template: __webpack_require__("./ClientApp/app/admin/overview.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */]])
    ], OverviewComponent);
    return OverviewComponent;
}());



/***/ }),

/***/ "./ClientApp/app/admin/productAdmin.component.html":
/***/ (function(module, exports) {

module.exports = "<table *ngIf=\"tableMode; else create\" class=\"table table-sm table-striped\">\r\n  <tr>\r\n    <th>ID</th>\r\n    <th>Name</th>\r\n    <th>Category</th>\r\n    <th>Supplier</th>\r\n    <th>Price</th>\r\n    <th></th>\r\n  </tr>\r\n  <tr *ngFor=\"let p of products\">\r\n    <ng-template [ngIf]=\"product?.productId != p.productId\" [ngIfElse]=\"edit\">\r\n      <td>{{p.productId}}</td>\r\n      <td>{{p.name}}</td>\r\n      <td>{{p.category}}</td>\r\n      <td>{{p.supplier?.name || '(None)'}}</td>\r\n      <td>{{p.price | currency:USD:true}}</td>\r\n      <td>\r\n        <button class=\"btn btn-sm btn-primary\"\r\n                (click)=\"selectProduct(p.productId)\">\r\n          Edit\r\n        </button>\r\n        <button class=\"btn btn-sm btn-danger\"\r\n                (click)=\"deleteProduct(p.productId)\">\r\n          Delete\r\n        </button>\r\n      </td>\r\n    </ng-template>\r\n  </tr>\r\n  <tfoot>\r\n    <tr>\r\n      <td colspan=\"6\" class=\"text-center\">\r\n        <button class=\"btn btn-primary\"\r\n                (click)=\"clearProduct(); tableMode = false\">\r\n          Create\r\n        </button>\r\n      </td>\r\n    </tr>\r\n  </tfoot>\r\n</table>\r\n\r\n<ng-template #edit>\r\n  <td colspan=\"6\">\r\n    <admin-product-editor></admin-product-editor>\r\n    <div class=\"text-center\">\r\n      <button class=\"btn btn-sm btn-primary\" (click)=\"saveProduct()\">\r\n        Save\r\n      </button>\r\n      <button class=\"btn btn-sm btn-info\" (click)=\"clearProduct()\">\r\n        Cancel\r\n      </button>\r\n    </div>\r\n  </td>\r\n</ng-template>\r\n\r\n<ng-template #create>\r\n  <admin-product-editor></admin-product-editor>\r\n  <button class=\"btn btn-primary\" (click)=\"saveProduct()\">\r\n    Save\r\n  </button>\r\n  <button class=\"btn btn-info\" (click)=\"clearProduct()\">\r\n    Cancel\r\n  </button>\r\n</ng-template>\r\n"

/***/ }),

/***/ "./ClientApp/app/admin/productAdmin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductAdminComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_repository__ = __webpack_require__("./ClientApp/app/models/repository.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_product_model__ = __webpack_require__("./ClientApp/app/models/product.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProductAdminComponent = (function () {
    function ProductAdminComponent(repo) {
        this.repo = repo;
        this.tableMode = true;
    }
    Object.defineProperty(ProductAdminComponent.prototype, "product", {
        get: function () {
            return this.repo.product;
        },
        enumerable: true,
        configurable: true
    });
    ProductAdminComponent.prototype.selectProduct = function (id) {
        this.repo.getProduct(id);
    };
    ProductAdminComponent.prototype.saveProduct = function () {
        if (this.repo.product.productId == null) {
            this.repo.createProduct(this.repo.product);
        }
        else {
            this.repo.replaceProduct(this.repo.product);
        }
        this.clearProduct();
        this.tableMode = true;
    };
    ProductAdminComponent.prototype.deleteProduct = function (id) {
        this.repo.deleteProduct(id);
    };
    ProductAdminComponent.prototype.clearProduct = function () {
        this.repo.product = new __WEBPACK_IMPORTED_MODULE_2__models_product_model__["a" /* Product */]();
        this.tableMode = true;
    };
    Object.defineProperty(ProductAdminComponent.prototype, "products", {
        get: function () {
            return this.repo.products;
        },
        enumerable: true,
        configurable: true
    });
    ProductAdminComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            template: __webpack_require__("./ClientApp/app/admin/productAdmin.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */]])
    ], ProductAdminComponent);
    return ProductAdminComponent;
}());



/***/ }),

/***/ "./ClientApp/app/admin/productEditor.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"form-group\">\r\n  <label>Name</label>\r\n  <input class=\"form-control\" [(ngModel)]=\"product.name\" />\r\n</div>\r\n<div class=\"form-group\">\r\n  <label>Category</label>\r\n  <input class=\"form-control\" [(ngModel)]=\"product.category\" />\r\n</div>\r\n<div class=\"form-group\">\r\n  <label>Supplier</label>\r\n  <select class=\"form-control\" [(ngModel)]=\"product.supplier\"\r\n          [compareWith]=\"compareSuppliers\">\r\n    <option *ngFor=\"let s of suppliers\" [ngValue]=\"s\">{{s.name}}</option>\r\n  </select>\r\n</div>\r\n<div class=\"form-group\">\r\n  <label>Description</label>\r\n  <textarea class=\"form-control\" [(ngModel)]=\"product.description\"></textarea>\r\n</div>\r\n<div class=\"form-group\">\r\n  <label>Price</label>\r\n  <input class=\"form-control\" [(ngModel)]=\"product.price\" />\r\n</div>\r\n"

/***/ }),

/***/ "./ClientApp/app/admin/productEditor.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductEditorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_repository__ = __webpack_require__("./ClientApp/app/models/repository.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProductEditorComponent = (function () {
    function ProductEditorComponent(repo) {
        this.repo = repo;
    }
    Object.defineProperty(ProductEditorComponent.prototype, "product", {
        get: function () {
            return this.repo.product;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductEditorComponent.prototype, "suppliers", {
        get: function () {
            return this.repo.suppliers;
        },
        enumerable: true,
        configurable: true
    });
    ProductEditorComponent.prototype.compareSuppliers = function (s1, s2) {
        return s1 && s2 && s1.name == s2.name;
    };
    ProductEditorComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "admin-product-editor",
            template: __webpack_require__("./ClientApp/app/admin/productEditor.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */]])
    ], ProductEditorComponent);
    return ProductEditorComponent;
}());



/***/ }),

/***/ "./ClientApp/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"bg-danger text-white text-center p-2 m-2\" *ngIf=\"error != null\">\r\n  <h6 *ngFor=\"let e of error\">{{e}}</h6>\r\n  <button class=\"btn btn-warning\" (click)=\"clearError()\">OK</button>\r\n</div>\r\n<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ "./ClientApp/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errorHandler_service__ = __webpack_require__("./ClientApp/app/errorHandler.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(errorHandler, ngZone) {
        var _this = this;
        errorHandler.errors.subscribe(function (error) {
            ngZone.run(function () { return _this.lastError = error; });
        });
    }
    Object.defineProperty(AppComponent.prototype, "error", {
        get: function () {
            return this.lastError;
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.clearError = function () {
        this.lastError = null;
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "app-root",
            template: __webpack_require__("./ClientApp/app/app.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__errorHandler_service__["a" /* ErrorHandlerService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* NgZone */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./ClientApp/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export handler */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("./ClientApp/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_model_module__ = __webpack_require__("./ClientApp/app/models/model.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_routing__ = __webpack_require__("./ClientApp/app/app.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__store_store_module__ = __webpack_require__("./ClientApp/app/store/store.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__admin_admin_module__ = __webpack_require__("./ClientApp/app/admin/admin.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__errorHandler_service__ = __webpack_require__("./ClientApp/app/errorHandler.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var eHandler = new __WEBPACK_IMPORTED_MODULE_9__errorHandler_service__["a" /* ErrorHandlerService */]();
function handler() {
    return eHandler;
}
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]],
            imports: [__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */], __WEBPACK_IMPORTED_MODULE_5__models_model_module__["a" /* ModelModule */],
                __WEBPACK_IMPORTED_MODULE_6__app_routing__["a" /* RoutingConfig */], __WEBPACK_IMPORTED_MODULE_7__store_store_module__["a" /* StoreModule */], __WEBPACK_IMPORTED_MODULE_8__admin_admin_module__["a" /* AdminModule */]],
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_9__errorHandler_service__["a" /* ErrorHandlerService */], useFactory: handler },
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useFactory: handler }
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./ClientApp/app/app.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoutingConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_productSelection_component__ = __webpack_require__("./ClientApp/app/store/productSelection.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_cartDetail_component__ = __webpack_require__("./ClientApp/app/store/cartDetail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_checkout_checkoutDetails_component__ = __webpack_require__("./ClientApp/app/store/checkout/checkoutDetails.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store_checkout_checkoutPayment_component__ = __webpack_require__("./ClientApp/app/store/checkout/checkoutPayment.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__store_checkout_checkoutSummary_component__ = __webpack_require__("./ClientApp/app/store/checkout/checkoutSummary.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__store_checkout_orderConfirmation_component__ = __webpack_require__("./ClientApp/app/store/checkout/orderConfirmation.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__admin_admin_component__ = __webpack_require__("./ClientApp/app/admin/admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__admin_overview_component__ = __webpack_require__("./ClientApp/app/admin/overview.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__admin_productAdmin_component__ = __webpack_require__("./ClientApp/app/admin/productAdmin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__admin_orderAdmin_component__ = __webpack_require__("./ClientApp/app/admin/orderAdmin.component.ts");











var routes = [
    {
        path: "admin", component: __WEBPACK_IMPORTED_MODULE_7__admin_admin_component__["a" /* AdminComponent */],
        children: [
            { path: "products", component: __WEBPACK_IMPORTED_MODULE_9__admin_productAdmin_component__["a" /* ProductAdminComponent */] },
            { path: "orders", component: __WEBPACK_IMPORTED_MODULE_10__admin_orderAdmin_component__["a" /* OrderAdminComponent */] },
            { path: "overview", component: __WEBPACK_IMPORTED_MODULE_8__admin_overview_component__["a" /* OverviewComponent */] },
            { path: "", component: __WEBPACK_IMPORTED_MODULE_8__admin_overview_component__["a" /* OverviewComponent */] }
        ]
    },
    { path: "checkout/step1", component: __WEBPACK_IMPORTED_MODULE_3__store_checkout_checkoutDetails_component__["a" /* CheckoutDetailsComponent */] },
    { path: "checkout/step2", component: __WEBPACK_IMPORTED_MODULE_4__store_checkout_checkoutPayment_component__["a" /* CheckoutPaymentComponent */] },
    { path: "checkout/step3", component: __WEBPACK_IMPORTED_MODULE_5__store_checkout_checkoutSummary_component__["a" /* CheckoutSummaryComponent */] },
    { path: "checkout/confirmation", component: __WEBPACK_IMPORTED_MODULE_6__store_checkout_orderConfirmation_component__["a" /* OrderConfirmationComponent */] },
    { path: "checkout", component: __WEBPACK_IMPORTED_MODULE_3__store_checkout_checkoutDetails_component__["a" /* CheckoutDetailsComponent */] },
    { path: "cart", component: __WEBPACK_IMPORTED_MODULE_2__store_cartDetail_component__["a" /* CartDetailComponent */] },
    { path: "store", component: __WEBPACK_IMPORTED_MODULE_1__store_productSelection_component__["a" /* ProductSelectionComponent */] },
    { path: "", component: __WEBPACK_IMPORTED_MODULE_1__store_productSelection_component__["a" /* ProductSelectionComponent */] }
];
var RoutingConfig = __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* RouterModule */].forRoot(routes);


/***/ }),

/***/ "./ClientApp/app/errorHandler.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorHandlerService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ValidationError; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/Subject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ErrorHandlerService = (function () {
    function ErrorHandlerService() {
        this.subject = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
    }
    ErrorHandlerService.prototype.handleError = function (error) {
        var _this = this;
        setTimeout(function () {
            if (error instanceof ValidationError) {
                _this.subject.next(error.errors);
            }
            else if (error instanceof Error) {
                _this.subject.next([error.message]);
            }
            else {
                _this.subject.next(["An error has occurred"]);
            }
        });
    };
    Object.defineProperty(ErrorHandlerService.prototype, "errors", {
        get: function () {
            return this.subject;
        },
        enumerable: true,
        configurable: true
    });
    ErrorHandlerService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], ErrorHandlerService);
    return ErrorHandlerService;
}());

var ValidationError = (function () {
    function ValidationError(errors) {
        this.errors = errors;
    }
    return ValidationError;
}());



/***/ }),

/***/ "./ClientApp/app/models/cart.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Cart; });
/* unused harmony export ProductSelection */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__repository__ = __webpack_require__("./ClientApp/app/models/repository.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Cart = (function () {
    function Cart(repo) {
        var _this = this;
        this.repo = repo;
        this.selections = [];
        this.itemCount = 0;
        this.totalPrice = 0;
        repo.getSessionData("cart").subscribe(function (cartData) {
            if (cartData != null) {
                cartData.map(function (item) { return new ProductSelection(_this, item.productId, item.name, item.price, item.quantity); })
                    .forEach(function (item) { return _this.selections.push(item); });
                _this.update(false);
            }
        });
    }
    Cart.prototype.addProduct = function (product) {
        var selection = this.selections
            .find(function (ps) { return ps.productId == product.productId; });
        if (selection) {
            selection.quantity++;
        }
        else {
            this.selections.push(new ProductSelection(this, product.productId, product.name, product.price, 1));
        }
        this.update();
    };
    Cart.prototype.updateQuantity = function (productId, quantity) {
        if (quantity > 0) {
            var selection = this.selections.find(function (ps) { return ps.productId == productId; });
            if (selection) {
                selection.quantity = quantity;
            }
        }
        else {
            var index = this.selections.findIndex(function (ps) { return ps.productId == productId; });
            if (index != -1) {
                this.selections.splice(index, 1);
            }
            this.update();
        }
    };
    Cart.prototype.clear = function () {
        this.selections = [];
        this.update();
    };
    Cart.prototype.update = function (storeData) {
        if (storeData === void 0) { storeData = true; }
        this.itemCount = this.selections.map(function (ps) { return ps.quantity; })
            .reduce(function (prev, curr) { return prev + curr; }, 0);
        this.totalPrice = this.selections.map(function (ps) { return ps.price * ps.quantity; })
            .reduce(function (prev, curr) { return prev + curr; }, 0);
        if (storeData) {
            this.repo.storeSessionData("cart", this.selections.map(function (s) {
                return {
                    productId: s.productId, name: s.name,
                    price: s.price, quantity: s.quantity
                };
            }));
        }
    };
    Cart = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__repository__["a" /* Repository */]])
    ], Cart);
    return Cart;
}());

var ProductSelection = (function () {
    function ProductSelection(cart, productId, name, price, quantityValue) {
        this.cart = cart;
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.quantityValue = quantityValue;
    }
    Object.defineProperty(ProductSelection.prototype, "quantity", {
        get: function () {
            return this.quantityValue;
        },
        set: function (newQuantity) {
            this.quantityValue = newQuantity;
            this.cart.update();
        },
        enumerable: true,
        configurable: true
    });
    return ProductSelection;
}());



/***/ }),

/***/ "./ClientApp/app/models/configClasses.repository.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Filter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Pagination; });
var Filter = (function () {
    function Filter() {
        this.related = false;
    }
    Filter.prototype.reset = function () {
        this.category = this.search = null;
        this.related = false;
    };
    return Filter;
}());

var Pagination = (function () {
    function Pagination() {
        this.productsPerPage = 4;
        this.currentPage = 1;
    }
    return Pagination;
}());



/***/ }),

/***/ "./ClientApp/app/models/model.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModelModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__repository__ = __webpack_require__("./ClientApp/app/models/repository.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cart_model__ = __webpack_require__("./ClientApp/app/models/cart.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__order_model__ = __webpack_require__("./ClientApp/app/models/order.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ModelModule = (function () {
    function ModelModule() {
    }
    ModelModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            providers: [__WEBPACK_IMPORTED_MODULE_1__repository__["a" /* Repository */], __WEBPACK_IMPORTED_MODULE_2__cart_model__["a" /* Cart */], __WEBPACK_IMPORTED_MODULE_3__order_model__["a" /* Order */]]
        })
    ], ModelModule);
    return ModelModule;
}());



/***/ }),

/***/ "./ClientApp/app/models/order.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Order; });
/* unused harmony export Payment */
/* unused harmony export CartLine */
/* unused harmony export OrderConfirmation */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cart_model__ = __webpack_require__("./ClientApp/app/models/cart.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__repository__ = __webpack_require__("./ClientApp/app/models/repository.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_filter__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/add/operator/filter.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Order = (function () {
    function Order(repo, cart, router) {
        var _this = this;
        this.repo = repo;
        this.cart = cart;
        this.payment = new Payment();
        this.submitted = false;
        this.shipped = false;
        router.events
            .filter(function (event) { return event instanceof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* NavigationStart */]; })
            .subscribe(function (event) {
            if (router.url.startsWith("/checkout")
                && _this.name != null && _this.address != null) {
                repo.storeSessionData("checkout", {
                    name: _this.name,
                    address: _this.address,
                    cardNumber: _this.payment.cardNumber,
                    cardExpiry: _this.payment.cardExpiry,
                    cardSecurityCode: _this.payment.cardSecurityCode
                });
            }
        });
        repo.getSessionData("checkout").subscribe(function (data) {
            if (data != null) {
                _this.name = data.name;
                _this.address = data.address;
                _this.payment.cardNumber = data.cardNumber;
                _this.payment.cardExpiry = data.cardExpiry;
                _this.payment.cardSecurityCode = data.cardSecurityCode;
            }
        });
    }
    Object.defineProperty(Order.prototype, "products", {
        get: function () {
            return this.cart.selections
                .map(function (p) { return new CartLine(p.productId, p.quantity); });
        },
        enumerable: true,
        configurable: true
    });
    Order.prototype.clear = function () {
        this.name = null;
        this.address = null;
        this.payment = new Payment();
        this.cart.clear();
        this.submitted = false;
    };
    Order.prototype.submit = function () {
        this.submitted = true;
        this.repo.createOrder(this);
    };
    Order = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__repository__["a" /* Repository */],
            __WEBPACK_IMPORTED_MODULE_1__cart_model__["a" /* Cart */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]])
    ], Order);
    return Order;
}());

var Payment = (function () {
    function Payment() {
    }
    return Payment;
}());

var CartLine = (function () {
    function CartLine(productId, quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }
    return CartLine;
}());

var OrderConfirmation = (function () {
    function OrderConfirmation(orderId, authCode, amount) {
        this.orderId = orderId;
        this.authCode = authCode;
        this.amount = amount;
    }
    return OrderConfirmation;
}());



/***/ }),

/***/ "./ClientApp/app/models/product.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Product; });
var Product = (function () {
    function Product(productId, name, category, description, price, supplier, ratings) {
        this.productId = productId;
        this.name = name;
        this.category = category;
        this.description = description;
        this.price = price;
        this.supplier = supplier;
        this.ratings = ratings;
    }
    return Product;
}());



/***/ }),

/***/ "./ClientApp/app/models/repository.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Repository; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__configClasses_repository__ = __webpack_require__("./ClientApp/app/models/configClasses.repository.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__errorHandler_service__ = __webpack_require__("./ClientApp/app/errorHandler.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__("../../Chapter 03/SportsStore/node_modules/rxjs/_esm5/add/operator/catch.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var productsUrl = "/api/products";
var suppliersUrl = "/api/suppliers";
var ordersUrl = "/api/orders";
var Repository = (function () {
    function Repository(http) {
        this.http = http;
        this.filterObject = new __WEBPACK_IMPORTED_MODULE_3__configClasses_repository__["a" /* Filter */]();
        this.paginationObject = new __WEBPACK_IMPORTED_MODULE_3__configClasses_repository__["b" /* Pagination */]();
        this.suppliers = [];
        this.categories = [];
        this.orders = [];
        //this.filter.category = "soccer";
        this.filter.related = true;
        this.getProducts();
    }
    Repository.prototype.getProduct = function (id) {
        var _this = this;
        this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Get, productsUrl + "/" + id)
            .subscribe(function (response) { return _this.product = response; });
    };
    Repository.prototype.getProducts = function () {
        var _this = this;
        var url = productsUrl + "?related=" + this.filter.related;
        if (this.filter.category) {
            url += "&category=" + this.filter.category;
        }
        if (this.filter.search) {
            url += "&search=" + this.filter.search;
        }
        url += "&metadata=true";
        this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Get, url)
            .subscribe(function (response) {
            _this.products = response.data;
            _this.categories = response.categories;
            _this.pagination.currentPage = 1;
        });
    };
    Repository.prototype.getSuppliers = function () {
        var _this = this;
        this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Get, suppliersUrl)
            .subscribe(function (response) { return _this.suppliers = response; });
    };
    Repository.prototype.createProduct = function (prod) {
        var _this = this;
        var data = {
            name: prod.name, category: prod.category,
            description: prod.description, price: prod.price,
            supplier: prod.supplier ? prod.supplier.supplierId : 0
        };
        this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Post, productsUrl, data)
            .subscribe(function (response) {
            prod.productId = response;
            _this.products.push(prod);
        });
    };
    Repository.prototype.createProductAndSupplier = function (prod, supp) {
        var _this = this;
        var data = {
            name: supp.name, city: supp.city, state: supp.state
        };
        this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Post, suppliersUrl, data)
            .subscribe(function (response) {
            supp.supplierId = response;
            prod.supplier = supp;
            _this.suppliers.push(supp);
            if (prod != null) {
                _this.createProduct(prod);
            }
        });
    };
    Repository.prototype.replaceProduct = function (prod) {
        var _this = this;
        var data = {
            name: prod.name, category: prod.category,
            description: prod.description, price: prod.price,
            supplier: prod.supplier ? prod.supplier.supplierId : 0
        };
        this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Put, productsUrl + "/" + prod.productId, data)
            .subscribe(function (response) { return _this.getProducts(); });
    };
    Repository.prototype.replaceSupplier = function (supp) {
        var _this = this;
        var data = {
            name: supp.name, city: supp.city, state: supp.state
        };
        this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Put, suppliersUrl + "/" + supp.supplierId, data)
            .subscribe(function (response) { return _this.getProducts(); });
    };
    Repository.prototype.updateProduct = function (id, changes) {
        var _this = this;
        var patch = [];
        changes.forEach(function (value, key) {
            return patch.push({ op: "replace", path: key, value: value });
        });
        this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Patch, productsUrl + "/" + id, patch)
            .subscribe(function (response) { return _this.getProducts(); });
    };
    Repository.prototype.sendRequest = function (verb, url, data) {
        return this.http.request(new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Request */]({
            method: verb, url: url, body: data
        }))
            .map(function (response) {
            return response.headers.get("Content-Length") != "0"
                ? response.json() : null;
        })
            .catch(function (errorResponse) {
            if (errorResponse.status == 400) {
                var jsonData_1;
                try {
                    jsonData_1 = errorResponse.json();
                }
                catch (e) {
                    throw new Error("Network Error");
                }
                var messages = Object.getOwnPropertyNames(jsonData_1)
                    .map(function (p) { return jsonData_1[p]; });
                throw new __WEBPACK_IMPORTED_MODULE_4__errorHandler_service__["b" /* ValidationError */](messages);
            }
            throw new Error("Network Error");
        });
    };
    Repository.prototype.getOrders = function () {
        var _this = this;
        this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Get, ordersUrl)
            .subscribe(function (data) { return _this.orders = data; });
    };
    Repository.prototype.createOrder = function (order) {
        this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Post, ordersUrl, {
            name: order.name,
            address: order.address,
            payment: order.payment,
            products: order.products
        }).subscribe(function (data) {
            order.orderConfirmation = data;
            order.cart.clear();
            order.clear();
        });
    };
    Repository.prototype.shipOrder = function (order) {
        var _this = this;
        this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Post, ordersUrl + "/" + order.orderId)
            .subscribe(function (r) { return _this.getOrders(); });
    };
    Object.defineProperty(Repository.prototype, "filter", {
        get: function () {
            return this.filterObject;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Repository.prototype, "pagination", {
        get: function () {
            return this.paginationObject;
        },
        enumerable: true,
        configurable: true
    });
    Repository.prototype.deleteProduct = function (id) {
        var _this = this;
        this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Delete, productsUrl + "/" + id)
            .subscribe(function (response) { return _this.getProducts(); });
    };
    Repository.prototype.deleteSupplier = function (id) {
        var _this = this;
        this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Delete, suppliersUrl + "/" + id)
            .subscribe(function (response) {
            _this.getProducts();
            _this.getSuppliers();
        });
    };
    Repository.prototype.storeSessionData = function (dataType, data) {
        return this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Post, "/api/session/" + dataType, data)
            .subscribe(function (response) { });
    };
    Repository.prototype.getSessionData = function (dataType) {
        return this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Get, "/api/session/" + dataType);
    };
    Repository = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], Repository);
    return Repository;
}());



/***/ }),

/***/ "./ClientApp/app/store/cartDetail.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"navbar bg-dark\">\r\n  <a class=\"navbar-brand text-white\">SPORTS STORE</a>\r\n</div>\r\n\r\n<div class=\"m-1\">\r\n  <h2 class=\"text-center\">Your Cart</h2>\r\n  <table class=\"table table-bordered table-striped p-1\">\r\n    <thead>\r\n      <tr>\r\n        <th>Quantity</th>\r\n        <th>Product</th>\r\n        <th class=\"text-right\">Price</th>\r\n        <th class=\"text-right\">Subtotal</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr *ngIf=\"cart.selections.length == 0\">\r\n        <td colspan=\"4\" class=\"text-xs-center\">\r\n          Your cart is empty\r\n        </td>\r\n      </tr>\r\n      <tr *ngFor=\"let sel of cart.selections\">\r\n        <td>\r\n          <input type=\"number\" class=\"form-control-sm\"\r\n                 style=\"width:5em\" [(ngModel)]=\"sel.quantity\" />\r\n        </td>\r\n        <td>{{sel.name}}</td>\r\n        <td class=\"text-right\">\r\n          {{sel.price | currency:\"USD\":true:\"2.2-2\"}}\r\n        </td>\r\n        <td class=\"text-right\">\r\n          {{(sel.quantity * sel.price) | currency:\"USD\":true:\"2.2-2\" }}\r\n        </td>\r\n        <td class=\"text-center\">\r\n          <button class=\"btn btn-sm btn-danger\"\r\n                  (click)=\"cart.updateQuantity(sel.productId, 0)\">\r\n            Remove\r\n          </button>\r\n        </td>\r\n      </tr>\r\n    </tbody>\r\n    <tfoot>\r\n      <tr>\r\n        <td colspan=\"3\" class=\"text-right\">Total:</td>\r\n        <td class=\"text-right\">\r\n          {{cart.totalPrice | currency:\"USD\":true:\"2.2-2\"}}\r\n        </td>\r\n      </tr>\r\n    </tfoot>\r\n  </table>\r\n</div>\r\n<div class=\"text-center\">\r\n  <button class=\"btn btn-primary\" routerLink=\"/store\">Continue Shopping</button>\r\n  <button class=\"btn btn-secondary\" routerLink=\"/checkout\"\r\n          [disabled]=\"cart.selections.length == 0\">\r\n    Checkout\r\n  </button>\r\n</div>\r\n"

/***/ }),

/***/ "./ClientApp/app/store/cartDetail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_cart_model__ = __webpack_require__("./ClientApp/app/models/cart.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CartDetailComponent = (function () {
    function CartDetailComponent(cart) {
        this.cart = cart;
    }
    CartDetailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            template: __webpack_require__("./ClientApp/app/store/cartDetail.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__models_cart_model__["a" /* Cart */]])
    ], CartDetailComponent);
    return CartDetailComponent;
}());



/***/ }),

/***/ "./ClientApp/app/store/cartSummary.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"text-right p-1\">\r\n  <small *ngIf=\"itemCount > 0; else empty\">\r\n    ({{ itemCount }} item(s) {{ totalPrice | currency:\"USD\":true }})\r\n  </small>\r\n  <button class=\"btn btn-sm ml-1\"\r\n          [disabled]=\"itemCount == 0\"\r\n          routerLink=\"/cart\">\r\n    <i class=\"fa fa-shopping-cart\"></i>\r\n  </button>\r\n</div>\r\n\r\n<ng-template #empty>\r\n  <small class=\"text-muted\">\r\n    (cart is empty)\r\n  </small>\r\n</ng-template>\r\n"

/***/ }),

/***/ "./ClientApp/app/store/cartSummary.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartSummaryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_cart_model__ = __webpack_require__("./ClientApp/app/models/cart.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CartSummaryComponent = (function () {
    function CartSummaryComponent(cart) {
        this.cart = cart;
    }
    Object.defineProperty(CartSummaryComponent.prototype, "itemCount", {
        get: function () {
            return this.cart.itemCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartSummaryComponent.prototype, "totalPrice", {
        get: function () {
            return this.cart.totalPrice;
        },
        enumerable: true,
        configurable: true
    });
    CartSummaryComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "store-cartsummary",
            template: __webpack_require__("./ClientApp/app/store/cartSummary.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__models_cart_model__["a" /* Cart */]])
    ], CartSummaryComponent);
    return CartSummaryComponent;
}());



/***/ }),

/***/ "./ClientApp/app/store/categoryFilter.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"m-1\">\r\n  <button class=\"btn btn-outline-primary btn-block\"\r\n          (click)=\"setCurrentCategory(null)\">\r\n    All Categories\r\n  </button>\r\n  <button *ngFor=\"let category of categories\"\r\n          class=\"btn btn-outline-primary btn-block\"\r\n          [class.active]=\"currentCategory == category\"\r\n          (click)=\"setCurrentCategory(category)\">\r\n    {{category}}\r\n  </button>\r\n</div>\r\n"

/***/ }),

/***/ "./ClientApp/app/store/categoryFilter.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryFilterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_repository__ = __webpack_require__("./ClientApp/app/models/repository.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CategoryFilterComponent = (function () {
    function CategoryFilterComponent(repo) {
        this.repo = repo;
    }
    Object.defineProperty(CategoryFilterComponent.prototype, "categories", {
        get: function () {
            return this.repo.categories;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoryFilterComponent.prototype, "currentCategory", {
        get: function () {
            return this.repo.filter.category;
        },
        enumerable: true,
        configurable: true
    });
    CategoryFilterComponent.prototype.setCurrentCategory = function (newCategory) {
        this.repo.filter.category = newCategory;
        this.repo.getProducts();
    };
    CategoryFilterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "store-categoryfilter",
            template: __webpack_require__("./ClientApp/app/store/categoryFilter.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */]])
    ], CategoryFilterComponent);
    return CategoryFilterComponent;
}());



/***/ }),

/***/ "./ClientApp/app/store/checkout/checkoutDetails.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"navbar bg-inverse \">\r\n  <a class=\"navbar-brand text-white\">SPORTS STORE</a>\r\n</div>\r\n\r\n<h2 class=\"text-center mt-1\">Step 1: Your Details</h2>\r\n\r\n<form novalidate #detailsForm=\"ngForm\">\r\n  <div class=\"form-group\">\r\n    <label>Name</label>\r\n    <input #name=\"ngModel\" name=\"name\" class=\"form-control\"\r\n           [(ngModel)]=\"order.name\" required />\r\n    <div *ngIf=\"name.invalid\" class=\"text-danger\">\r\n      Please enter your name\r\n    </div>\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label>Address</label>\r\n    <input #address=\"ngModel\" name=\"street\" class=\"form-control\"\r\n           [(ngModel)]=\"order.address\" required />\r\n    <div *ngIf=\"address.invalid\" class=\"text-danger\">\r\n      Please enter your address\r\n    </div>\r\n  </div>\r\n  <div class=\"text-center pt-2\">\r\n    <button class=\"btn btn-outline-primary\" routerLink=\"/cart\">Back</button>\r\n    <button class=\"btn btn-danger\" [disabled]=\"detailsForm.invalid\"\r\n            routerLink=\"/checkout/step2\">\r\n      Next\r\n    </button>\r\n  </div>\r\n</form>\r\n"

/***/ }),

/***/ "./ClientApp/app/store/checkout/checkoutDetails.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckoutDetailsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_order_model__ = __webpack_require__("./ClientApp/app/models/order.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CheckoutDetailsComponent = (function () {
    function CheckoutDetailsComponent(router, order) {
        this.router = router;
        this.order = order;
        if (order.products.length == 0) {
            this.router.navigateByUrl("/cart");
        }
    }
    CheckoutDetailsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            template: __webpack_require__("./ClientApp/app/store/checkout/checkoutDetails.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_2__models_order_model__["a" /* Order */]])
    ], CheckoutDetailsComponent);
    return CheckoutDetailsComponent;
}());



/***/ }),

/***/ "./ClientApp/app/store/checkout/checkoutPayment.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"navbar bg-inverse \">\r\n  <a class=\"navbar-brand text-white\">SPORTS STORE</a>\r\n</div>\r\n\r\n<h2 class=\"text-center mt-1\">Step 2: Payment</h2>\r\n\r\n<form novalidate #paymentForm=\"ngForm\">\r\n  <div class=\"form-group\">\r\n    <label>Card Number</label>\r\n    <input #cardNumber=\"ngModel\" name=\"cardNumber\" class=\"form-control\"\r\n           [(ngModel)]=\"order.payment.cardNumber\" required />\r\n    <div *ngIf=\"cardNumber.invalid\" class=\"text-danger\">\r\n      Please enter your card number\r\n    </div>\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label>Card Expiry</label>\r\n    <input #cardExpiry=\"ngModel\" name=\"cardExpiry\" class=\"form-control\"\r\n           [(ngModel)]=\"order.payment.cardExpiry\" required />\r\n    <div *ngIf=\"cardExpiry.invalid\" class=\"text-danger\">\r\n      Please enter your card expiry\r\n    </div>\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label>Security Code</label>\r\n    <input #cardCode=\"ngModel\" name=\"cardCode\" class=\"form-control\"\r\n           [(ngModel)]=\"order.payment.cardSecurityCode\" required />\r\n    <div *ngIf=\"cardCode.invalid\" class=\"text-danger\">\r\n      Please enter your security code\r\n    </div>\r\n  </div>\r\n  <div class=\"text-center pt-2\">\r\n    <button class=\"btn btn-outline-primary\" routerLink=\"/checkout/step1\">\r\n      Back\r\n    </button>\r\n    <button class=\"btn btn-danger\" [disabled]=\"paymentForm.invalid\"\r\n            routerLink=\"/checkout/step3\">\r\n      Next\r\n    </button>\r\n  </div>\r\n</form>\r\n"

/***/ }),

/***/ "./ClientApp/app/store/checkout/checkoutPayment.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckoutPaymentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_order_model__ = __webpack_require__("./ClientApp/app/models/order.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CheckoutPaymentComponent = (function () {
    function CheckoutPaymentComponent(router, order) {
        this.router = router;
        this.order = order;
        if (order.name == null || order.address == null) {
            router.navigateByUrl("/checkout/step1");
        }
    }
    CheckoutPaymentComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            template: __webpack_require__("./ClientApp/app/store/checkout/checkoutPayment.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_2__models_order_model__["a" /* Order */]])
    ], CheckoutPaymentComponent);
    return CheckoutPaymentComponent;
}());



/***/ }),

/***/ "./ClientApp/app/store/checkout/checkoutSummary.component.html":
/***/ (function(module, exports) {

module.exports = "<h2 class=\"text-center\">Summary</h2>\r\n\r\n<div class=\"container\">\r\n  <table class=\"table m-2\">\r\n    <tr><th>Name</th><td>{{order.name}}</td></tr>\r\n    <tr><th>Address</th><td>{{order.address}}</td></tr>\r\n    <tr><th>Products</th><td>{{order.cart.itemCount}}</td></tr>\r\n    <tr>\r\n      <th>Total Price</th>\r\n      <td>{{order.cart.totalPrice | currency:USD:true }}</td>\r\n    </tr>\r\n  </table>\r\n  <div class=\"text-center pt-2\">\r\n    <button class=\"btn btn-outline-primary\" routerLink=\"/checkout/step2\">\r\n      Back\r\n    </button>\r\n    <button class=\"btn btn-danger\" (click)=\"submitOrder()\">\r\n      Place Order\r\n    </button>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./ClientApp/app/store/checkout/checkoutSummary.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckoutSummaryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_order_model__ = __webpack_require__("./ClientApp/app/models/order.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CheckoutSummaryComponent = (function () {
    function CheckoutSummaryComponent(router, order) {
        this.router = router;
        this.order = order;
        if (order.payment.cardNumber == null
            || order.payment.cardExpiry == null
            || order.payment.cardSecurityCode == null) {
            router.navigateByUrl("/checkout/step2");
        }
    }
    CheckoutSummaryComponent.prototype.submitOrder = function () {
        this.order.submit();
        this.router.navigateByUrl("/checkout/confirmation");
    };
    CheckoutSummaryComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            template: __webpack_require__("./ClientApp/app/store/checkout/checkoutSummary.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_2__models_order_model__["a" /* Order */]])
    ], CheckoutSummaryComponent);
    return CheckoutSummaryComponent;
}());



/***/ }),

/***/ "./ClientApp/app/store/checkout/orderConfirmation.component.html":
/***/ (function(module, exports) {

module.exports = "<h2 class=\"text-center\">Order Confirmation</h2>\r\n\r\n<div class=\"container\">\r\n  <table *ngIf=\"order.orderConfirmation; else nodata\" class=\"table m-2\">\r\n    <tr><th>Order</th><td>{{order.orderConfirmation.orderId}}</td></tr>\r\n    <tr><th>Price</th><td>{{order.orderConfirmation.amount}}</td></tr>\r\n    <tr><th>Payment Code</th><td>{{order.orderConfirmation.authCode}}</td></tr>\r\n  </table>\r\n  <div class=\"text-center\">\r\n    <button class=\"btn btn-primary\" routerLink=\"/\">Done</button>\r\n  </div>\r\n\r\n  <ng-template #nodata>\r\n    <h3 class=\"text-center\">Submitting Order...</h3>\r\n  </ng-template>\r\n</div>\r\n"

/***/ }),

/***/ "./ClientApp/app/store/checkout/orderConfirmation.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderConfirmationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_order_model__ = __webpack_require__("./ClientApp/app/models/order.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OrderConfirmationComponent = (function () {
    function OrderConfirmationComponent(router, order) {
        this.router = router;
        this.order = order;
        if (!order.submitted) {
            router.navigateByUrl("/checkout/step3");
        }
    }
    OrderConfirmationComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            template: __webpack_require__("./ClientApp/app/store/checkout/orderConfirmation.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_2__models_order_model__["a" /* Order */]])
    ], OrderConfirmationComponent);
    return OrderConfirmationComponent;
}());



/***/ }),

/***/ "./ClientApp/app/store/pagination.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"pages.length > 1\" class=\"text-right my-2\">\r\n  <button *ngFor=\"let page of pages\"\r\n          class=\"btn btn-outline-primary mx-1\"\r\n          [class.active]=\"current == page\"\r\n          (click)=\"changePage(page)\">\r\n    {{page}}\r\n  </button>\r\n</div>\r\n"

/***/ }),

/***/ "./ClientApp/app/store/pagination.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaginationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_repository__ = __webpack_require__("./ClientApp/app/models/repository.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PaginationComponent = (function () {
    function PaginationComponent(repo) {
        this.repo = repo;
    }
    Object.defineProperty(PaginationComponent.prototype, "current", {
        get: function () {
            return this.repo.pagination.currentPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "pages", {
        get: function () {
            if (this.repo.products != null) {
                return Array(Math.ceil(this.repo.products.length
                    / this.repo.pagination.productsPerPage))
                    .fill(0).map(function (x, i) { return i + 1; });
            }
            else {
                return [];
            }
        },
        enumerable: true,
        configurable: true
    });
    PaginationComponent.prototype.changePage = function (newPage) {
        this.repo.pagination.currentPage = newPage;
    };
    PaginationComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "store-pagination",
            template: __webpack_require__("./ClientApp/app/store/pagination.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */]])
    ], PaginationComponent);
    return PaginationComponent;
}());



/***/ }),

/***/ "./ClientApp/app/store/productList.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"products?.length > 0; else nodata\">\r\n  <div *ngFor=\"let product of products\" class=\"card card-outline-primary m-1\">\r\n    <div class=\"card-header\">\r\n      <span class=\"h4\">\r\n        {{product.name}}\r\n        <store-ratings [product]=\"product\"></store-ratings>\r\n      </span>\r\n      <span class=\"float-right badge badge-pill badge-primary\">\r\n        {{product.price  | currency:\"USD\":\"symbol\" }}\r\n      </span>\r\n    </div>\r\n    <div class=\"card-block\">\r\n      <span class=\"card-text p-a-1\">{{product.description}}</span>\r\n      <button class=\"float-right btn btn-sm btn-success\"\r\n              (click)=\"addToCart(product)\">\r\n        Add to Cart\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<ng-template #nodata>\r\n  <h4 class=\"m-1\">Waiting for data...</h4>\r\n</ng-template>\r\n"

/***/ }),

/***/ "./ClientApp/app/store/productList.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_repository__ = __webpack_require__("./ClientApp/app/models/repository.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_cart_model__ = __webpack_require__("./ClientApp/app/models/cart.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProductListComponent = (function () {
    function ProductListComponent(repo, cart) {
        this.repo = repo;
        this.cart = cart;
    }
    Object.defineProperty(ProductListComponent.prototype, "products", {
        get: function () {
            if (this.repo.products != null && this.repo.products.length > 0) {
                var pageIndex = (this.repo.pagination.currentPage - 1)
                    * this.repo.pagination.productsPerPage;
                return this.repo.products.slice(pageIndex, pageIndex + this.repo.pagination.productsPerPage);
            }
        },
        enumerable: true,
        configurable: true
    });
    ProductListComponent.prototype.addToCart = function (product) {
        this.cart.addProduct(product);
    };
    ProductListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "store-product-list",
            template: __webpack_require__("./ClientApp/app/store/productList.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */], __WEBPACK_IMPORTED_MODULE_2__models_cart_model__["a" /* Cart */]])
    ], ProductListComponent);
    return ProductListComponent;
}());



/***/ }),

/***/ "./ClientApp/app/store/productSelection.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row bg-dark\">\r\n  <div class=\"col\">\r\n    <div class=\"navbar navbar-dark\">\r\n      <a class=\"navbar-brand text-white\">\r\n        SPORTS STORE\r\n      </a>\r\n    </div>\r\n  </div>\r\n  <div class=\"col-3 text-white mr-1 text-right\">\r\n    <store-cartsummary></store-cartsummary>\r\n  </div>\r\n</div>\r\n<div class=\"row no-gutters\">\r\n  <div class=\"col-3\">\r\n    <store-categoryfilter></store-categoryfilter>\r\n  </div>\r\n  <div class=\"col\">\r\n    <store-product-list></store-product-list>\r\n    <store-pagination></store-pagination>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./ClientApp/app/store/productSelection.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductSelectionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ProductSelectionComponent = (function () {
    function ProductSelectionComponent() {
    }
    ProductSelectionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "store-products",
            template: __webpack_require__("./ClientApp/app/store/productSelection.component.html")
        })
    ], ProductSelectionComponent);
    return ProductSelectionComponent;
}());



/***/ }),

/***/ "./ClientApp/app/store/ratings.component.html":
/***/ (function(module, exports) {

module.exports = "<span class=\"h6 ml-1\">\r\n  <i *ngFor=\"let s of stars\"\r\n     [class]=\"s ? 'fa fa-star' : 'fa fa-star-o'\"\r\n     [style.color]=\"s ? 'goldenrod' : 'gray'\">\r\n  </i>\r\n</span>\r\n"

/***/ }),

/***/ "./ClientApp/app/store/ratings.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RatingsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_product_model__ = __webpack_require__("./ClientApp/app/models/product.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RatingsComponent = (function () {
    function RatingsComponent() {
    }
    Object.defineProperty(RatingsComponent.prototype, "stars", {
        get: function () {
            if (this.product != null && this.product.ratings != null) {
                var total = this.product.ratings.map(function (r) { return r.stars; })
                    .reduce(function (prev, curr) { return prev + curr; }, 0);
                var count_1 = Math.round(total / this.product.ratings.length);
                return Array(5).fill(false).map(function (value, index) {
                    return index < count_1;
                });
            }
            else {
                return [];
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__models_product_model__["a" /* Product */])
    ], RatingsComponent.prototype, "product", void 0);
    RatingsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "store-ratings",
            template: __webpack_require__("./ClientApp/app/store/ratings.component.html")
        })
    ], RatingsComponent);
    return RatingsComponent;
}());



/***/ }),

/***/ "./ClientApp/app/store/store.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoreModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cartSummary_component__ = __webpack_require__("./ClientApp/app/store/cartSummary.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__categoryFilter_component__ = __webpack_require__("./ClientApp/app/store/categoryFilter.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pagination_component__ = __webpack_require__("./ClientApp/app/store/pagination.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__productList_component__ = __webpack_require__("./ClientApp/app/store/productList.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ratings_component__ = __webpack_require__("./ClientApp/app/store/ratings.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__productSelection_component__ = __webpack_require__("./ClientApp/app/store/productSelection.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__cartDetail_component__ = __webpack_require__("./ClientApp/app/store/cartDetail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__checkout_checkoutDetails_component__ = __webpack_require__("./ClientApp/app/store/checkout/checkoutDetails.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__checkout_checkoutPayment_component__ = __webpack_require__("./ClientApp/app/store/checkout/checkoutPayment.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__checkout_checkoutSummary_component__ = __webpack_require__("./ClientApp/app/store/checkout/checkoutSummary.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__checkout_orderConfirmation_component__ = __webpack_require__("./ClientApp/app/store/checkout/orderConfirmation.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var StoreModule = (function () {
    function StoreModule() {
    }
    StoreModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_2__cartSummary_component__["a" /* CartSummaryComponent */], __WEBPACK_IMPORTED_MODULE_3__categoryFilter_component__["a" /* CategoryFilterComponent */],
                __WEBPACK_IMPORTED_MODULE_4__pagination_component__["a" /* PaginationComponent */], __WEBPACK_IMPORTED_MODULE_5__productList_component__["a" /* ProductListComponent */], __WEBPACK_IMPORTED_MODULE_6__ratings_component__["a" /* RatingsComponent */],
                __WEBPACK_IMPORTED_MODULE_7__productSelection_component__["a" /* ProductSelectionComponent */], __WEBPACK_IMPORTED_MODULE_8__cartDetail_component__["a" /* CartDetailComponent */],
                __WEBPACK_IMPORTED_MODULE_11__checkout_checkoutDetails_component__["a" /* CheckoutDetailsComponent */], __WEBPACK_IMPORTED_MODULE_12__checkout_checkoutPayment_component__["a" /* CheckoutPaymentComponent */],
                __WEBPACK_IMPORTED_MODULE_13__checkout_checkoutSummary_component__["a" /* CheckoutSummaryComponent */], __WEBPACK_IMPORTED_MODULE_14__checkout_orderConfirmation_component__["a" /* OrderConfirmationComponent */]],
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_9__angular_router__["c" /* RouterModule */], __WEBPACK_IMPORTED_MODULE_10__angular_forms__["a" /* FormsModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_7__productSelection_component__["a" /* ProductSelectionComponent */]]
        })
    ], StoreModule);
    return StoreModule;
}());



/***/ }),

/***/ "./ClientApp/boot.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_module__ = __webpack_require__("./ClientApp/app/app.module.ts");


var bootApplication = function () {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_app_module__["a" /* AppModule */]);
};
if (true) {
    module["hot"].accept();
    module["hot"].dispose(function () {
        var oldRootElem = document.querySelector("app-root");
        var newRootElem = document.createElement("app-root");
        oldRootElem.parentNode.insertBefore(newRootElem, oldRootElem);
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().destroy();
    });
}
if (document.readyState === "complete") {
    bootApplication();
}
else {
    document.addEventListener("DOMContentLoaded", bootApplication);
}


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./node_modules/webpack-hot-middleware/client.js?path=__webpack_hmr&dynamicPublicPath=true");
module.exports = __webpack_require__("./ClientApp/boot.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map