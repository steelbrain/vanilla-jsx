'use strict'

function appendChild(parent, children) {
  children.forEach(function(child) {
    if (typeof child === 'string') {
      parent.appendChild(document.createTextNode(child))
    } else {
      parent.appendChild(child)
    }
  })
}

module.exports.jsx = function jsx(name, attributes, ...children) {
  const element = document.createElement(name)

  if (typeof attributes === 'object' && attributes)
  for (let attrName in attributes) {
    if (attributes.hasOwnProperty(attrName)) {
      if (attrName.substr(0, 2) === 'on') {
        element.addEventListener(attrName.substr(2).toLowerCase(), attributes[attrName])
      } else if (attrName.substr(0, 1) === '$') {
        element[attrName.substr(1)] = attributes[attrName]
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
