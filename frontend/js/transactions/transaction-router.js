import { getTransactionResponse } from "../data/transaction-data.js";

export function executeTransaction(code, state) {
    const response = getTransactionResponse(code);

    if (!response) {
        // Provide module-aware guidance when the transaction has no response
        const suggestions = {
            // FI/AP
            F110: "F110, FBL1N, FB03",
            FBL1N: "F110, FBL1N, FB03",
            // CO
            KSB1: "KSB1, FB03, FS10N",
            KE30: "KE30, KSB1, FS10N",
            FS10N: "FS10N, FB03, KSB1",
            // SD/FI
            VF01: "VF01, VKM3, VA03, FBL5N",
            VKM3: "VKM3, FBL5N, VA03",
            FBL5N: "VKM3, FBL5N, VA03",
            // MM/FI
            MB51: "MB51, MIRO, FB03, FS10N",
            MIRO: "MIRO, MB51, FB03"
        };

        const hint = suggestions[code] || "F110, FBL1N, FB03, KSB1, KE30, FS10N, VF01, VKM3, VA03, FBL5N, MB51, MIRO";
        return {
            lines: [
                { text: `Bob: Transaction ${code} is not part of the active scenario's investigation path.`, type: "warning" },
                { text: `Bob: Relevant transactions for this scenario: ${hint}`, type: "info" },
                { text: "Bob: Type HELP to see the recommended investigation path.", type: "info" }
            ],
            statusMessage: `Transaction ${code} — not on the active investigation path.`,
            statusType: "warning"
        };
    }

    const result = {
        lines: response.lines,
        screen: response.screen,
        completedStep: response.completedStep || null,
        hint: response.hint || state.currentHint,
        statusMessage: response.statusMessage || `Transaction ${code} executed.`,
        statusType: response.statusType || "info"
    };

    if (response.completedStep && !state.completedSteps.includes(response.completedStep)) {
        state.completedSteps.push(response.completedStep);
    }

    if (state.activeScenario && state.completedSteps.length >= state.activeScenario.investigationPath.length) {
        state.userProgress.currentScenarioStatus = "Completed";
        state.userProgress.scenariosCompleted = 1;
        result.lines = [
            ...result.lines,
            { text: "Bob: You completed the guided investigation successfully.", type: "success" }
        ];
        result.statusMessage = "Scenario completed successfully.";
        result.statusType = "success";
    } else if (state.completedSteps.length > 0) {
        state.userProgress.currentScenarioStatus = "In progress";
    }

    return result;
}

// Made with Bob
