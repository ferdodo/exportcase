#!/usr/bin/env node

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Try to find spec directory in different locations
let SPEC_DIR = '/exportcase/spec/rules';
let OUTPUT_FILE = '/exportcase/website/src/rules-documentation.ts';

// For GitHub Actions context
try {
    if (!readdirSync(SPEC_DIR)) {
        SPEC_DIR = './src/rules';
        OUTPUT_FILE = './src/rules-documentation.ts';
    }
} catch (e) {
    SPEC_DIR = './src/rules';
    OUTPUT_FILE = './src/rules-documentation.ts';
}

function generateRulesDocumentation() {
    console.log('📚 Generating rules documentation...');
    
    const rules = [];
    
    try {
        // Read all rule directories
        const ruleDirs = readdirSync(SPEC_DIR, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
        
        for (const ruleName of ruleDirs) {
            const ruleDir = join(SPEC_DIR, ruleName);
            const ruleMdPath = join(ruleDir, 'rule.md');
            
            try {
                const ruleContent = readFileSync(ruleMdPath, 'utf8');
                
                // Read good examples
                const goodDir = join(ruleDir, 'good');
                const goodExamples = [];
                try {
                    const goodFiles = readdirSync(goodDir);
                    for (const file of goodFiles) {
                        if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                            const explainPath = join(goodDir, file.replace(/\.(ts|tsx)$/, '.explain.md'));
                            let explanation = '';
                            try {
                                explanation = readFileSync(explainPath, 'utf8').trim();
                            } catch (e) {
                                explanation = 'Good example following the rule.';
                            }
                            goodExamples.push({
                                file,
                                explanation,
                                code: readFileSync(join(goodDir, file), 'utf8')
                            });
                        }
                    }
                } catch (e) {
                    // No good examples directory
                }
                
                // Read bad examples
                const badDir = join(ruleDir, 'bad');
                const badExamples = [];
                try {
                    const badFiles = readdirSync(badDir);
                    for (const file of badFiles) {
                        if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                            const explainPath = join(badDir, file.replace(/\.(ts|tsx)$/, '.explain.md'));
                            let explanation = '';
                            try {
                                explanation = readFileSync(explainPath, 'utf8').trim();
                            } catch (e) {
                                explanation = 'Bad example violating the rule.';
                            }
                            badExamples.push({
                                file,
                                explanation,
                                code: readFileSync(join(badDir, file), 'utf8')
                            });
                        }
                    }
                } catch (e) {
                    // No bad examples directory
                }
                
                rules.push({
                    name: ruleName,
                    content: ruleContent,
                    goodExamples,
                    badExamples
                });
                
                console.log(`✅ Processed rule: ${ruleName}`);
                
            } catch (e) {
                console.warn(`⚠️  Could not read rule.md for ${ruleName}:`, e.message);
            }
        }
        
        // Generate TypeScript file
        const tsContent = `// Auto-generated rules documentation
// Generated on: ${new Date().toISOString()}

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

export const rules: Rule[] = ${JSON.stringify(rules, null, 2)};

export default rules;
`;

        writeFileSync(OUTPUT_FILE, tsContent);
        console.log(`📝 Generated documentation for ${rules.length} rules`);
        console.log(`📄 Output: ${OUTPUT_FILE}`);
        
    } catch (error) {
        console.error('❌ Error generating rules documentation:', error);
        process.exit(1);
    }
}

generateRulesDocumentation(); 