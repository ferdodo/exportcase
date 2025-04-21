export function html(strings: TemplateStringsArray): HTMLTemplateElement {
	const template = document.createElement("template");
	template.innerHTML = strings.join("");
	return template;
}
