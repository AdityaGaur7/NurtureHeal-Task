import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,  
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { API_URL } from "../api";
import axios from "axios";

const Dashboard = () => {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestHealthData = async () => {
      try {
        if (location.state?.healthData) {
          setHealthData(location.state.healthData);
          setLoading(false);
          return;
        }

        const response = await axios.get(`${API_URL}/api/health/latest`);
        setHealthData(response.data);
      } catch (error) {
        if (error.response?.status === 404) {
          setError(
            "No health data found. Please complete a health analysis first."
          );
        } else {
          setError("Failed to load health data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLatestHealthData();
  }, [location.state]);

  const getResultColor = (result) => {
    if (result.includes("Excellent")) return "text-green-600";
    if (result.includes("High Stress") || result.includes("Concerns"))
      return "text-red-600";
    if (result.includes("Needs Attention") || result.includes("Required"))
      return "text-yellow-600";
    return "text-blue-600";
  };

  const getChartData = () => {
    if (!healthData) return [];

    const sleepScore =
      healthData.sleepQuality === "Good"
        ? 3
        : healthData.sleepQuality === "Average"
        ? 2
        : 1;
    const appetiteScore =
      healthData.appetite === "High"
        ? 3
        : healthData.appetite === "Normal"
        ? 2
        : 1;
    const activityScore =
      healthData.activityType === "Active"
        ? 3
        : healthData.activityType === "Moderate"
        ? 2
        : 1;

    return [
      { name: "Sleep Quality", value: sleepScore, max: 3 },
      { name: "Stress Level", value: healthData.stressLevel, max: 10 },
      { name: "Appetite", value: appetiteScore, max: 3 },
      { name: "Activity", value: activityScore, max: 3 },
    ];
  };

  const getPieData = () => {
    if (!healthData) return [];

    return [
      {
        name: "Sleep",
        value:
          healthData.sleepQuality === "Good"
            ? 3
            : healthData.sleepQuality === "Average"
            ? 2
            : 1,
        color: "#3B82F6",
      },
      { name: "Stress", value: healthData.stressLevel, color: "#EF4444" },
      {
        name: "Appetite",
        value:
          healthData.appetite === "High"
            ? 3
            : healthData.appetite === "Normal"
            ? 2
            : 1,
        color: "#10B981",
      },
      {
        name: "Activity",
        value:
          healthData.activityType === "Active"
            ? 3
            : healthData.activityType === "Moderate"
            ? 2
            : 1,
        color: "#F59E0B",
      },
    ];
  };

  const COLORS = ["#3B82F6", "#EF4444", "#10B981", "#F59E0B"];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-red-600 text-lg mb-4">{error}</div>
            <button
              onClick={() => navigate("/health-form")}
              className="btn-primary"
            >
              Start Health Analysis
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Health Dashboard</h1>
          <p className="text-gray-600">Your latest health analysis results</p>
        </div>

        {/* Result Card */}
        <div className="card mb-8">
          <div className="text-center">
            <h2
              className={`text-2xl font-bold mb-4 ${getResultColor(
                healthData.result
              )}`}
            >
              {healthData.result}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {healthData.recommendation}
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Bar Chart */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">
              Health Metrics Overview
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Health Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={getPieData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {getPieData().map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Health Details */}
        <div className="card mb-8">
          <h3 className="text-xl font-semibold mb-4">Health Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-600">Sleep Quality</div>
              <div className="text-lg font-semibold text-blue-600">
                {healthData.sleepQuality}
              </div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-sm text-gray-600">Stress Level</div>
              <div className="text-lg font-semibold text-red-600">
                {healthData.stressLevel}/10
              </div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-600">Appetite</div>
              <div className="text-lg font-semibold text-green-600">
                {healthData.appetite}
              </div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-sm text-gray-600">Activity</div>
              <div className="text-lg font-semibold text-yellow-600">
                {healthData.activityType}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/health-form")}
            className="btn-primary"
          >
            New Health Analysis
          </button>
          <button
            onClick={() => navigate("/history")}
            className="btn-secondary"
          >
            View History
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
