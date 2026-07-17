export function createInitialState() {
    return {
        mode: "beginner", // "beginner" or "professional"
        activeScenario: null,
        completedSteps: [],
        lastTransaction: null,
        currentHint: "Start Practice Mode and follow Bob's guidance step by step.",
        userProgress: {
            scenariosCompleted: 0,
            currentScenarioStatus: "Not started"
        },
        selectedModule: "SD",
        selectionScreen: {
            active: false,
            transactionCode: null,
            filters: {},
            executed: false
        }
    };
}

// Made with Bob
