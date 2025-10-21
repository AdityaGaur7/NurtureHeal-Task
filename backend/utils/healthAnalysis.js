// Mock AI Logic for Health Analysis
export const analyzeHealthLogic = (sleepQuality, stressLevel, appetite, activityType) => {
    let result = 'Health Appears Balanced';
    let recommendation = 'Keep up the great work and stay consistent with your healthy habits!';

    // High stress detection
    if (stressLevel > 7 && sleepQuality === 'Poor') {
        result = 'High Stress Detected';
        recommendation = 'Consider mindfulness exercises and improving sleep hygiene. Try meditation or deep breathing exercises.';
    }
    // Poor sleep with moderate stress
    else if (sleepQuality === 'Poor' && stressLevel > 5) {
        result = 'Sleep Quality Needs Attention';
        recommendation = 'Focus on improving your sleep routine. Consider reducing screen time before bed and maintaining a consistent sleep schedule.';
    }
    // High stress with good sleep
    else if (stressLevel > 7 && sleepQuality === 'Good') {
        result = 'Stress Management Required';
        recommendation = 'Your sleep is good, but stress levels are concerning. Try stress-reduction techniques like exercise or talking to a professional.';
    }
    // Poor appetite with high stress
    else if (appetite === 'Low' && stressLevel > 6) {
        result = 'Appetite and Stress Concerns';
        recommendation = 'Stress may be affecting your appetite. Try stress management techniques and consider consulting a healthcare provider.';
    }
    // Sedentary lifestyle
    else if (activityType === 'Sedentary' && stressLevel > 5) {
        result = 'Activity Level Needs Improvement';
        recommendation = 'Consider incorporating more physical activity into your routine. Even light exercise can help with stress and overall health.';
    }
    // Excellent health indicators
    else if (sleepQuality === 'Good' && stressLevel <= 4 && appetite === 'Normal' && activityType === 'Active') {
        result = 'Excellent Health Status';
        recommendation = 'Outstanding! You\'re maintaining excellent health habits. Keep up the great work!';
    }

    return { result, recommendation };
};
