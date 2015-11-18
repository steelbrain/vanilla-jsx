'use strict'

function appendChild(element, child) {
  if (typeof child === 'object' && typeof child.length === 'number') {
    Array.prototype.forEach.call(child, function(nestedChild) {
      appendChild(element, nestedChild)
    })
  } else {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child))
    } else {
      element.appendChild(child)
    }
  }
}

module.exports.jsx = function(name, attributes, ...children) {
  const element = document.createElement(name)

  for (let attrName in attributes) {
    if (attributes.hasOwnProperty(attrName)) {
      if (attrName === 'className') {
        attrName = 'class'
      }
      element.setAttribute(attrName, attributes[attrName])
    }
  }

  appendChild(element, children)

  return element
}