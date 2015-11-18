'use strict';

function appendChild(element, child) {
  if (typeof child === 'object' && typeof child.length === 'number') {
    Array.prototype.forEach.call(child, function (nestedChild) {
      appendChild(element, nestedChild);
    });
  } else {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  }
}

module.exports.jsx = function (name, attributes) {
  var element = document.createElement(name);

  for (var attrName in attributes) {
    if (attributes.hasOwnProperty(attrName)) {
      if (attrName === 'className') {
        attrName = 'class';
      }
      element.setAttribute(attrName, attributes[attrName]);
    }
  }

  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  appendChild(element, children);

  return element;
};

