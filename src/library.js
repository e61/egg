/**
 * @fileoverview Contains the main application object that is the heart of the
 *               JavaScript structure.
 *               
 * @author Ciro Cesar Maciel <ciro.maciel@c37.co>
 */
egg = (function () {

    'use strict';

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    var _libraries = new egg.core.data.dictionary();


    return {
        /**
         * Initializes the application
         * 
         * @memberOf egg
         * 
         * @function create
         * @param {Object} params Configuration object
         * @returns {library} The library object.
         */
        create: function (params) {

            if (!params.name) {
                throw new Error('Library name is required.');
            }
            if (_libraries.get(params.name)) {
                throw new Error('Library ' + params.name + ' been added.');
            }

            /**
             * O objeto Biblioteca
             * 
             * @namespace library
             * 
             */
            var library = {};

            egg.core.object.assign(library, {
                /**
                 * Adds a new event handler for a particular type of event.
                 * 
                 * @memberOf library
                 * 
                 * @function init
                 * @instance
                 * @param {String} event The name of the event to listen for
                 * @param {Function} handler The function to call when the event occurs
                 * @returns {library}
                 * 
                 */
                init: function () {

                    this.module.startAll();

                    return this;
                },
                /**
                 * Adds a new event handler for a particular type of event.
                 * 
                 * @memberOf library
                 * 
                 * @instance
                 * @property {egg.core.data.dictionary} name description init
                 * 
                 */
                global: new egg.core.data.dictionary(),
                /**
                 * Adds a new event handler for a particular type of event.
                 * 
                 * @memberOf library
                 * 
                 * @instance
                 * @property {egg.core.dispatcher} name description init
                 * 
                 */
                event: new egg.core.dispatcher(),
                /**
                 * Adds a new event handler for a particular type of event.
                 * 
                 * @memberOf library
                 * 
                 * @instance
                 * @property {egg.core.module} name description init
                 * 
                 */
                module: new egg.core.module(library),
                /**
                 * Stops all modules and clears all saved state
                 * 
                 * @memberOf library
                 * 
                 * @instance
                 * @returns {Boolean} The application object.
                 */
                reset: function () {
                    return true;
                }
            });

            // para as variaveis globais
            for (name in params) {
                library.global.add(name, params[name]);
            }

            // add a nova library para o dicionario
            _libraries.add(params.name, library);

            return library;

        },
        /**
         * Initializes the application
         * 
         * @memberOf egg
         * 
         * @function get
         * @param {String} name nome da biblioteca
         * @returns {library} The library object.
         */
        get: function (name) {

            if (!name) {
                throw new Error('Library name is not defined.');
            }
            if (!_libraries.get(name)) {
                throw new Error('Library ' + name + ' not been added.');
            }

            return _libraries.get(name);

        },
        /**
         * Stops all modules and clears all saved state
         * 
         * @memberOf egg
         * 
         * @function reset
         * @param {String} name The name of the event to listen for
         * @returns {Boolean} The application object.
         */
        reset: function (name) {

            return true;
        },
        /**
         * Stops all modules and clears all saved state
         * 
         * @memberOf egg
         * 
         * @function destroy
         * @param {String} name The name of the event to listen for
         * @returns {Boolean} The application object.
         */
        destroy: function (name) {

            return true;
        },
        core: egg.core
    };

})();