import { useState } from "react"
import { useNavigate } from "react-router-dom"

const industries = {
  Technology: [
    "AI & Machine Learning",
    "Blockchain",
    "Cybersecurity",
    "SaaS",
    "Cloud Computing"
  ],
  EdTech: [
    "K-12 Learning",
    "Higher Education",
    "Test Prep",
    "Skill Development",
    "Corporate Training"
  ],
  FinTech: [
    "Digital Payments",
    "Lending",
    "Wealth Management",
    "InsurTech",
    "Crypto"
  ],
  HealthTech: [
    "Telemedicine",
    "Mental Health",
    "Fitness",
    "Medical Devices",
    "PharmaTech"
  ],
  "E-Commerce": [
    "D2C",
    "Marketplace",
    "Dropshipping",
    "B2B Commerce",
    "Subscription"
  ]
}

export default function IdeaForm() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    industry: "",
    subdomain: "",
    customIndustry: "",
    customSubdomain: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    navigate("/analyzing")
  }

  const subdomainOptions =
    industries[formData.industry] || []

  return (
    <form onSubmit={handleSubmit} className="space-y-8 text-white">

      <h2 className="text-4xl font-bold text-center mb-8">
        Enter Your Startup Idea 🚀
      </h2>

      <div>
        <label className="block mb-2 text-gray-300">Idea Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-black/60 border border-blue-500/40 text-white"
        />
      </div>

      <div>
        <label className="block mb-2 text-gray-300">Idea Description</label>
        <textarea
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-black/60 border border-blue-500/40 text-white"
        />
      </div>

      <div>
        <label className="block mb-2 text-gray-300">Industry</label>
        <select
          name="industry"
          value={formData.industry}
          onChange={(e) => {
            handleChange(e)
            setFormData((prev) => ({
              ...prev,
              subdomain: "",
              customSubdomain: ""
            }))
          }}
          className="w-full p-4 rounded-xl bg-black/60 border border-blue-500/40 text-white"
        >
          <option value="">Select Industry</option>
          {Object.keys(industries).map((ind) => (
            <option key={ind} value={ind}>{ind}</option>
          ))}
          <option value="Other">Other</option>
        </select>
      </div>

      {formData.industry === "Other" && (
        <div>
          <label className="block mb-2 text-gray-300">Enter Industry</label>
          <input
            type="text"
            name="customIndustry"
            value={formData.customIndustry}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black/60 border border-blue-500/40 text-white"
          />
        </div>
      )}

      {formData.industry && (
        <div>
          <label className="block mb-2 text-gray-300">Subdomain</label>

          {formData.industry !== "Other" ? (
            <select
              name="subdomain"
              value={formData.subdomain}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-black/60 border border-blue-500/40 text-white"
            >
              <option value="">Select Subdomain</option>
              {subdomainOptions.map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
              <option value="Other">Other</option>
            </select>
          ) : (
            <input
              type="text"
              name="customSubdomain"
              value={formData.customSubdomain}
              onChange={handleChange}
              placeholder="Enter Subdomain"
              className="w-full p-4 rounded-xl bg-black/60 border border-blue-500/40 text-white"
            />
          )}
        </div>
      )}

      {formData.subdomain === "Other" && formData.industry !== "Other" && (
        <div>
          <label className="block mb-2 text-gray-300">Enter Subdomain</label>
          <input
            type="text"
            name="customSubdomain"
            value={formData.customSubdomain}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black/60 border border-blue-500/40 text-white"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(139,92,246,0.6)]"
      >
        Analyze Idea ⚡
      </button>

    </form>
  )
}