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

    var _libraries = new egg.extension.data.dictionary();


    function library(name) {

        if (!name) {
            throw new Error('Library name is not defined.');
        }
        if (!_libraries.get(name)) {
            throw new Error('Library ' + name + ' not been added.');
        }

        return _libraries.get(name);

    }

    egg.extension.object.assign(library, {
        /**
         * Initializes the application
         * 
         * @memberOf egg
         * 
         * @function init
         * @param {Object} [params] Configuration object
         * @returns {egg} The library object.
         */
        create: function (params) {

            if (!params.name) {
                throw new Error('Library name is required.');
            }

            var library = {};

            egg.extension.object.assign(library, {
                init: function () {

                    this.module.startAll();

                    return this;
                },
                global: new egg.extension.data.dictionary(),
                event: new egg.extension.pubsub(),
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
                _error: function (exception) {
                    if (library.global.get('debug')) {
                        throw exception;
                    } else {
                        library.event.notify('error', {
                            exception: exception
                        });

                    }
                },
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
        reset: function (name) {
            return this;
        },
        /**
         * Stops all modules and clears all saved state
         * 
         * @memberOf egg
         * 
         * @function destroy
         * @returns {egg} The application object.
         */
        destroy: function (name) {
            return this;
        },
        extension: egg.extension
    });

    return library;

})();