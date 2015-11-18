'use strict'

module.exports.jsx = function(name, attributes, ...children) {
  const element = document.createElement(name)

  for (let attrName in attributes) {
    if (attributes.hasOwnProperty(attrName)) {
      element.setAttribute(attrName, attributes[attrName])
    }
  }

  Array.prototype.forEach.call(children, function(child) {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child))
    } else {
      element.appendChild(child)
    }
  })

  return element
}
