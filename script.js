const interactivePrompt = document.getElementById('interactive-prompt');
const commandInput = document.getElementById('command-input');
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
    } else {
        const hintMsg = document.createElement('div');
        hintMsg.className = 'log-line';
        hintMsg.style.color = '#ffbd2e';
        hintMsg.textContent = "> [HINT] Type 'reboot' to restart the connection.";
        terminalBody.insertBefore(hintMsg, cursor);
        terminalBody.scrollTop = terminalBody.scrollHeight;

        //延遲1秒後再解鎖輸入匡
        setTimeout(() => {
            cursor.classList.add('hidden');
            interactivePrompt.classList.remove('hidden');
            terminalBody.scrollTop = terminalBody.scrollHeight;
            commandInput.focus();
        }, 1000);

        commandInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                const command = commandInput.value.trim().toLowerCase();
                if (command === 'reboot' || command === 'reload') {
                    location.reload();
                } else if (command === '') {
                    return;
                } else {
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'log-line';
                    errorMsg.style.color = '#ff5f56';
                    errorMsg.textContent = `Command not found: ${command}. Try 'reboot'.`;
                    terminalBody.insertBefore(errorMsg, interactivePrompt);
                    commandInput.value = '';
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                }
            }
        });
    }
}

setTimeout(printNextLine, 1000);