import "exportcase-ui";
import { rules, Rule } from './src/rules-documentation';

// HTML escape function
function escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Create rules documentation section
function createRulesSection() {
    const container = document.createElement('div');
    container.className = 'rules-documentation';

    const title = document.createElement('h2');
    title.textContent = 'Rules';
    
    const titleTypography = document.createElement('ec-typography');
    titleTypography.appendChild(title);
    container.appendChild(titleTypography);

    rules.forEach(rule => {
        const ruleSection = createRuleSection(rule);
        container.appendChild(ruleSection);
    });

    return container;
}

function createRuleSection(rule: Rule) {
    const section = document.createElement('section');
    section.className = 'rule-section';

    const ruleName = document.createElement('h3');
    ruleName.className = 'rule-title';
    ruleName.textContent = `Rule: ${rule.name.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}`;
    
    const titleTypography = document.createElement('ec-typography');
    titleTypography.appendChild(ruleName);
    section.appendChild(titleTypography);

    // Parse and display markdown content wrapped in ec-typography
    const contentDiv = document.createElement('ec-rule-content');
    const typographyWrapper = document.createElement('ec-typography');
    typographyWrapper.innerHTML = parseMarkdown(rule.content);
    contentDiv.appendChild(typographyWrapper);
    section.appendChild(contentDiv);

    // Add examples
    if (rule.goodExamples.length > 0 || rule.badExamples.length > 0) {
        const examplesSection = createExamplesSection(rule);
        section.appendChild(examplesSection);
    }

    return section;
}

function createExamplesSection(rule: Rule) {
    const section = document.createElement('div');

    if (rule.goodExamples.length > 0) {
        const goodSection = createExampleGroup('✅ Good Examples', rule.goodExamples, '#27ae60');
        section.appendChild(goodSection);
    }

    if (rule.badExamples.length > 0) {
        const badSection = createExampleGroup('❌ Bad Examples', rule.badExamples, '#e74c3c');
        section.appendChild(badSection);
    }

    return section;
}

function createExampleGroup(title: string, examples: any[], color: string) {
    const group = document.createElement('ec-example-group');
    group.style.setProperty('--example-group-color', color);

    const titleSlot = document.createElement('span');
    titleSlot.setAttribute('slot', 'title');
    titleSlot.textContent = title;
    group.appendChild(titleSlot);

    examples.forEach(example => {
        const exampleDiv = document.createElement('ec-example');
        exampleDiv.style.setProperty('--example-color', color);

        const fileName = document.createElement('ec-file-name');
        fileName.textContent = example.file;
        exampleDiv.appendChild(fileName);

        const explanation = document.createElement('ec-explanation');
        explanation.textContent = example.explanation;
        exampleDiv.appendChild(explanation);

        const codeBlock = document.createElement('ec-code');
        codeBlock.textContent = example.code;
        exampleDiv.appendChild(codeBlock);

        group.appendChild(exampleDiv);
    });

    return group;
}

function parseMarkdown(markdown: string): string {
    // Simple markdown parser for basic formatting
    const content = markdown
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
            return `<pre><code>${escapeHtml(code)}</code></pre>`;
        })
        .replace(/`([^`]+)`/g, (match, code) => {
            return `<code>${escapeHtml(code)}</code>`;
        })
        .replace(/\n/g, '<br>');

    return `<p>${content}</p>`
}

// Add rules documentation to the page
document.addEventListener('DOMContentLoaded', () => {
    // Add the new rules section before the logos
    const logosSection = document.querySelector('div[style*="display: flex"][style*="place-content: center"]');
    if (logosSection && logosSection.parentNode) {
        const rulesSection = createRulesSection();
        logosSection.parentNode.insertBefore(rulesSection, logosSection);
    }
});
