
/**
 * @fileoverview Modules are an integral piece of any robust application's 
 * architecture and typically help in keeping the units of code for a project 
 * both cleanly separated and organized.
 * 
 * @see {@link http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript|Module Pattern Pattern}
 * 
 * @author Ciro Cesar Maciel <ciro.maciel@c37.co>
 */

/**
 * The Module pattern was originally defined as a way to provide both private 
 * and public encapsulation for classes in conventional software engineering.
 * <br><br>
 * In JavaScript, the Module pattern is used to further emulate the concept of 
 * classes in such a way that we're able to include both public/private methods 
 * and variables inside a single object, thus shielding particular parts from 
 * the global scope. What this results in is a reduction in the likelihood of 
 * our function names conflicting with other functions defined in additional 
 * scripts on the page.
 * 
 * @namespace egg.module
 */
egg.extension.module = (function () {

    'use strict';

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    /**
     * Wraps all methods on an object with try-catch so that objects don't need
     * to worry about trapping their own errors. When an error occurs, the
     * error event is fired with the error information.
     * @see http://www.nczonline.net/blog/2009/04/28/javascript-error-handling-anti-pattern/
     * @param {Object} data Any object whose public methods should be wrapped.
     * @param {string} objectName The name that should be reported for the object
     *                            when an error occurs.
     * @returns {void}
     * @private
     */
    function captureErrors(library, data) {

        var object = data.instance,
            objectName = data.name;

        var propertyName,
            propertyValue;

        /* eslint-disable guard-for-in, no-loop-func */
        for (propertyName in object) {
            propertyValue = object[propertyName];

            // only do this for methods, be sure to check before making changes!
            if (typeof propertyValue === 'function') {
                /*
                 * This creates a new function that wraps the original function
                 * in a try-catch. The outer function executes immediately with
                 * the name and actual method passed in as values. This allows
                 * us to create a function with specific information even though
                 * it's inside of a loop.
                 */
                object[propertyName] = (function (methodName, method) {
                    return function () {
                        var errorPrefix = objectName + '.' + methodName + '() - ';
                        try {
                            return method.apply(this, arguments);
                        } catch (ex) {
                            ex.methodName = methodName;
                            ex.objectName = objectName;
                            ex.name = errorPrefix + ex.name;
                            ex.message = errorPrefix + ex.message;
                            library._error(ex);
                        }
                    };

                }(propertyName, propertyValue));
            }
        }
        /* eslint-enable guard-for-in, no-loop-func */
    }

    /**
     * Creates a new event delegate and sets up its event handlers.
     * @param {Array} delegates The array of event delegates to add to.
     * @param {HTMLElement} element The HTML element to bind to.
     * @param {Object} handler The handler object for the delegate (either the
     *		module instance or behavior instance).
     * @returns {void}
     * @private
     */
    function createAndBindEventDelegate(delegates, element, handler, name) {

        var delegate = new egg.extension.delegate(element, handler, name);
        delegates.push(delegate);

//        debugger;

        delegate.attachEvents();

    }

    /**
     * Binds the user events listed in the module to its toplevel element
     * @param {Box.Application~ModuleInstanceData} data Events will be bound to the module defined in the Instance object
     * @returns {void}
     * @private
     */
    function bindEventListeners(library, data) {

        var delegates = data.delegates;

        // bind the module events
//        createAndBindEventDelegate(delegates, data.element, data.instance);
//        createAndBindEventDelegate(delegates, data.element, _event, name);
        createAndBindEventDelegate(delegates, data.element, library.event, data.name);

    }

    /**
     * Unbinds the user events listed in the module
     * 
     * @memberOf egg.module
     * 
     * @function unbindEventListeners
     * @param {Box.Application~ModuleInstanceData} instanceData Events will be unbound from the module defined in the Instance object
     * @returns {void}
     * @private
     */
    function unbindEventListeners(instanceData) {

        var eventDelegates = instanceData.eventDelegates;

        for (var i = 0; i < eventDelegates.length; i++) {
            eventDelegates[i].detachEvents();
        }

        instanceData.eventDelegates = [];
    }


    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    function Module(library) {
        this._library = library;
        this._registries = {};
        this._instances = {};
    }

    Module.prototype = {
        constructor: Module,
        main: undefined,
        /**
         * Adds a new event handler for a particular type of event.
         * 
         * @memberOf egg.module
         * 
         * @function add
         * @param {String} event The name of the event to listen for
         * @param {Boolean} main The function to call when the event occurs
         * @param {Function} creator The function to call when the event occurs
         * @returns {egg.module}
         * 
         */
        add: function (name, main, creator) {

            if (typeof this._registries[name] !== 'undefined') {
                error(this._library, new Error('Module ' + name + ' has already been added.'));
                return this;
            }

            this._registries[name] = {
                creator: creator,
                main: main
            };

            return this;

        },
        /**
         * Adds a new event handler for a particular type of event.
         * 
         * @memberOf egg.module
         * 
         * @function get
         * @param {String} name The name of the event to listen for
         * @returns {egg.module}
         * 
         */
        get: function (name) {

            if (typeof this._registries[name] === 'undefined') {
                error(new Error('Module ' + name + ' not been added.'));
                return this;
            }

            if (!this._instances[name]) {
                this.start(name);
            }

            return this._instances[name].instance;

        },
        /**
         * Adds a new event handler for a particular type of event.
         * 
         * @memberOf egg.module
         * 
         * @function start
         * @param {String} name The name of the event to listen for
         * @returns {egg.module}
         * 
         */
        start: function (name) {

            if ((this._registries[name]) && (!this._instances[name])) {
                
                var element = egg.extension.dom.query(document.documentElement, '[data-module~=' + name + ']'),
                    context = new egg.extension.context(this._library, element, name);

                var module = this._registries[name],
                    data = {
                        instance: module.creator(context),
                        element: element,
                        name: name,
                        delegates: []
                    };

                if (!this._library.global.get('debug')) {
                    captureErrors(this._library, data);
                }

                if (element) {
                    bindEventListeners(this._library, data);
                }

                this._instances[name] = data;

                if (module.main) {
                    this.main = data.instance;
                }

            }

            return this;

        },
        /**
         * Adds a new event handler for a particular type of event.
         * 
         * @memberOf egg.module
         * 
         * @function startAll
         * @returns {egg.module}
         * 
         */
        startAll: function () {

            for (name in this._registries) {
                this.start(name);
            }

            return this;

        },
        /**
         * Adds a new event handler for a particular type of event.
         * 
         * @memberOf egg.module
         * 
         * @function stop
         * @param {String} name The name of the event to listen for
         * @returns {egg.module}
         * 
         */
        stop: function (name) {



            return this;
        },
        /**
         * Adds a new event handler for a particular type of event.
         * 
         * @memberOf egg.module
         * 
         * @function stopAll
         * @returns {egg.module}
         * 
         */
        stopAll: function () {



            return this;
        },
        /**
         * Signals that an error has occurred. If in development mode, an error
         * is thrown. If in production mode, an event is fired.
         * 
         * @memberOf egg.module
         * 
         * @function error
         * @param {Error} [exception] The exception object to use.
         * @returns {void}
         * @private
         */
        error: function (exception) {

            if (this._library.global.get('debug')) {
                throw exception;
            } else {
                this._library.event.notify('error', {
                    exception: exception
                });

            }

        }
    }

    return Module;















//    var _module = {
//        registry: {},
//        instance: {}
//    };    

//    return {
//        main: undefined,
//        /**
//         * Adds a new event handler for a particular type of event.
//         * 
//         * @memberOf egg.module
//         * 
//         * @function add
//         * @param {String} event The name of the event to listen for
//         * @param {Boolean} main The function to call when the event occurs
//         * @param {Function} creator The function to call when the event occurs
//         * @returns {egg.module}
//         * 
//         */
//        add: function (name, main, creator) {
//
//            if (typeof _module.registry[name] !== 'undefined') {
//                error(new Error('Module ' + name + ' has already been added.'));
//                return this;
//            }
//
//            _module.registry[name] = {
//                creator: creator,
//                main: main,
//                counter: 0 // increments for each new instance,
//            };
//
//            return this;
//
//        },
//        /**
//         * Adds a new event handler for a particular type of event.
//         * 
//         * @memberOf egg.module
//         * 
//         * @function get
//         * @param {String} name The name of the event to listen for
//         * @returns {egg.module}
//         * 
//         */
//        get: function (name) {
//
//            if (typeof _module.registry[name] === 'undefined') {
//                error(new Error('Module ' + name + ' not been added.'));
//                return this;
//            }
//
//            if (!_module.instance[name]) {
//                this.start(name);
//            }
//
//            return _module.instance[name].instance;
//
//        },
//        /**
//         * Adds a new event handler for a particular type of event.
//         * 
//         * @memberOf egg.module
//         * 
//         * @function start
//         * @param {String} name The name of the event to listen for
//         * @returns {egg.module}
//         * 
//         */
//        start: function (name) {
//
//            if ((_module.registry[name]) && (!_module.instance[name])) {
//
//                var element = egg.extension.dom.query(document.documentElement, '[data-module=' + name + ']'),
//                    context = new egg.extension.context(element, name, error);
//
//                var module = _module.registry[name],
//                    data = {
//                        instance: module.creator(context),
//                        element: element,
//                        name: name,
//                        delegates: []
//                    };
//
//                if (!egg.extension.global.get('debug')) {
//                    captureErrors(data);
//                }
//
//                if (element) {
//                    bindEventListeners(data);
//                }
//
//                _module.instance[name] = data;
//
//                if (module.main) {
//                    this.main = data.instance;
//                }
//
//            }
//
//            return this;
//
//        },
//        /**
//         * Adds a new event handler for a particular type of event.
//         * 
//         * @memberOf egg.module
//         * 
//         * @function startAll
//         * @returns {egg.module}
//         * 
//         */
//        startAll: function () {
//
//            for (name in _module.registry) {
//                this.start(name);
//            }
//
//            return this;
//
//        },
//        /**
//         * Adds a new event handler for a particular type of event.
//         * 
//         * @memberOf egg.module
//         * 
//         * @function stop
//         * @param {String} name The name of the event to listen for
//         * @returns {egg.module}
//         * 
//         */
//        stop: function (name) {
//
//
//
//            return this;
//        },
//        /**
//         * Adds a new event handler for a particular type of event.
//         * 
//         * @memberOf egg.module
//         * 
//         * @function stopAll
//         * @returns {egg.module}
//         * 
//         */
//        stopAll: function () {
//
//
//
//            return this;
//        }
//    };

}());