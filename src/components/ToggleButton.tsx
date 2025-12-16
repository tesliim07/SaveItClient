import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE } from "../api";

const ToggleButton = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const fetchDeleteJobStatus = async () => {
      const token = localStorage.getItem("jwt");
      try {
        const response = await axios.get(
          `${API_BASE}/api/job/GetUserDeleteDecision`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setIsEnabled(response.data);
        }
      } catch (error) {
        console.error("Error fetching Delete Job status:", error);
      }
    };
    fetchDeleteJobStatus();
  }, []);

  const triggerDeleteJob = async () => {
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.post(
        `${API_BASE}/api/job/RunDeleteJob/${isEnabled}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Delete Job triggered successfully");
      }
    } catch (error) {
      console.error("Error triggering Delete Job:", error);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
    {/* mobile: label left + toggle right | desktop: whole thing aligned right */}
    <div className="flex w-full items-center justify-between sm:justify-end gap-3">
      <span className="text-xs sm:text-sm font-medium text-gray-700">
        Auto delete expired items every 24 hours
      </span>

      <button
        type="button"
        onClick={() => {
          setIsEnabled(!isEnabled);
          triggerDeleteJob();
        }}
        className={`relative h-8 w-14 rounded-full transition ${
          isEnabled ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white shadow transition-transform ${
            isEnabled ? "translate-x-6" : ""
          }`}
        />
      </button>
    </div>
  </div>
  );
};

export default ToggleButton;
