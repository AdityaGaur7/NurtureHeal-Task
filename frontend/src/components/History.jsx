import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const History = () => {
  const [healthHistory, setHealthHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHealthHistory = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/health/history`);
        setHealthHistory(response.data);
      } catch (error) {
        console.error("Error fetching health history:", error);
        setError("Failed to load health history");
      } finally {
        setLoading(false);
      }
    };

    fetchHealthHistory();
  }, []);

  const getResultColor = (result) => {
    if (result.includes("Excellent")) return "bg-green-100 text-green-800";
    if (result.includes("High Stress") || result.includes("Concerns"))
      return "bg-red-100 text-red-800";
    if (result.includes("Needs Attention") || result.includes("Required"))
      return "bg-yellow-100 text-yellow-800";
    return "bg-blue-100 text-blue-800";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Health History
              </h1>
              <p className="text-gray-600">
                Track your health analysis over time
              </p>
            </div>
            <button
              onClick={() => navigate("/dashboard")}
              className="btn-secondary"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {error && (
          <div className="card mb-6">
            <div className="text-red-600 text-center">{error}</div>
          </div>
        )}

        {healthHistory.length === 0 ? (
          <div className="card text-center">
            <div className="text-gray-500 text-lg mb-4">
              No health data found
            </div>
            <button
              onClick={() => navigate("/health-form")}
              className="btn-primary"
            >
              Start Your First Analysis
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {healthHistory.map((entry, index) => (
              <div key={entry._id} className="card">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Analysis #{healthHistory.length - index}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(entry.createdAt)}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getResultColor(
                      entry.result
                    )}`}
                  >
                    {entry.result}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-gray-700">{entry.recommendation}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm text-gray-600">Sleep</div>
                    <div className="font-semibold text-blue-600">
                      {entry.sleepQuality}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-sm text-gray-600">Stress</div>
                    <div className="font-semibold text-red-600">
                      {entry.stressLevel}/10
                    </div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-sm text-gray-600">Appetite</div>
                    <div className="font-semibold text-green-600">
                      {entry.appetite}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-sm text-gray-600">Activity</div>
                    <div className="font-semibold text-yellow-600">
                      {entry.activityType}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/health-form")}
            className="btn-primary"
          >
            New Health Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default History;
