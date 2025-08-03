export interface RuleExample {
    file: string;
    explanation: string;
    code: string;
}

export interface Rule {
    name: string;
    content: string;
    goodExamples: RuleExample[];
    badExamples: RuleExample[];
}

export const rules: Rule[] = [];

export default rules; 