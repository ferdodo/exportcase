export class EcExample extends HTMLElement {
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
                        margin-bottom: 1.5rem;
                        padding: 1rem;
                        background: rgba(255, 255, 255, 0.03);
                        border-left: 4px solid var(--example-color, #666);
                        border-radius: 4px;
                        backdrop-filter: blur(5px);
                    }
                </style>
                <slot></slot>
            `;
        }
    }
} 