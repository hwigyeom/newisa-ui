import { expect, test } from 'vitest';

import { MyElement } from '../src/my-element';

test('MyElement class should be defined', () => {
  expect(MyElement).toBeDefined();
});

test('my-element tag should be defined', () => {
  const myElement = document.createElement('nwc-my-element');
  expect(myElement).toBeDefined();
});

test('MyElement should render content', async () => {
  const element = document.createElement('nwc-my-element');
  document.body.appendChild(element); // DOM에 추가
  await element.updateComplete; // 렌더링 완료 대기

  const paragraph = element.shadowRoot?.querySelector('p');
  expect(paragraph).not.toBeNull();
  expect(paragraph?.textContent).toBe('Hello, World!');
});
