import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@ntils-wc/icon/add';

@customElement('nwc-my-element')
export class MyElement extends LitElement {
  render() {
    return html`<p><nwc-icon-add async></nwc-icon-add>Hello, World!</p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nwc-my-element': MyElement;
  }
}
