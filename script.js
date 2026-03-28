const terminalBody = document.getElementById('terminal-body');
const cursor = document.getElementById('cursor');

const logMessages = [
    "> [INFO] Initializing GitHub Recovery Protocol v2.1.0...",
    "> [INFO] Checking Octocat heartbeat... OK.",
    "> [WARN] Git Object Database seems to be corrupted. Attempting fsck...",
    "> [INFO] Bypassing monolithic architecture, booting microservices...",
    "> [INFO] Spring Boot microservices restarting on port 8080...",
    "> [WARN] Re-establishing database Socket connections... Timeout retrying...",
    "> [ERR ] CRITICAL: OAuth2 and JWT tokens validation failed.",
    "> [INFO] Dropping to repair shell...",
    "> [INFO] Injecting caffeine into backend developers...",
    "> [SUCCESS] Connection stabilized. Awaiting further commands..."
];

let currentLineIndex = 0;

function typeWriter(text, charIndex, lineElement, callback) {
    if (charIndex < text.length) {
        lineElement.textContent += text.charAt(charIndex);
        terminalBody.scrollTop = terminalBody.scrollHeight;
        const typingSpeed = Math.floor(Math.random() * 30) + 10;
        setTimeout(() => {
            typeWriter(text, charIndex + 1, lineElement, callback);
        }, typingSpeed);
    } else {
        if (callback) {
            const lineDelay = Math.floor(Math.random() * 500) + 300;
            setTimeout(callback, lineDelay);
        }
    }
}

function printNextLine() {
    if (currentLineIndex < logMessages.length) {
        const newLine = document.createElement('div');
        newLine.className = 'log-line'; 
        terminalBody.insertBefore(newLine, cursor);

        typeWriter(logMessages[currentLineIndex], 0, newLine, () => {
            currentLineIndex++; 
            printNextLine();    
        });
    }
}

setTimeout(printNextLine, 1000);