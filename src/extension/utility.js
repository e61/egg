/**
 * @fileoverview Contains the main application object that is the heart of the
 *               JavaScript structure.
 *               
 * @author Ciro Cesar Maciel <ciro.maciel@c37.co>
 *               
 */

/**
 * The one global object for Egg structure.
 * @namespace egg.extension.utility
 */
egg.extension.utility = {
    /**
     * Math is a built-in object that has properties and methods for mathematical constants and functions. Not a function object.
     * @namespace egg.extension.utility.math
     * 
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math|JavaScript - Math}
     * 
     */
    math: {
        /**
         * A universally unique identifier (UUID) is an identifier standard used
         * in software construction. A UUID is simply a 128-bit value. The 
         * meaning of each bit is defined by any of several variants.
         * 
         * @memberOf egg.extension.utility.math
         * @function uuid
         * @param {Number} length The name of the event to listen for
         * @param {Number} radix The function to call when the event occurs
         * @returns {String} 
         * 
         * @see {@link https://en.wikipedia.org/wiki/Universally_unique_identifier|Universally unique identifier - Wikipedia}
         * @see {@link http://www.ietf.org/rfc/rfc4122.txt|Universally Unique IDentifier}
         * 
         * @example
         * var uuid = context.utility.math.uuid(9, 16);
         * console.log(uuid); // 743d8a7e2
         * 
         */
        uuid: function (length, radix) {
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''),
                uuid = [],
                i;
            radix = radix || chars.length;

            if (length) {
                for (i = 0; i < length; i++)
                    uuid[i] = chars[0 | Math.random() * radix];
            } else {
                var r;

                uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                uuid[14] = '4';

                for (i = 0; i < 36; i++) {
                    if (!uuid[i]) {
                        r = 0 | Math.random() * 16;
                        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                    }
                }
            }

            return uuid.join('').toLowerCase();
        },
        /**
         * Parses a string or number argument and returns a floating point number with number of digits format.
         * 
         * @memberOf egg.extension.utility.math
         * @function toFloat
         * @param {String|Number} float A string or number that represents the value you want to parse
         * @param {Number} decimal  The number of digits to appear after the decimal point
         * @returns {Number} Returns a floating point number
         * 
         * @see {@link https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/parseFloat|parseFloat()}
         * @see {@link https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed|Number.prototype.toFixed()}
         * 
         * @example
         * var formatedNumber = context.utility.math.toFloat('938.56536157', 3);
         * console.log(formatedNumber); // 938.565
         * 
         */
        toFloat: function (float, decimal) {
            return parseFloat(float).toFixed(decimal);
        },
        // Converts from degrees to radians.
        toRadians: function (degrees) {
            return degrees * (Math.PI / 180);
        },
        // Converts from radians to degrees.
        toDegrees: function (radians) {
            return radians * (180 / Math.PI);
        }
    },
    /**
     * The one global object for Egg structure.
     * @namespace egg.extension.utility.string
     */
    string: {},
    /**
     * The one global object for Egg structure.
     * @namespace egg.extension.utility.color
     */
    color: {
        random: function () {
            // https://github.com/addyosmani/largescale-demo/blob/master/js/utils/utils.js#L49
            var letters = '0123456789ABCDEF'.split(''),
                color = '#', i = 0;
            for (i = 0; i < 6; i++) {
                color += letters[Math.round(Math.random() * 15)];
            }
            return color;
        }
    }
}