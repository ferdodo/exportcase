import { html } from "../utils/html";

export class EcBackground extends HTMLElement {
	static template = html`
	<style>
		:host {
			width: 100svw;
			height: 100svh; 
			display:block; 
			position: fixed; 
			top: 0; 
			left: 0;
			z-index: -1;
		}

		*,
		*::before,
		*::after {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}

		.body {
			height: 100%;
			min-height: 100vh;
			background: linear-gradient(90deg, #aea4e3, #d3ffe8);
		}

		.container {
			background:#1F2024;
			height: 100%;
			overflow: hidden;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.blob-c {
			min-height: 100vh;
			overflow: hidden;
			position:absolute;
			width: 100%;
			filter: blur(7vw);
		}

		.blob {
			background:#26C3F9;
			height: 4.2vw;
			width: 5.6vw;
			border-radius: 40% 50% 30% 40%;
			opacity:.7;
			position: absolute;
			left: 75%;
			top: 40%;
		}

		.blob.one{
			background:#0085FF;
			height: 10.4vw;
			width: 13.9vw;
			left: 0.7vw;
			top: 0.7vw;
			transform: rotate(-180deg);
		}

		.blob.two{
			background:#4EAEFF;
			height: 10.4vw;
			width: 10.4vw;
			left: 41.7vw;
			top: 17.4vw;
			transform: rotate(-180deg);
		}

		.blob.three{
			background:#0EAFFF;
			height: 10.4vw;
			width: 10.4vw;
			left: 55.6vw;
			top: 2.1vw;
			transform: rotate(-180deg);
		}

		.blob.four{
			background:#4EAEFF;
			height: 6.9vw;
			width: 6.9vw;
			left: 34.7vw;
			top: 4.2vw;
			transform: rotate(-180deg);
		}

		.blob.five{
			background:#0085FF;
			height: 6.9vw;
			width: 5.6vw;
			left: 33.3vw;
			top: 17.4vw;
			transform: rotate(-180deg);
		}

		.blob.six{
			background:#0EAFFF;
			height: 4.9vw;
			width: 6.9vw;
			left: 11.1vw;
			top: 27.8vw;
			transform: rotate(-180deg);
		}

		.blob.seven{
			background: #0085FF;
			height: 4.9vw;
			width: 6.9vw;
			left: 27.8vw;
			top: 27.8vw;
			transform: rotate(-180deg);
		}

		.blob.height{
			height: 5.6vw;
			width: 10vw;
			left: 55.6vw;
			top: 55.6vw;
			transform: rotate(-180deg);
		}

		.blob.nine {
			background: #0EAFFF;
			height: 5.6vw;
			width: 2vw;
			left: 42.6vw;
			top: 64.6vw;
			transform: rotate(-180deg);
		}

		@keyframes transform
		{
				0%,
			100% { border-radius: 33% 67% 70% 30% / 30% 40% 70% 70%; } 
			20% { border-radius: 37% 63% 51% 49% / 37% 35% 35% 63%; } 
			40% { border-radius: 36% 64% 64% 36% / 64% 48% 52% 26%; } 
			60% { border-radius: 37% 63% 51% 49% / 30% 30% 70% 73%; } 
			80% { border-radius: 40% 60% 42% 58% / 51% 51% 49% 59%; } 
		}

		@keyframes movement_one
		{
				0%,
			100% { transform: none; }
			50% { transform: translate(50%, 20%) rotateY(10deg) scale(1); }
		}

		@keyframes movement_two
		{
				0%,
			500% { transform: none; }
			50% { transform: translate(50%, 100%) rotate(-200deg) scale(1.3);}
		}
	</style>

	<div class="body">
		<div class="container">
			<div class="blob-c">
			<div class="blob"></div>
			<div class="blob one"></div>
			<div class="blob two"></div>
			<div class="blob three"></div>
			<div class="blob four"></div>
			<div class="blob five"></div>
			<div class="blob six"></div>
			<div class="blob seven"></div>
			<div class="blob height"></div>
			<div class="blob nine"></div>
		</div>
	</div>
</div>
`;

	async connectedCallback() {
		this.attachShadow({ mode: "open" });

		this.shadowRoot?.appendChild(EcBackground.template.content.cloneNode(true));
	}
}
