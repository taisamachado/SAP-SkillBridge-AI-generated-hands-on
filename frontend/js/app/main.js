import { createInitialState } from "../core/state.js";
import {
    renderSidebar,
    renderWelcomeScreen,
    bindUiEvents,
    printLine,
    showPrompt,
    updateStatus,
    renderTransactionScreen
} from "../ui/console-ui.js";
import { renderSelectionScreen, renderResultGrid } from "../ui/professional-mode.js";
import { getScenarioById, getAllScenarios } from "../scenarios/scenario-registry.js";
import { executeTransaction } from "../transactions/transaction-router.js";
import { MASTER_DATA } from "../data/master-data.js";
import { getSAPMessage, formatMessageForConsole } from "../data/sap-messages.js";

const state = createInitialState();

function toggleMode() {
    state.mode = state.mode === "beginner" ? "professional" : "beginner";

    const button = document.getElementById("modeToggleButton");
    if (state.mode === "professional") {
        button.textContent = "Switch to Coaching Mode";
        updateStatus("Professional Mode active. Select a transaction from the menu or type a code above.", "info");
        document.getElementById("screenTitle").textContent = "Professional Mode";
        document.getElementById("screenSubtitle").textContent = "Real SAP workflow: Selection Screen → Execute → Result Grid";
        document.getElementById("contentBreadcrumb").textContent = "Home › Professional Mode";
        document.getElementById("transactionWorkspace").innerHTML = `
            <div class="training-callout info">
                <strong>Professional Mode active.</strong>
                <p>Select a transaction from the left menu, or type a code in the search bar above and press ▶.</p>
                <p style="margin-top:6px;font-size:12px;">FI/CO: <strong>F110 · FBL1N · FB03 · FS10N · KSB1 · KE30</strong> &nbsp;|&nbsp; SD: <strong>VA03 · VA05 · VF01 · VKM3 · MMBE · MB51</strong></p>
            </div>
        `;
        printLine("Professional Mode activated. Select a transaction from the menu.", "success");
    } else {
        button.textContent = "Switch to Professional Mode";
        startScenario();
    }
}

function startScenario(scenarioId) {
    // Default to the primary FI/CO scenario for the Senior Manager role
    const id = scenarioId || "payment_run_exception";
    state.activeScenario = getScenarioById(id);
    state.completedSteps = [];
    state.lastTransaction = null;
    state.currentHint = state.activeScenario
        ? getFirstHintForScenario(state.activeScenario)
        : "Enter a transaction code to begin.";
    state.userProgress.currentScenarioStatus = "In progress";
    renderSidebar(state);
    renderWelcomeScreen(state);
    showPrompt(state.activeScenario?.transactions?.[0]?.code || "F110");
}

function getFirstHintForScenario(scenario) {
    const firstTransaction = scenario.transactions?.[0]?.code;
    const hints = {
        payment_run_exception: "Start by reviewing the F110 payment run proposal status and its exceptions.",
        cost_center_overrun:   "Start by running KSB1 for cost center 10103000 to see the variance vs plan.",
        copa_margin_analysis:  "Start by executing KE30 to generate the CO-PA segment profitability report.",
        billing_credit_block:  "Start by reproducing the billing issue in VF01."
    };
    return hints[scenario.id] || `Start with transaction ${firstTransaction || "F110"}.`;
}

function resetScenario() {
    if (state.mode === "professional") {
        state.selectionScreen = {
            active: false,
            transactionCode: null,
            filters: {},
            executed: false
        };
        document.getElementById("transactionWorkspace").innerHTML = `
            <div class="training-callout info">
                <strong>Professional Mode</strong>
                <p>Enter a transaction code to practice the real SAP workflow. FI/CO: F110, FBL1N, FB03, FS10N, KSB1, KE30. SD: VA05, VF04, VKM3, MMBE, MB51.</p>
            </div>
        `;
        updateStatus("Professional Mode reset. Enter a transaction code.", "info");
        showPrompt();
        return;
    }

    const currentId = state.activeScenario?.id || "payment_run_exception";
    state.activeScenario = getScenarioById(currentId);
    state.completedSteps = [];
    state.lastTransaction = null;
    state.currentHint = getFirstHintForScenario(state.activeScenario);
    state.userProgress.currentScenarioStatus = "Reset";
    renderSidebar(state);
    renderWelcomeScreen(state);
    printLine("Bob: Scenario reset completed. Let us start again from the business issue.", "success");
    updateStatus(`Scenario reset. Recommended first transaction: ${state.activeScenario?.transactions?.[0]?.code || "F110"}`, "info");
    showPrompt(state.activeScenario?.transactions?.[0]?.code || "F110");
}

