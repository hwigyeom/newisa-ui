import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { DirectiveResult } from 'lit/directive.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { until } from 'lit/directives/until.js';

import addSvg from './assets/add.svg?raw';

@customElement('nwc-icon-add')
export class Add extends LitElement {
  @property({ type: Boolean }) async: boolean = false;

  @property({ type: Number }) width: number = 32;
  @property({ type: Number }) height: number = 32;

  @state() private svgResult: DirectiveResult | null = null;

  private loadSvg: Promise<DirectiveResult> | null = null;

  async attributeChangedCallback(name: string, _old: string | null, value: string | null): Promise<void> {
    super.attributeChangedCallback(name, _old, value);
    if (this.async) {
      this.loadSvg = import('./assets/add.svg?raw').then((module) => {
        this.svgResult = unsafeSVG(module.default);
        return this.svgResult;
      });
    }
  }

  protected shouldUpdate(_changes: PropertyValues): boolean {
    console.info('shouldUpdate', Array.from(_changes.keys()), this.svgResult !== null, this.svgResult);
    if (!this.async) {
      return super.shouldUpdate(_changes);
    }
    return this.svgResult !== null;
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    if (!this.async) {
      this.loadSvg = Promise.resolve(addSvg).then((svg) => {
        this.svgResult = unsafeSVG(svg);
        this.requestUpdate();
        return this.svgResult;
      });
    }
  }

  protected async updated(changes: PropertyValues): Promise<void> {
    super.updated(changes);

    await this.updateComplete;

    const svg: SVGElement = this.shadowRoot!.querySelector('svg') as SVGElement;
    console.info('svg', svg?.getAttribute('width'));
    if (
      svg &&
      svg.getAttribute('width') !== this.width.toString() &&
      svg.getAttribute('height') !== this.height.toString()
    ) {
      svg.setAttribute('width', this.width.toString());
      svg.setAttribute('height', this.height.toString());
      this.requestUpdate();
    }
  }

  render() {
    return until(this.loadSvg, html``);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nwc-icon-add': Add;
  }
}
