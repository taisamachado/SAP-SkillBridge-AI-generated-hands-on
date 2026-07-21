function getElement(id) {
    return document.getElementById(id);
}

function setStatusBar(message, status = "info") {
    const messageBar = getElement("messageBar");
    const indicator = getElement("messageTypeIndicator");

    messageBar.textContent = message;
    indicator.className = `status-indicator status-${status}`;
    indicator.textContent = status === "success" ? "✓" : status === "error" ? "!" : status === "warning" ? "!" : "i";
}

function clearConsole() {
    getElement("consoleOutput").innerHTML = "";
}

function clearWorkspace() {
    getElement("transactionWorkspace").innerHTML = "";
}

export function printLine(text, type = "system") {
    // Remove any existing awaiting-input prompt before adding a new line
    const existing = getElement("consoleOutput").querySelector(".awaiting-input");
    if (existing) existing.remove();

    const line = document.createElement("div");
    line.className = `console-line ${type}`;
    line.textContent = text;
    getElement("consoleOutput").appendChild(line);
    getElement("consoleOutput").scrollTop = getElement("consoleOutput").scrollHeight;
}

/**
 * Show a pulsing "type your answer above ↑" prompt in the console
 * and highlight the search bar in amber to guide the user.
 * Called whenever Bob asks a question and is waiting for a transaction code.
 */
export function showBobAwaiting() {
    // Remove any stale prompt first
    const stale = getElement("consoleOutput").querySelector(".awaiting-input");
    if (stale) stale.remove();

    const line = document.createElement("div");
    line.className = "console-line awaiting-input";
    line.id = "bobAwaitingPrompt";
    line.textContent = "▶  Type a transaction code in the search bar above ↑  and press Run";
    getElement("consoleOutput").appendChild(line);
    getElement("consoleOutput").scrollTop = getElement("consoleOutput").scrollHeight;

    // Highlight search bar
    const searchWrap = document.querySelector(".shell-search-wrap");
    const searchInput = getElement("commandField");
    if (searchWrap) searchWrap.classList.add("bob-waiting");
    if (searchInput) {
        searchInput.placeholder = "Type a transaction code to answer Bob…";
        searchInput.focus();
    }
}

/**
 * Remove the awaiting prompt and reset the search bar to normal state.
 * Called when the user submits a command.
 */
export function clearBobAwaiting() {
    const prompt = document.getElementById("bobAwaitingPrompt");
    if (prompt) prompt.remove();

    const searchWrap = document.querySelector(".shell-search-wrap");
    const searchInput = getElement("commandField");
    if (searchWrap) searchWrap.classList.remove("bob-waiting");
    if (searchInput) searchInput.placeholder = "Search apps or enter transaction code…";
}

export function renderWelcomeScreen(state) {
    clearConsole();
    clearWorkspace();

    const scenario = state.activeScenario;

    getElement("screenTitle").textContent = scenario ? scenario.title : "Welcome to SAP SkillBridge";
    getElement("screenSubtitle").textContent = scenario
        ? `${scenario.module || "FI/CO"} – ${scenario.level || "Senior Manager"} scenario`
        : "Your SAP FI/CO practice simulator";

    if (scenario) {
        const txRows = scenario.transactions.map((t, i) => `
            <tr>
                <td><strong>${i + 1}</strong></td>
                <td><kbd>${t.code}</kbd></td>
                <td>${t.purpose}</td>
            </tr>
        `).join("");

        const progressRows = scenario.investigationPath.map((step, i) => {
            const done = state.completedSteps.includes(step.id);
            const current = !done && i === state.completedSteps.length;
            return `<div class="onboarding-step ${done ? "done" : current ? "current" : "todo"}">
                <span class="step-icon">${done ? "✓" : current ? "▶" : "○"}</span>
                <span>${step.label}</span>
            </div>`;
        }).join("");

        getElement("transactionWorkspace").innerHTML = `
            <div class="onboarding-box">
                <div class="onboarding-how">
                    <div class="onboarding-how-title">How to use this simulator</div>
                    <div class="onboarding-how-steps">
                        <div class="onboarding-how-step">
                            <div class="onboarding-how-num">1</div>
                            <div>
                                <strong>Read the scenario below</strong><br>
                                <span>Understand the business problem you need to solve.</span>
                            </div>
                        </div>
                        <div class="onboarding-how-step">
                            <div class="onboarding-how-num">2</div>
                            <div>
                                <strong>Type a transaction code above and press Run</strong><br>
                                <span>Use the table below as a guide for which transactions to try.</span>
                            </div>
                        </div>
                        <div class="onboarding-how-step">
                            <div class="onboarding-how-num">3</div>
                            <div>
                                <strong>Bob coaches you in the right panel</strong><br>
                                <span>Bob tells you if your choice was correct and what to do next.</span>
                            </div>
                        </div>
                        <div class="onboarding-how-step">
                            <div class="onboarding-how-num">4</div>
                            <div>
                                <strong>Complete all 3 steps to finish the scenario</strong><br>
                                <span>Watch your progress in the sidebar on the right.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="training-callout warning" style="margin-top:12px;">
                <strong>⚠ Business Problem:</strong> ${scenario.initialProblem}
            </div>

            <div class="training-callout info">
                <strong>Bob says:</strong> ${scenario.bobIntro}
            </div>

            <div style="margin-top:14px;">
                <strong style="font-size:13px;">Transactions to investigate — type them one by one:</strong>
                <table class="training-grid" style="margin-top:8px;">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Type this ↑</th>
                            <th>Why</th>
                        </tr>
                    </thead>
                    <tbody>${txRows}</tbody>
                </table>
            </div>

            <div style="margin-top:14px;">
                <strong style="font-size:13px;">Your progress:</strong>
                <div class="onboarding-progress" style="margin-top:8px;">${progressRows}</div>
            </div>
        `;

        printLine(`Bob: Scenario loaded — "${scenario.title}"`, "success");
        printLine(`Bob: ${scenario.bobIntro}`, "info");
        // Show the pulsing awaiting-input prompt so the user knows to type above
        showBobAwaiting();
        setStatusBar(`Active scenario: ${scenario.title} — type ${scenario.transactions[0]?.code} and press Run`, "info");
    } else {
        getElement("transactionWorkspace").innerHTML = `
            <div class="onboarding-box">
                <div class="onboarding-how-title">Welcome! Click "New Scenario" in the toolbar to begin.</div>
            </div>
        `;
        setStatusBar("Ready — click New Scenario to start.", "info");
    }
}

