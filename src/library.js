/**
 * @fileoverview Contains the main application object that is the heart of the
 *               JavaScript structure.
 *               
 * @author Ciro Cesar Maciel <ciro.maciel@c37.co>
 */


/**
 * 
 * @namespace egg
 * 
 */
egg = (function () {

    'use strict';

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    var _libraries = new egg.extension.data.dictionary();


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

            /**
             * O objeto Biblioteca
             * 
             * @namespace library
             * 
             */
            var library = {};

            egg.extension.object.assign(library, {
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
                global: new egg.extension.data.dictionary(),
                event: new egg.extension.pubsub(),
                module: new egg.extension.module(library),
                get main() {
                    return library.module.main;
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
         * @returns {egg} The application object.
         */
        reset: function (name) {
            return this;
        },
        /**
         * Stops all modules and clears all saved state
         * 
         * @memberOf egg
         * 
         * @function destroy
         * @param {String} name The name of the event to listen for
         * @returns {egg} The application object.
         */
        destroy: function (name) {
            return this;
        },
        /**
         * The one global object for Egg structure.
         * @namespace egg.extension
         */
        extension: egg.extension
    };


//    /**
//     * 
//     * @memberOf egg
//     * 
//     * @param {type} name
//     * @returns {library}
//     */
//    function library(name) {
//
//        if (!name) {
//            throw new Error('Library name is not defined.');
//        }
//        if (!_libraries.get(name)) {
//            throw new Error('Library ' + name + ' not been added.');
//        }
//
//        return _libraries.get(name);
//
//    }    

//    egg.extension.object.assign(library, {
//        /**
//         * Initializes the application
//         * 
//         * @memberOf egg
//         * 
//         * @function create
//         * @param {Object} params Configuration object
//         * @returns {library} The library object.
//         */
//        create: function (params) {
//
//            if (!params.name) {
//                throw new Error('Library name is required.');
//            }
//
//            /**
//             * O objeto Biblioteca
//             * 
//             * @namespace library
//             * 
//             */
//            var library = {};
//
//            egg.extension.object.assign(library, {
//                /**
//                 * Adds a new event handler for a particular type of event.
//                 * 
//                 * @memberOf library
//                 * 
//                 * @function init
//                 * @instance
//                 * @param {String} event The name of the event to listen for
//                 * @param {Function} handler The function to call when the event occurs
//                 * @returns {library}
//                 * 
//                 */
//                init: function () {
//
//                    this.module.startAll();
//
//                    return this;
//                },
//                global: new egg.extension.data.dictionary(),
//                event: new egg.extension.pubsub(),
//                module: new egg.extension.module(library),
//                get main() {
//                    return library.module.main;
//                }
//            });
//
//            // para as variaveis globais
//            for (name in params) {
//                library.global.add(name, params[name]);
//            }
//
//            // add a nova library para o dicionario
//            _libraries.add(params.name, library);
//
//            return library;
//
//        },
//        /**
//         * Stops all modules and clears all saved state
//         * 
//         * @memberOf egg
//         * 
//         * @function reset
//         * @param {String} name The name of the event to listen for
//         * @returns {egg} The application object.
//         */
//        reset: function (name) {
//            return this;
//        },
//        /**
//         * Stops all modules and clears all saved state
//         * 
//         * @memberOf egg
//         * 
//         * @function destroy
//         * @param {String} name The name of the event to listen for
//         * @returns {egg} The application object.
//         */
//        destroy: function (name) {
//            return this;
//        },
//        /**
//         * The one global object for Egg structure.
//         * @namespace egg.extension
//         */
//        extension: egg.extension
//    });

//    return library;

})();