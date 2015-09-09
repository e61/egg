/**
 * @fileoverview JavaScript is designed on a simple object-based paradigm. An 
 * object is a collection of properties, and a property is an association between 
 * a name and a value. A property's value can be a function, in which case the 
 * property is known as a method. In addition to objects that are predefined in 
 * the browser, you can define your own objects. This chapter describes how to 
 * use objects, properties, functions, and methods, and how to create your own 
 * objects.
 * 
 * @author Ciro Cesar Maciel <ciro.maciel@c37.co>
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects|Working with objects}
 * 
 */

/**
 * Objects in JavaScript, just as in many other programming languages, can be 
 * compared to objects in real life. The concept of objects in JavaScript can be 
 * understood with real life, tangible objects.
 * 
 * @namespace egg.extension.object
 */
egg.extension.object = {
    /**
     * The Object.assign() method is used to copy the values of all enumerable 
     * own properties from one or more source objects to a target object. It 
     * will return the target object.
     * 
     * @memberOf egg.extension.object
     * 
     * @param {Object} target The object to receive properties
     * @param {Object} source The object whose properties should be copied.
     * @returns {Object} The target object gets returned.
     * 
     * @see {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign|Object.assign()}
     * 
     */
    assign: function (target, source) {

        for (var prop in source) {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor
            // 2014.08.08 11:00 - lilo - alteração para funcionar com propriedas e função "not own (prototype chain)" do objeto
            var desc = Object.getOwnPropertyDescriptor(source, prop);
            if (desc) {
                Object.defineProperty(target, prop, desc); // add the property to o.
            } else {
                target[prop] = source[prop];
            }
        }

        return target;
    }
};
