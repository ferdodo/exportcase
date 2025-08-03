export class EcExampleGroup extends HTMLElement {
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
                        margin-bottom: 2rem;
                    }
                    
                    .title {
                        color: var(--example-group-color, #666);
                        margin-bottom: 1rem;
                        font-size: 1.3rem;
                        font-weight: bold;
                    }
                </style>
                <div class="title">
                    <slot name="title"></slot>
                </div>
                <slot></slot>
            `;
        }
    }
} 