import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export default function CTASection() {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative flex flex-col items-center text-center px-6"
    >
      <div className="absolute w-[1000px] h-[1000px] bg-purple-600 rounded-full blur-[300px] opacity-20 -z-10"></div>

      <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Validate Your Startup with AI
      </h2>

      <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12">
        Turn uncertainty into data-driven confidence instantly.
      </p>

      <button
        onClick={() => navigate("/validate")}
        className="px-10 py-5 text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(139,92,246,0.6)]"
      >
        Start Validation 🚀
      </button>
    </motion.div>
  )
}