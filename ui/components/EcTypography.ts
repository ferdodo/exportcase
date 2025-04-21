import { html } from "../utils/html";

export class EcTypography extends HTMLElement {
	static template = html`
		<style>
			::slotted(*) {
				color: #C2C2C2;
				font-family: "Saeada";
			}

			::slotted(h1) {
				font-size: clamp(2rem, 6vw, 3rem);
			}

			::slotted(h2) {
				font-size: clamp(1.2rem, 3.6vw, 1.8rem);
			}

			::slotted(p), ::slotted(span), ::slotted(input), ::slotted(ul) {
				font-size: clamp(0.726rem, 2.2vw, 1.1rem);
			}

			::slotted(ul) {
				line-height: 2;
			}

			:host([disabled]) ::slotted(*) {
				opacity: 0.5;
			}
		</style>

		<slot></slot>
	`;

	async connectedCallback() {
		this.attachShadow({ mode: "open" });
		const clonedTemplate = EcTypography.template.content.cloneNode(true);
		this.shadowRoot?.appendChild(clonedTemplate);
	}
}
