
const fs = require('fs');
const content = fs.readFileSync('game.js', 'utf8');
const lines = content.split('\n');

const constVars = new Set();
lines.forEach(line => {
    const match = line.match(/^\s*const\s+(\w+)\s*=/);
    if (match) {
        constVars.add(match[1]);
    }
});

lines.forEach((line, index) => {
    constVars.forEach(v => {
        // Look for assignments to this var that are not declarations
        const regex = new RegExp('^\\s*' + v + '\\s*=[^=]');
        if (regex.test(line)) {
            console.log(`Found reassignment of const at line ${index + 1}: ${line.trim()}`);
        }
    });
});
