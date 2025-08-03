var y=Object.defineProperty;var x=(t,e,n)=>e in t?y(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var r=(t,e,n)=>x(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();function u(t){const e=document.createElement("template");return e.innerHTML=t.join(""),e}const c=class c extends HTMLElement{async connectedCallback(){var e;this.attachShadow({mode:"open"}),(e=this.shadowRoot)==null||e.appendChild(c.template.content.cloneNode(!0))}};r(c,"template",u`
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
`);let m=c;const i=class i extends HTMLElement{async connectedCallback(){var n;this.attachShadow({mode:"open"});const e=i.template.content.cloneNode(!0);(n=this.shadowRoot)==null||n.appendChild(e)}};r(i,"template",u`
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
	`);let p=i;const d=class d extends HTMLElement{async connectedCallback(){var e;this.attachShadow({mode:"open"}),(e=this.shadowRoot)==null||e.appendChild(d.template.content.cloneNode(!0))}};r(d,"template",u`
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
				font-family: monospace;
				font-size: 0.9rem;
				line-height: 1.3rem;
				margin: 0;
			}
		</style>

		<code>
			<pre><slot></slot></pre>
		</code>
	</div>
	`);let h=d;class E extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
            `)}}class C extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
            `)}}class k extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
                <style>
                    :host {
                        display: block;
                        margin: 0 0 1rem 0;
                        font-style: italic;
                        color: #b0b0b0;
                    }
                </style>
                <slot></slot>
            `)}}class L extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
            `)}}class F extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
                <style>
                    :host {
                        display: block;
                        line-height: 1.6;
                        color: #e0e0e0;
                    }
                </style>
                <slot></slot>
            `)}}class M extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
            `)}}customElements.define("ec-background",m);customElements.define("ec-typography",p);customElements.define("ec-code",h);customElements.define("ec-example",E);customElements.define("ec-file-name",C);customElements.define("ec-explanation",k);customElements.define("ec-example-group",L);customElements.define("ec-rule-content",F);customElements.define("ec-rules-title",M);const S=[];function v(t){const e=document.createElement("div");return e.textContent=t,e.innerHTML}function R(){const t=document.createElement("div");t.className="rules-documentation";const e=document.createElement("h2");e.textContent="Rules";const n=document.createElement("ec-typography");return n.appendChild(e),t.appendChild(n),S.forEach(l=>{const o=T(l);t.appendChild(o)}),t}function T(t){const e=document.createElement("section");e.className="rule-section";const n=document.createElement("h3");n.className="rule-title",n.textContent=`Rule: ${t.name.replace(/-/g," ").replace(/\b\w/g,a=>a.toUpperCase())}`;const l=document.createElement("ec-typography");l.appendChild(n),e.appendChild(l);const o=document.createElement("ec-rule-content"),s=document.createElement("ec-typography");if(s.innerHTML=N(t.content),o.appendChild(s),e.appendChild(o),t.goodExamples.length>0||t.badExamples.length>0){const a=H(t);e.appendChild(a)}return e}function H(t){const e=document.createElement("div");if(t.goodExamples.length>0){const n=w("✅ Good Examples",t.goodExamples,"#27ae60");e.appendChild(n)}if(t.badExamples.length>0){const n=w("❌ Bad Examples",t.badExamples,"#e74c3c");e.appendChild(n)}return e}function w(t,e,n){const l=document.createElement("ec-example-group");l.style.setProperty("--example-group-color",n);const o=document.createElement("span");return o.setAttribute("slot","title"),o.textContent=t,l.appendChild(o),e.forEach(s=>{const a=document.createElement("ec-example");a.style.setProperty("--example-color",n);const b=document.createElement("ec-file-name");b.textContent=s.file,a.appendChild(b);const f=document.createElement("ec-explanation");f.textContent=s.explanation,a.appendChild(f);const g=document.createElement("ec-code");g.textContent=s.code,a.appendChild(g),l.appendChild(a)}),l}function N(t){return`<p>${t.replace(/^### (.*$)/gim,"<h3>$1</h3>").replace(/^## (.*$)/gim,"<h2>$1</h2>").replace(/^# (.*$)/gim,"<h1>$1</h1>").replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/```(\w+)?\n([\s\S]*?)```/g,(n,l,o)=>`<pre><code>${v(o)}</code></pre>`).replace(/`([^`]+)`/g,(n,l)=>`<code>${v(l)}</code>`).replace(/\n/g,"<br>")}</p>`}document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector('div[style*="display: flex"][style*="place-content: center"]');if(t&&t.parentNode){const e=R();t.parentNode.insertBefore(e,t)}});
