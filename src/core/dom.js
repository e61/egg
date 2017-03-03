/**
 * @fileoverview The Document Object Model (DOM) is a programming interface for 
 * HTML, XML and SVG documents. It provides a structured representation of the 
 * document (a tree) and it defines a way that the structure can be accessed 
 * from programs so that they can change the document structure, style and content. 
 * 
 * @author Ciro Cesar Maciel <ciro.maciel@c37.co>
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model|Document Object Model (DOM)}
 * 
 */

/**
 * A Web page is a document. This document can be either displayed in the browser 
 * window, or as the HTML source. But it is the same document in both cases. The 
 * Document Object Model (DOM) provides another way to represent, store and 
 * manipulate that same document.
 * 
 * @namespace egg.core.dom
 */
egg.core.dom = (function () {
    'use strict';

    return {
        /**
         * Returns the first element that is a descendant of the element
         * on which it is invoked that matches the specified group of selectors.
         * 
         * @memberOf egg.core.dom
         * 
         * @param {HTMLElement} root parent element to query
         * @param {String} selectors is a string containing one or more CSS selectors separated by commas
         *
         * @returns {HTMLElement} Returns null if no matches are found; otherwise, it returns the first matching element.
         * 
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector|Document.querySelector()}
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_Started/Selectors|CSS Selectors}
         * @see {@link http://www.w3.org/TR/CSS21/selector.html%23id-selectors|CSS Selectors}
         * 
         */
        query: function (root, selectors) {
            return root.querySelector(selectors);
        },
        /**
         * Returns a list of the elements within the document (using depth-first 
         * pre-order traversal of the document's nodes) that match the specified 
         * group of selectors. The object returned is a NodeList.
         * 
         * @memberOf egg.core.dom
         * 
         * @param {HTMLElement} root parent element to query
         * @param {string} selectors is a string containing one or more CSS selectors separated by commas.
         *
         * @returns {NodeList} The returned NodeList will contain all the elements 
         * in the document that are matched by any of the specified selectors. 
         * If the selectors string contains a CSS pseudo-element, the returned 
         * elementList will be empty
         * 
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll|Document.querySelectorAll()}
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_Started/Selectors|CSS Selectors}
         * @see {@link http://www.w3.org/TR/CSS21/selector.html%23id-selectors|CSS Selectors}
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements|CSS Pseudo-elements}
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_Started/Selectors|NodeList}
         * 
         */
        queryAll: function (root, selectors) {
            return root.querySelectorAll(selectors);
        },
        /**
         * Method registers the specified listener on the EventTarget it's 
         * called on. The event target may be an Element in a document, the 
         * Document itself, a Window, or any other object that supports events.
         * 
         * @memberOf egg.core.dom
         * 
         * @param {HTMLElement} element Target to attach listener to
         * @param {string} type representing the event type to listen or
         * @param {function} listener The object that receives a notification 
         * when an event of the specified type occurs. This must be an object 
         * implementing the EventListener interface, or simply a JavaScript function
         *
         * @returns {void}
         * 
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener|EventTarget.addEventListener()}
         * 
         */
        listen: function (element, type, listener) {
            element.addEventListener(type, listener, false);
        },
        /**
         * Removes the event listener previously registered with {@link egg.core.dom.listen}.
         * 
         * @memberOf egg.core.dom
         * 
         * @param {HTMLElement} element Target to remove listener from
         * @param {String} type representing the event type to remove
         * @param {Function} listener The EventListener function to remove from 
         * the event target
         *
         * @returns {void}
         * 
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener|EventTarget.removeEventListener()}
         * 
         */
        unListen: function (element, type, listener) {
            element.removeEventListener(type, listener, false);
        }
    };
}());
