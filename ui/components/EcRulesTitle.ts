export class EcRulesTitle extends HTMLElement {
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
                        text-align: center;
                        color: #ffffff;
                        margin-bottom: 3rem;
                        font-size: 2.5rem;
                    }
                </style>
                <slot></slot>
            `;
        }
    }
} 