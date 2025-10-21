import mongoose from 'mongoose';

const healthDataSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sleepQuality: {
        type: String,
        required: true,
        enum: ['Poor', 'Average', 'Good']
    },
    stressLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    appetite: {
        type: String,
        required: true,
        enum: ['Low', 'Normal', 'High']
    },
    activityType: {
        type: String,
        required: true,
        enum: ['Sedentary', 'Moderate', 'Active']
    },
    result: {
        type: String,
        required: true
    },
    recommendation: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const HealthData = mongoose.model('HealthData', healthDataSchema);

export default HealthData;