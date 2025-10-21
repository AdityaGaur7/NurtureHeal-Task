import healthService from '../services/healthService.js';

export const analyzeHealth = async (req, res) => {
    try {
        const { sleepQuality, stressLevel, appetite, activityType } = req.body;


        if (!sleepQuality || !stressLevel || !appetite || !activityType) {
            return res.status(400).json({ message: 'All health metrics are required' });
        }

        const result = await healthService.analyzeHealthData(
            req.userId,
            { sleepQuality, stressLevel, appetite, activityType }
        );

        if (result.success) {
            res.status(201).json(result.healthData);
        } else {
            res.status(400).json({ message: result.message });
        }
    } catch (error) {
        console.error('Health analysis error:', error);
        res.status(500).json({ message: 'Server error during health analysis' });
    }
};

export const getLatestHealthData = async (req, res) => {
    try {
        const result = await healthService.getLatestHealthData(req.userId);

        if (result.success) {
            res.json(result.healthData);
        } else {
            res.status(404).json({ message: result.message });
        }
    } catch (error) {
        console.error('Get latest health data error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getHealthHistory = async (req, res) => {
    try {
        const result = await healthService.getHealthHistory(req.userId);

        if (result.success) {
            res.json(result.healthHistory);
        } else {
            res.status(500).json({ message: result.message });
        }
    } catch (error) {
        console.error('Get health history error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
