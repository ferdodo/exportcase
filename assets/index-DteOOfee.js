var m=Object.defineProperty;var w=(i,e,r)=>e in i?m(i,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):i[e]=r;var s=(i,e,r)=>w(i,typeof e!="symbol"?e+"":e,r);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))f(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&f(a)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function f(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();function v(i){const e=document.createElement("template");return e.innerHTML=i.join(""),e}const d=class d extends HTMLElement{async connectedCallback(){var e;this.attachShadow({mode:"open"}),(e=this.shadowRoot)==null||e.appendChild(d.template.content.cloneNode(!0))}};s(d,"template",v`
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
`);let c=d;const n=class n extends HTMLElement{async connectedCallback(){var r;this.attachShadow({mode:"open"});const e=n.template.content.cloneNode(!0);(r=this.shadowRoot)==null||r.appendChild(e)}};s(n,"template",v`
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
	`);let b=n;const l=class l extends HTMLElement{async connectedCallback(){var e;this.attachShadow({mode:"open"}),(e=this.shadowRoot)==null||e.appendChild(l.template.content.cloneNode(!0))}};s(l,"template",v`
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
	`);let h=l;customElements.define("ec-background",c);customElements.define("ec-typography",b);customElements.define("ec-code",h);
