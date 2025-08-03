export class EcFileName extends HTMLElement {
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
                        margin: 0 0 0.5rem 0;
                        font-family: 'Monaco', 'Menlo', monospace;
                        color: #26C3F9;
                        font-weight: bold;
                    }
                </style>
                <slot></slot>
            `;
        }
    }
} 