import { html } from 'lit';
import '../src/my-element';

export default {
  title: 'Components/MyButton',
  component: 'nwc-my-element',
};

export const Default = () => html`<nwc-my-element></nwc-my-element>`;

export const Async = () => html`<nwc-my-element async></nwc-my-element>`;