export function renderTransactionScreen(screen) {
    getElement("screenTitle").textContent = screen.title;
    getElement("screenSubtitle").textContent = screen.subtitle;
    getElement("transactionWorkspace").innerHTML = screen.html;
}

export function renderSidebar(state) {
    const scenario = state.activeScenario;

    // All available scenarios with module badge
    const allScenarios = [
        {
            id: "payment_run_exception",
            title: "Payment Run Blocked: Vendor Invoice Under Review",
            summary: "F110 payment run produced an exception. Investigate before posting.",
            module: "FI-AP",
            level: "Senior Manager"
        },
        {
            id: "cost_center_overrun",
            title: "IT Cost Center Over-Budget – Period Close at Risk",
            summary: "Cost center 10103000 is 13% over-budget. KSB1 variance investigation required.",
            module: "CO-OM",
            level: "Senior Manager"
        },
        {
            id: "copa_margin_analysis",
            title: "CO-PA Segment Profitability: Board Review Preparation",
            summary: "Prepare segment profitability findings for CFO Board presentation.",
            module: "CO-PA",
            level: "Principal Consultant"
        },
        {
            id: "billing_credit_block",
            title: "Billing Blocked by Credit Management",
            summary: "Customer credit limit exceeded. Investigate overdue AR before releasing the block.",
            module: "SD-FI",
            level: "Consultant"
        },
        {
            id: "grir_mismatch_period_end",
            title: "GR/IR Mismatch: Invoice Posted Before Goods Receipt",
            summary: "Account 191100 has a USD 95K open debit at period-end. Investigate and document for close.",
            module: "MM-FI",
            level: "Consultant / Senior Manager"
        }
    ];

    getElement("scenarioPanel").innerHTML = allScenarios.map(s => {
        const isActive = scenario && scenario.id === s.id;
        return `
            <div class="scenario-card ${isActive ? "active" : ""}">
                <div class="scenario-card-header">
                    <span class="scenario-module-badge ${s.module.replace("-","").toLowerCase()}">${s.module}</span>
                    <span class="scenario-level">${s.level}</span>
                </div>
                <strong>${s.title}</strong>
                <div class="scenario-summary">${s.summary}</div>
                <button class="scenario-select-btn ${isActive ? "active" : ""}" data-scenario-id="${s.id}">
                    ${isActive ? "Active" : "Start"}
                </button>
            </div>
        `;
    }).join("");

    getElement("learningObjectivesPanel").innerHTML = scenario ? `
        <ul class="sidebar-list">
            ${scenario.learningObjectives.map((item) => `<li>${item}</li>`).join("")}
        </ul>
    ` : "<p>No objectives loaded.</p>";

    getElement("currentHint").textContent = state.currentHint;

    getElement("quickReferencePanel").innerHTML = scenario ? `
        <div class="reference-list">
            ${scenario.transactions.map((item) => `
                <div class="reference-item">
                    <strong><kbd>${item.code}</kbd></strong> - ${item.purpose}
                </div>
            `).join("")}
        </div>
    ` : `
        <div class="reference-list">
            <div class="reference-item"><strong><kbd>VF01</kbd></strong> - Create billing document</div>
            <div class="reference-item"><strong><kbd>VKM3</kbd></strong> - Review blocked documents for credit</div>
            <div class="reference-item"><strong><kbd>VA03</kbd></strong> - Display sales document context</div>
        </div>
    `;

    const progressItems = scenario ? scenario.investigationPath.map((step, index) => {
        const completed = state.completedSteps.includes(step.id);
        const active = !completed && index === state.completedSteps.length;
        const cssClass = completed ? "progress-item completed" : active ? "progress-item active" : "progress-item";
        const status = completed ? "[OK]" : active ? "[!]" : "[ ]";

        return `<div class="${cssClass}">${status} ${step.label}</div>`;
    }).join("") : "<div class='progress-item'>No progress available.</div>";

    getElement("progressPanel").innerHTML = `<div class="progress-list">${progressItems}</div>`;
}

export function updateStatus(message, status = "info") {
    setStatusBar(message, status);
}

export function showPrompt(value = "") {
    const commandField = getElement("commandField");
    commandField.value = value;
    commandField.focus();
}

// bindUiEvents is no longer needed – all event binding is done in main.js
// Kept as no-op for backwards compatibility
export function bindUiEvents() {}

// Made with Bob – Fiori layout
