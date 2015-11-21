Vanilla-JSX
=========

Vanilla-JSX is a library that converts JSX into vanilla HTML Elements.

#### Features

 - Converts JSX to vanilla HTMLElements
 - Translates className attribute into class
 - Supports arrays as children
 - Supports event listeners as attributes like `<div onClick={someFunction}></div>`
 - Supports setting props, starting with `$` like `<div $setCount={someFunction}></div>`

#### Example
```js
'use babel'
/** @jsx vanilla.jsx */
import vanilla from 'vanilla-jsx'

const el = <div class="wow">Something <span>Special</span></div>
console.log(el instance HTMLElement) // "true"
console.log(el.constructor.name === 'HTMLDivElement') // "true"
console.log(el.innerHTML) // "Something <span>Special</span>"
```

The above is equivalent to this in vanilla

```js
'use babel'

const el = document.createElement('div')
const elSpan = document.createElement('span')

elSpan.textContent = "Special"
el.appendChild(document.createTextNode("Something "))
el.appendChild(elSpan)

console.log(el instance HTMLElement) // "true"
console.log(el.constructor.name === 'HTMLDivElement') // "true"
console.log(el.innerHTML) // "Something <span>Special</span>"
```

#### LICENSE
This project is licensed under the terms of MIT License, See the LICENSE file for more info
