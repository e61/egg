/**
 * @fileoverview In computer science, a data structure is a particular way of 
 * organizing data in a computer so that it can be used efficiently. Data structures 
 * can implement one or more particular abstract data types(ADT), which are the 
 * means of specifying the contract of operations and their complexity.
 * 
 * @author Ciro Cesar Maciel <ciro.maciel@c37.co>
 * 
 * @see {@link https://en.wikipedia.org/wiki/Data_structure|Data structure}
 * 
 */

/**
 * Different kinds of data structures are suited to different kinds of applications, 
 * and some are highly specialized to specific tasks. For example, databases 
 * use B-tree indexes for small percentages of data retrieval and compilers and 
 * databases use dynamic hash tables as look up tables.
 * 
 * @namespace egg.core.data
 */
egg.core.data = {
    dictionary: (function () {

        "use strict";

        /**
         * In computer science, an associative array, map, symbol table, or dictionary 
         * is an abstract data type composed of a collection of (key, value) pairs, 
         * such that each possible key appears just once in the collection.
         * 
         * @memberOf egg.core.data
         * 
         * @class dictionary
         * 
         * @see {@link https://en.wikipedia.org/wiki/Associative_array|Dictionary}
         * 
         */
        function Dictionary() {
            this._store = [];
        }

        Dictionary.prototype = {
            constructor: Dictionary,
            /**
             * Adds a new event handler for a particular type of event.
             * 
             * @memberOf egg.core.data.dictionary
             * 
             * @function add
             * @instance
             * @param {String} event The name of the event to listen for
             * @param {Function} handler The function to call when the event occurs
             * @returns {void}
             * 
             */
            add: function (key, value) {
                return this._store[key] = value;
            },
            update: function (key, value) {
                return this._store[key] = value;
            },
            get: function (key) {
                if (key) {
                    return this._store[key];
                } else {
                    throw new Error('dictionary - get - key is not valid \n http://plane.c37.co/docs/errors.html#' + 'errorCode');
                }
            },
            has: function (key) {
                if (key) {
                    return (this._store[key] !== undefined);
                }
            },
            remove: function (key) {
                delete this._store[key];
            },
            count: function () {
                return Object.keys(this._store).length;
            },
            clear: function () {
                return this._store = [];
            },
            list: function () {
                var self = this;
                return Object.keys(this._store).map(function (key) {
                    return self._store[key];
                });
            }
        };

        /**
         * Adds a new event handler for a particular type of event.
         * @memberOf egg.core.data.dictionary
         * 
         * @function create
         * @returns {void}
         * 
         * @see egg.core.context
         * 
         * @example
         * var event = context.observer.create();
         * console.log(event); // Dispatcher{}
         */
        Dictionary.create = function () {
            return new Dictionary();
        }

        return Dictionary;

    })()
}