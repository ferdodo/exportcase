export class EcExplanation extends HTMLElement {
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
                        margin: 0 0 1rem 0;
                        font-style: italic;
                        color: #b0b0b0;
                    }
                </style>
                <slot></slot>
            `;
        }
    }
} 