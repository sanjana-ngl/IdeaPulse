import { useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/40 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo + Brand Name */}
        <div 
          onClick={() => navigate("/")}
          className="flex items-center space-x-3 cursor-pointer"
        >
          {/* Simple Cyber Logo */}
          <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/40"></div>

          <span className="text-2xl font-bold tracking-wide">
            Idea<span className="text-blue-500">Pulse</span>
          </span>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/validate")}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold transition duration-300 shadow-md shadow-blue-500/20"
        >
          Start Validation
        </button>

      </div>
    </nav>
  )
}