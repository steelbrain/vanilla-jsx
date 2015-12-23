Vanilla-JSX
=========

Vanilla-JSX is a library that converts JSX into vanilla HTML Elements.

#### Features

 - Converts JSX to vanilla HTMLElements
 - Translates className attribute into class
 - Supports event listeners as attributes like `<div on-click={someFunction}></div>`
 - Supports `ref` attribute with `process` helper

#### API

```js
// Responsible for creating HTML Elements from JSX
export function jsx(name, attributes, ...children): HTMLElement {}
// Responsible for processing refs from output of jsx function
export function process(element): HTMLElement {}

```

#### Example
```js
'use babel'

import vanilla from 'vanilla-jsx'
/** @jsx vanilla.jsx */

export class Message {
  constructor(message) {
    this.element = Message.getElement()
    console.log(this.element instanceof HTMLElement)
    // ^ true!
  }
  static getElement(message) {
    return <div>
      <span>{message.name}</span>
      <span>{message.text}</span>
      <span>{message.filePath}</span>
      {message.trace.map(Message.getElement)}
    </div>
  }
}
```

#### LICENSE
This project is licensed under the terms of MIT License, See the LICENSE file for more info
