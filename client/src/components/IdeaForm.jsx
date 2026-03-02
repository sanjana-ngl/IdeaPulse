import { useState } from "react"

export default function IdeaForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    industry: "",
    audience: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 text-white">

      <h2 className="text-4xl font-bold text-center mb-8">
        Enter Your Startup Idea 
      </h2>

      {/* Idea Name */}
      <div>
        <label className="block mb-2 text-gray-300">Idea Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-black/60 border border-blue-500/40 focus:border-purple-500 focus:outline-none text-white placeholder-gray-400"
          placeholder="Enter your startup name..."
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-2 text-gray-300">Idea Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full p-4 rounded-xl bg-black/60 border border-blue-500/40 focus:border-purple-500 focus:outline-none text-white placeholder-gray-400"
          placeholder="Describe your startup idea..."
        />
      </div>

      {/* Industry */}
      <div>
        <label className="block mb-2 text-gray-300">Industry</label>
        <input
          type="text"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-black/60 border border-blue-500/40 focus:border-purple-500 focus:outline-none text-white placeholder-gray-400"
          placeholder="e.g. EdTech, FinTech..."
        />
      </div>

      {/* Target Audience */}
      <div>
        <label className="block mb-2 text-gray-300">Target Audience</label>
        <input
          type="text"
          name="audience"
          value={formData.audience}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-black/60 border border-blue-500/40 focus:border-purple-500 focus:outline-none text-white placeholder-gray-400"
          placeholder="e.g. College students..."
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(139,92,246,0.6)]"
      >
        Analyze Idea ⚡
      </button>

    </form>
  )
}