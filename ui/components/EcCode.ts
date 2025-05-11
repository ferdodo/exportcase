import { html } from "../utils/html";

export class EcCode extends HTMLElement {
	static template = html`
		<style>
			:host {
				display:block; 
				width: 100%;
				padding: 1rem;
				box-sizing: border-box;
			}

			code {
				background-color:rgba(7, 7, 7, 0.44);
				color: white;
				border-radius: 0.2rem;
				padding: 2rem;
				width: 100%;
				display: block;
				box-sizing: border-box;
				box-shadow: 2px 10px 50px 5px rgba(26, 25, 25, 0.47);
			}

			pre {
				font-family: "jackinput";
				font-size: 0.9rem;
				line-height: 1.3rem;
				margin: 0;
			}
		</style>

		<code>
			<pre><slot></slot></pre>
		</code>
	</div>
	`;

	async connectedCallback() {
		this.attachShadow({ mode: "open" });
		this.shadowRoot?.appendChild(EcCode.template.content.cloneNode(true));
	}
}