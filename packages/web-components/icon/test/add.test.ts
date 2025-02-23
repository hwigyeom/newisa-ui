import { elementUpdated, fixture, html, waitUntil } from '@open-wc/testing';
import { expect, test } from 'vitest';

import { Add } from '../add';

test('Add icon class should be defined', () => {
  expect(Add).toBeDefined();
});

test('nwc-icon-add tag should be defined', async () => {
  const addIcon = await fixture<Add>(html`<nwc-icon-add></nwc-icon-add>`);
  expect(addIcon).instanceOf(Add);
});

test('should render the async Add icon', async () => {
  const addIcon = await fixture<Add>(html`<nwc-icon-add async></nwc-icon-add>`);

  await waitUntil(() => addIcon.shadowRoot?.querySelector('svg') !== null);

  await elementUpdated(addIcon);
  const svg = addIcon.shadowRoot!.querySelector('svg') as SVGElement;

  expect(svg.getAttribute('width')).toBe('32');
  expect(svg.getAttribute('height')).toBe('32');
});

test('should render the sync Add icon', async () => {
  const addIcon = await fixture<Add>(html`<nwc-icon-add></nwc-icon-add>`);

  await waitUntil(() => addIcon.shadowRoot?.querySelector('svg') !== null);

  await elementUpdated(addIcon);
  const svg = addIcon.shadowRoot!.querySelector('svg') as SVGElement;

  expect(svg.getAttribute('width')).toBe('32');
  expect(svg.getAttribute('height')).toBe('32');
});
