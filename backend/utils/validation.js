// Validation utilities
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password) => {
    return password && password.length >= 6;
};

export const validateHealthMetrics = (healthData) => {
    const { sleepQuality, stressLevel, appetite, activityType } = healthData;

    const validSleepQuality = ['Poor', 'Average', 'Good'].includes(sleepQuality);
    const validStressLevel = typeof stressLevel === 'number' && stressLevel >= 1 && stressLevel <= 10;
    const validAppetite = ['Low', 'Normal', 'High'].includes(appetite);
    const validActivityType = ['Sedentary', 'Moderate', 'Active'].includes(activityType);

    return validSleepQuality && validStressLevel && validAppetite && validActivityType;
};

export const sanitizeInput = (input) => {
    if (typeof input === 'string') {
        return input.trim();
    }
    return input;
};