function normalizeCommand(rawInput) {
    return rawInput.trim().replace(/^\/n/i, "").toUpperCase();
}

function handleProfessionalMode(input) {
    if (!state.selectionScreen.active) {
        const supportedTransactions = [
            // FI / CO
            "FB03", "FS10N", "KSB1", "F110", "KE30", "FBL1N",
            // SD / O2C
            "VA03", "VA05", "VL03N", "VF01", "VF04", "VKM3", "MMBE", "MB51"
        ];
        if (!supportedTransactions.includes(input)) {
            printLine(`Transaction ${input} is not yet available in Professional Mode.`, "error");
            printLine("FI/CO: FB03, FS10N, KSB1, F110, KE30, FBL1N", "info");
            printLine("SD/O2C: VA03, VA05, VL03N, VF01, VF04, VKM3, MMBE, MB51", "info");
            updateStatus("Unsupported transaction for Professional Mode.", "error");
            showPrompt();
            return;
        }

        state.selectionScreen.active = true;
        state.selectionScreen.transactionCode = input;
        state.selectionScreen.executed = false;

        const selectionHtml = renderSelectionScreen(input, state);
        document.getElementById("screenTitle").textContent = `${input} – Selection Screen`;
        document.getElementById("screenSubtitle").textContent = "Fill the filter parameters and press Execute (F8) or Enter";
        document.getElementById("transactionWorkspace").innerHTML = selectionHtml;

        bindSelectionScreenEvents();

        printLine(`Transaction ${input} opened.`, "success");
        printLine("Fill the selection criteria and press Execute (F8).", "info");
        updateStatus("Selection screen loaded. Fill filters and execute.", "info");
        return;
    }

    printLine("Selection screen is already active. Press Execute or Back.", "warning");
    updateStatus("Use Execute button to run the query.", "warning");
}

function bindSelectionScreenEvents() {
    const executeButton = document.getElementById("executeButton");
    const clearButton = document.getElementById("clearButton");
    const backButton = document.getElementById("backButton");

    if (executeButton) {
        executeButton.addEventListener("click", () => {
            executeSelectionScreen();
        });
    }

    if (clearButton) {
        clearButton.addEventListener("click", () => {
            printLine("Selection criteria cleared.", "info");
            updateStatus("Filters cleared.", "info");
        });
    }

    if (backButton) {
        backButton.addEventListener("click", () => {
            state.selectionScreen.active = false;
            state.selectionScreen.transactionCode = null;
            document.getElementById("transactionWorkspace").innerHTML = `
                <div class="training-callout info">
                    <strong>Professional Mode</strong>
                    <p>Enter a transaction code such as VA05, VF04, or MB51 to practice the real SAP workflow.</p>
                </div>
            `;
            printLine("Returned to transaction entry.", "info");
            updateStatus("Selection screen closed.", "info");
            showPrompt();
        });
    }
}

function executeSelectionScreen() {
    const filters = {};
    const inputs = document.querySelectorAll(".sap-input");
    inputs.forEach(input => {
        if (input.value) {
            filters[input.id] = input.value;
        }
    });

    const checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
    checkboxes.forEach(checkbox => {
        filters[checkbox.id] = true;
    });

    state.selectionScreen.filters = filters;
    state.selectionScreen.executed = true;

    const resultHtml = renderResultGrid(state.selectionScreen.transactionCode, filters, state);
    document.getElementById("screenTitle").textContent = `${state.selectionScreen.transactionCode} - Result List`;
    document.getElementById("screenSubtitle").textContent = "Query executed successfully";
    document.getElementById("transactionWorkspace").innerHTML = resultHtml;

    printLine(`Query executed for ${state.selectionScreen.transactionCode}.`, "success");
    printLine(`Filters applied: ${Object.keys(filters).length} criteria`, "info");
    updateStatus("Result grid displayed successfully.", "success");
}

