#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const EXPORTCASE_CMD = 'exportcase';

function runExportcase(directory) {
    try {
        execSync(`${EXPORTCASE_CMD} check ${directory}`, { 
            stdio: 'pipe',
            encoding: 'utf8'
        });
        return { success: true, output: '' };
    } catch (error) {
        return { 
            success: false, 
            output: error.stdout + error.stderr 
        };
    }
}

function testRule(ruleName) {
    console.log(`\n🧪 Testing rule: ${ruleName}`);
    
    const ruleDir = join('./rules', ruleName);
    if (!existsSync(ruleDir)) {
        console.log(`❌ Rule directory not found: ${ruleDir}`);
        return false;
    }
    
    let allTestsPassed = true;
    
    // Test good examples (should pass)
    const goodDir = join(ruleDir, 'good');
    if (existsSync(goodDir)) {
        console.log(`  ✅ Testing good examples:`);
        const goodFiles = readdirSync(goodDir).filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));
        
        for (const file of goodFiles) {
            const filePath = join(goodDir, file);
            const result = runExportcase(filePath);
            
            if (result.success) {
                console.log(`    ✅ ${file} - PASSED (as expected)`);
            } else {
                console.log(`    ❌ ${file} - FAILED (should have passed)`);
                console.log(`       Output: ${result.output.trim()}`);
                allTestsPassed = false;
            }
        }
    }
    
    // Test bad examples (should fail)
    const badDir = join(ruleDir, 'bad');
    if (existsSync(badDir)) {
        console.log(`  🚫 Testing bad examples:`);
        const badFiles = readdirSync(badDir).filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));
        
        for (const file of badFiles) {
            const filePath = join(badDir, file);
            const result = runExportcase(filePath);
            
            if (!result.success) {
                console.log(`    ✅ ${file} - FAILED (as expected)`);
                console.log(`       Rule violation: ${result.output.split('❌')[1]?.trim() || 'Rule violation detected'}`);
            } else {
                console.log(`    ❌ ${file} - PASSED (should have failed)`);
                allTestsPassed = false;
            }
        }
    }
    
    return allTestsPassed;
}

function main() {
    console.log('🚀 Running ExportCase Rules Test Suite');
    console.log('=====================================');
    
    const rulesDir = './rules';
    if (!existsSync(rulesDir)) {
        console.error('❌ Rules directory not found');
        process.exit(1);
    }
    
    const rules = readdirSync(rulesDir).filter(name => {
        const path = join(rulesDir, name);
        return statSync(path).isDirectory();
    });
    
    if (rules.length === 0) {
        console.error('❌ No rules found');
        process.exit(1);
    }
    
    let allRulesPassed = true;
    
    for (const rule of rules) {
        const passed = testRule(rule);
        if (!passed) {
            allRulesPassed = false;
        }
    }
    
    console.log('\n=====================================');
    if (allRulesPassed) {
        console.log('🎉 All tests passed!');
        process.exit(0);
    } else {
        console.log('❌ Some tests failed!');
        process.exit(1);
    }
}

main();
