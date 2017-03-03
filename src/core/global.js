/**
 * @fileoverview Contains the main application object that is the heart of the
 *               JavaScript structure.
 */


/**
 * @memberOf egg.core
 * 
 * @class global
 * @static
 * @mixes egg.core.data.dictionary
 */
egg.core.global = (function () {
    'use strict';

    var _store = egg.core.data.dictionary.create();

    return _store;

}());