function handleCommand(rawInput) {
    const input = normalizeCommand(rawInput);

    if (!input) {
        updateStatus("No transaction entered.", "warning");
        showPrompt();
        return;
    }

    state.lastTransaction = input;
    printLine(`Learner: ${rawInput}`, "prompt");

    if (state.mode === "professional") {
        handleProfessionalMode(input);
        return;
    }

    if (input === "HELP") {
        if (state.activeScenario) {
            const txList = state.activeScenario.transactions.map(t => t.code).join(" → ");
            printLine(`Bob: Scenario: "${state.activeScenario.title}"`, "info");
            printLine(`Bob: Recommended investigation path: ${txList}`, "info");
            printLine(`Bob: Current hint: ${state.currentHint}`, "warning");
        } else {
            printLine("Bob: FI/CO transactions: F110, FBL1N, FB03, FS10N, KSB1, KE30", "info");
            printLine("Bob: SD transactions: VF01, VKM3, VA03, VA05, VF04, VL03N, MMBE, MB51", "info");
        }
        updateStatus("Help displayed.", "info");
        showPrompt();
        return;
    }

    const result = executeTransaction(input, state);

    result.lines.forEach((line) => {
        printLine(line.text, line.type);
    });

    if (result.screen) {
        renderTransactionScreen(result.screen);
    }

    if (result.hint) {
        state.currentHint = result.hint;
    }

    renderSidebar(state);
    updateStatus(result.statusMessage, result.statusType);
    showPrompt();
}

// ── Scenario selector buttons (right sidebar cards) ──────────────────────
document.addEventListener("click", (e) => {
    const btn = e.target.closest(".scenario-select-btn");
    if (btn) {
        const id = btn.dataset.scenarioId;
        if (id) startScenario(id);
    }
});

// ── Left nav: transaction items ───────────────────────────────────────────
document.addEventListener("click", (e) => {
    const item = e.target.closest(".nav-item[data-tcode]");
    if (item) {
        const tcode = item.dataset.tcode;
        // Highlight active nav item
        document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));
        item.classList.add("active");
        // Fill command field and submit
        const field = document.getElementById("commandField");
        field.value = tcode;
        handleCommand(tcode);
    }
});

// ── Left nav: scenario items ──────────────────────────────────────────────
document.addEventListener("click", (e) => {
    const item = e.target.closest(".nav-item[data-scenario]");
    if (item) {
        document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));
        item.classList.add("active");
        startScenario(item.dataset.scenario);
    }
});

// ── Left nav: group headers collapse/expand ───────────────────────────────
document.addEventListener("click", (e) => {
    const header = e.target.closest(".nav-group-header");
    if (header) {
        header.closest(".nav-group").classList.toggle("collapsed");
    }
});

// ── Menu toggle (hamburger) ───────────────────────────────────────────────
document.getElementById("menuToggleBtn").addEventListener("click", () => {
    document.getElementById("fioriNav").classList.toggle("collapsed");
});

// ── Coach panel collapse/expand ───────────────────────────────────────────
document.getElementById("coachToggleBtn").addEventListener("click", () => {
    document.getElementById("coachPanel").classList.toggle("collapsed");
});

// ── Mode toggle (status bar link) ─────────────────────────────────────────
document.getElementById("modeToggleButton").addEventListener("click", toggleMode);

// ── Enter key in search bar ───────────────────────────────────────────────
document.getElementById("commandField").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        handleCommand(e.target.value);
    }
});
document.getElementById("enterCommandButton").addEventListener("click", () => {
    handleCommand(document.getElementById("commandField").value);
});

startScenario();

// Made with Bob – Fiori layout + FI/CO scenarios for Senior Manager role preparation
