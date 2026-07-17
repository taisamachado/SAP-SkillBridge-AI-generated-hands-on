import { getTransactionResponse } from "../data/transaction-data.js";

export function executeTransaction(code, state) {
    const response = getTransactionResponse(code);

    if (!response) {
        return {
            lines: [
                { text: `Bob: Transaction ${code} is not available in the current training scenario.`, type: "error" },
                { text: "Bob: Try one of these transactions: VF01, VKM3, or VA03.", type: "info" }
            ],
            statusMessage: "Unsupported transaction for the active training scenario.",
            statusType: "error"
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
