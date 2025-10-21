import HealthData from '../models/healthdata.js';
import { analyzeHealthLogic } from '../utils/healthAnalysis.js';

export const analyzeHealthData = async (userId, healthMetrics) => {
    try {
        const { sleepQuality, stressLevel, appetite, activityType } = healthMetrics;

        
        const { result, recommendation } = analyzeHealthLogic(
            sleepQuality,
            stressLevel,
            appetite,
            activityType
        );

    
        const healthData = new HealthData({
            user: userId,
            sleepQuality,
            stressLevel,
            appetite,
            activityType,
            result,
            recommendation
        });

        await healthData.save();

        return {
            success: true,
            healthData
        };
    } catch (error) {
        console.error('Health analysis service error:', error);
        return {
            success: false,
            message: 'Server error during health analysis'
        };
    }
};

export const getLatestHealthData = async (userId) => {
    try {
        const healthData = await HealthData.findOne({ user: userId })
            .sort({ createdAt: -1 })
            .populate('user', 'name email');

        if (!healthData) {
            return {
                success: false,
                message: 'No health data found'
            };
        }

        return {
            success: true,
            healthData
        };
    } catch (error) {
        console.error('Get latest health data service error:', error);
        return {
            success: false,
            message: 'Server error'
        };
    }
};

export const getHealthHistory = async (userId) => {
    try {
        const healthHistory = await HealthData.find({ user: userId })
            .sort({ createdAt: -1 })
            .populate('user', 'name email');

        return {
            success: true,
            healthHistory
        };
    } catch (error) {
        console.error('Get health history service error:', error);
        return {
            success: false,
            message: 'Server error'
        };
    }
};

export default {
    analyzeHealthData,
    getLatestHealthData,
    getHealthHistory
};
