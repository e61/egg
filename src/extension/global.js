/**
 * @fileoverview Contains the main application object that is the heart of the
 *               JavaScript structure.
 */


/**
 * @memberOf egg.extension
 * 
 * @class global
 * @static
 * @mixes egg.extension.data.dictionary
 */
egg.extension.global = (function () {
    'use strict';

    var _store = egg.extension.data.dictionary.create();

    return _store;

}());