import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function IdeaForm() {

  const navigate = useNavigate();

  const industryOptions = {
    Fintech: ["Payments", "Lending", "WealthTech", "InsurTech"],
    EdTech: ["AI Tutoring", "LMS", "Test Prep", "Skill Development"],
    HealthTech: ["Telemedicine", "Diagnostics", "Wearables"],
    ECommerce: ["Marketplace", "D2C", "Subscription"],
    SaaS: ["B2B SaaS", "CRM", "Analytics"],
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    industry: "",
    subdomain: "",
    target_audience: "",
  });

  const [customIndustry, setCustomIndustry] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleIndustryChange = (e) => {
    const value = e.target.value;

    setFormData({
      ...formData,
      industry: value,
      subdomain: ""
    });
  };

  const handleSubmit = async () => {

    const finalIndustry =
      formData.industry === "Other" ? customIndustry : formData.industry;

    setLoading(true);

    // 🔥 Navigate immediately to analyzing screen
    navigate("/analyzing");

    try {
      const response = await fetch("https://ideapulse-backend-zoqq.onrender.com/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          industry: finalIndustry
        })
      });

      const data = await response.json();

      // ✅ SAVE RESULT TO LOCAL STORAGE (CRITICAL FIX)
      localStorage.setItem("ideaResult", JSON.stringify(data));

      // Small UX delay
      await new Promise(resolve => setTimeout(resolve, 1200));

      // 🔥 Navigate to results with state
      navigate("/results", { state: data });

    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="text-white space-y-6">

      <h2 className="text-4xl font-bold">
        Enter Your Startup Idea
      </h2>

      {/* Title */}
      <input
        type="text"
        name="title"
        placeholder="Idea Name"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-4 bg-black border border-blue-500 rounded-xl"
      />

      {/* Description */}
      <textarea
        name="description"
        placeholder="Describe your idea..."
        rows="4"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-4 bg-black border border-blue-500 rounded-xl"
      />

      {/* Industry Dropdown */}
      <select
        name="industry"
        value={formData.industry}
        onChange={handleIndustryChange}
        className="w-full p-4 bg-black border border-blue-500 rounded-xl"
      >
        <option value="">Select Industry</option>
        {Object.keys(industryOptions).map((industry) => (
          <option key={industry} value={industry}>
            {industry}
          </option>
        ))}
        <option value="Other">Other</option>
      </select>

      {/* Custom Industry Field */}
      {formData.industry === "Other" && (
        <input
          type="text"
          placeholder="Enter Custom Industry"
          value={customIndustry}
          onChange={(e) => setCustomIndustry(e.target.value)}
          className="w-full p-4 bg-black border border-purple-500 rounded-xl"
        />
      )}

      {/* Subdomain Dropdown */}
      {formData.industry &&
        formData.industry !== "Other" &&
        industryOptions[formData.industry] && (
          <select
            name="subdomain"
            value={formData.subdomain}
            onChange={handleChange}
            className="w-full p-4 bg-black border border-blue-500 rounded-xl"
          >
            <option value="">Select Subdomain</option>
            {industryOptions[formData.industry].map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        )}

      {/* Target Audience */}
      <input
        type="text"
        name="target_audience"
        placeholder="Target Audience"
        value={formData.target_audience}
        onChange={handleChange}
        className="w-full p-4 bg-black border border-blue-500 rounded-xl"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl hover:opacity-90 transition"
      >
        {loading ? "Analyzing..." : "Analyze Idea"}
      </button>

    </div>
  );
}
