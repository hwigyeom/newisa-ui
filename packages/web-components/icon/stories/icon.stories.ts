import { html } from 'lit';
import '../add';

export default {
  title: 'Components/Icons',
  component: 'nwc-icon',
};

export const Default = () => html`<nwc-icon-add async></nwc-icon-add>`;

export const Sync = () => html`<nwc-icon-add></nwc-icon-add>`;
