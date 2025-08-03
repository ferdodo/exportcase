#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';

console.log('🔧 Preparing build environment...');

// Copy spec rules
try {
    const specRulesPath = '../spec/rules';
    const targetRulesPath = './src/rules';
    
    if (existsSync(specRulesPath)) {
        console.log('📚 Copying spec rules...');
        cpSync(specRulesPath, targetRulesPath, { recursive: true });
    } else {
        console.log('⚠️  Spec rules directory not found, skipping...');
    }
} catch (error) {
    console.log('⚠️  Could not copy spec rules:', error.message);
}

// Copy TypeScript declaration files from spec
try {
    const specPath = '../spec';
    const targetSrcPath = './src';
    
    if (existsSync(specPath)) {
        console.log('📝 Copying TypeScript declarations...');
        const files = readdirSync(specPath);
        files.forEach(file => {
            if (file.endsWith('.d.ts')) {
                const sourceFile = join(specPath, file);
                const targetFile = join(targetSrcPath, file);
                cpSync(sourceFile, targetFile);
                console.log(`   📄 Copied ${file}`);
            }
        });
    } else {
        console.log('⚠️  Spec directory not found, skipping...');
    }
} catch (error) {
    console.log('⚠️  Could not copy TypeScript declarations:', error.message);
}

// Copy UI assets (fonts and CSS)
try {
    const uiPublicPath = '../ui/public';
    const targetPublicPath = './public';
    
    if (existsSync(uiPublicPath)) {
        console.log('🎨 Copying UI assets...');
        cpSync(uiPublicPath, targetPublicPath, { recursive: true });
    } else {
        console.log('⚠️  UI public directory not found, skipping...');
    }
} catch (error) {
    console.log('⚠️  Could not copy UI assets:', error.message);
}

console.log('✅ Build environment prepared!'); 