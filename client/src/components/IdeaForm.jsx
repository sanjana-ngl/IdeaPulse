import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function IdeaForm() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    industry: "",
    subdomain: "",
    target_audience: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {

    try {
      // OPTIONAL: Navigate to analyzing page first
      navigate("/analyzing");

      const response = await fetch("http://127.0.0.1:8000/api/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      await response.json();

      // After API call finishes → go to static results page
      setTimeout(() => {
        navigate("/results");
      }, 1500);

    } catch (error) {
      console.error("Error:", error);
      navigate("/results"); // fallback
    }
  };

  return (
    <div className="text-white space-y-6">

      <h2 className="text-4xl font-bold">
        Enter Your Startup Idea
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Idea Name"
        onChange={handleChange}
        className="w-full p-4 bg-black border border-blue-500 rounded-xl"
      />

      <textarea
        name="description"
        placeholder="Describe your idea..."
        rows="4"
        onChange={handleChange}
        className="w-full p-4 bg-black border border-blue-500 rounded-xl"
      />

      <input
        type="text"
        name="industry"
        placeholder="Industry (e.g. HealthTech)"
        onChange={handleChange}
        className="w-full p-4 bg-black border border-blue-500 rounded-xl"
      />

      <input
        type="text"
        name="subdomain"
        placeholder="Subdomain (e.g. Telemedicine)"
        onChange={handleChange}
        className="w-full p-4 bg-black border border-blue-500 rounded-xl"
      />

      <input
        type="text"
        name="target_audience"
        placeholder="Target Audience (e.g. Working Professionals)"
        onChange={handleChange}
        className="w-full p-4 bg-black border border-blue-500 rounded-xl"
      />

      <button
        onClick={handleSubmit}
        className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl"
      >
        Analyze Idea
      </button>

    </div>
  );
}