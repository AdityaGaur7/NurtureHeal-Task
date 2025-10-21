import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../api";
const HealthForm = () => {
  const [formData, setFormData] = useState({
    sleepQuality: "",
    stressLevel: 5,
    appetite: "",
    activityType: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "stressLevel" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${API_URL}/api/health/analyze`,
        formData
      );
      navigate("/dashboard", { state: { healthData: response.data } });
    } catch (error) {
      setError(error.response?.data?.message || "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Health Analysis</h1>
          <p className="mt-2 text-gray-600">
            Tell us about your current health status
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sleep Quality */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sleep Quality
              </label>
              <select
                name="sleepQuality"
                value={formData.sleepQuality}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Select sleep quality</option>
                <option value="Poor">Poor - Restless, frequent waking</option>
                <option value="Average">Average - Some interruptions</option>
                <option value="Good">Good - Restful, uninterrupted</option>
              </select>
            </div>

            {/* Stress Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stress Level: {formData.stressLevel}/10
              </label>
              <input
                type="range"
                name="stressLevel"
                min="1"
                max="10"
                value={formData.stressLevel}
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Low (1)</span>
                <span>High (10)</span>
              </div>
            </div>

            {/* Appetite */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Appetite
              </label>
              <select
                name="appetite"
                value={formData.appetite}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Select appetite level</option>
                <option value="Low">Low - Reduced appetite</option>
                <option value="Normal">Normal - Regular appetite</option>
                <option value="High">High - Increased appetite</option>
              </select>
            </div>

            {/* Activity Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activity Level
              </label>
              <select
                name="activityType"
                value={formData.activityType}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Select activity level</option>
                <option value="Sedentary">
                  Sedentary - Little to no exercise
                </option>
                <option value="Moderate">
                  Moderate - Light exercise 1-3 days/week
                </option>
                <option value="Active">
                  Active - Regular exercise 4+ days/week
                </option>
              </select>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary disabled:opacity-50"
              >
                {loading ? "Analyzing..." : "Analyze Health"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HealthForm;
