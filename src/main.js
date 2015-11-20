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

module.exports.jsx = function jsx(name, attributes, ...children) {
  const element = document.createElement(name)

  if (typeof attributes === 'object' && attributes)
  for (let attrName in attributes) {
    if (attributes.hasOwnProperty(attrName)) {
      if (attrName.substr(0, 2) === 'on') {
        element.addEventListener(attrName.substr(2).toLowerCase(), attributes[attrName])
      } else if (attrName.substr(0, 1) === '$') {
        element[attrName] = attributes[attrName]
      } else {
        if (attrName === 'className') {
          element.setAttribute('class', attributes[attrName])
        } else {
          element.setAttribute(attrName, attributes[attrName])
        }
      }
    }
  }

  appendChild(element, children)

  return element
}
