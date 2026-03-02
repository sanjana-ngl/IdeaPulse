import { motion } from "framer-motion"

export default function AboutSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center px-6"
    >
      <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Why IdeaPulse?
      </h2>

      <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed">
        IdeaPulse leverages AI to evaluate market demand, competition,
        monetization potential and feasibility — giving founders instant clarity
        before they invest time or money.
      </p>
    </motion.div>
  )
}