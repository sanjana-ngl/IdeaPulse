import { useNavigate } from "react-router-dom"

export default function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="min-h-screen pt-24 bg-black text-white flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">

      {/* Glow Background Effects */}
      <div className="absolute w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20 top-20 left-20"></div>
      <div className="absolute w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 bottom-20 right-20"></div>

      <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
        Validate Your Startup
        <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Instantly with AI
        </span>
      </h1>

      <p className="mt-6 text-gray-400 max-w-2xl text-lg">
        IdeaPulse helps founders analyze market demand, competition,
        monetization potential, and feasibility — in seconds.
      </p>

      <button
        onClick={() => navigate("/validate")}
        className="mt-10 px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-lg font-semibold hover:scale-110 transition duration-300 shadow-lg shadow-blue-500/30"
      >
        Start Validation 🚀
      </button>

    </section>
  )
}