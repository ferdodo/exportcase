export class EcRuleContent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    :host {
                        display: block;
                        line-height: 1.6;
                        color: #e0e0e0;
                    }
                </style>
                <slot></slot>
            `;
        }
    }
} 