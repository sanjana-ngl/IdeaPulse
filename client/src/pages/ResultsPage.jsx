import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { motion } from "framer-motion"

const marketData = [
  { month: "Jan", demand: 40 },
  { month: "Feb", demand: 55 },
  { month: "Mar", demand: 70 },
  { month: "Apr", demand: 65 },
  { month: "May", demand: 85 },
  { month: "Jun", demand: 95 },
]

export default function ResultsPage() {
  const score = 82

  return (
    <div className="min-h-screen bg-black text-white px-8 py-16 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[1200px] h-[1200px] bg-purple-600 rounded-full blur-[350px] opacity-10 -z-10"></div>

      <h1 className="text-5xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Validation Dashboard
      </h1>

      {/* GRID LAYOUT */}
      <div className="grid md:grid-cols-2 gap-10">

        {/* 🧮 Validation Score */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-[0_0_40px_rgba(139,92,246,0.3)] flex flex-col items-center justify-center"
        >
          <h2 className="text-2xl mb-6">Validation Score</h2>

          <div className="relative w-40 h-40">
            <svg className="w-full h-full rotate-[-90deg]">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#1f2937"
                strokeWidth="12"
                fill="transparent"
              />
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={440}
                strokeDashoffset={440 - (440 * score) / 100}
                strokeLinecap="round"
                initial={{ strokeDashoffset: 440 }}
                animate={{ strokeDashoffset: 440 - (440 * score) / 100 }}
                transition={{ duration: 1.5 }}
              />
              <defs>
                <linearGradient id="gradient">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
              {score}%
            </div>
          </div>
        </motion.div>

        {/* 📈 Market Demand Chart */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-[0_0_40px_rgba(59,130,246,0.3)]"
        >
          <h2 className="text-2xl mb-6">Market Demand</h2>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={marketData}>
              <XAxis dataKey="month" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="demand"
                stroke="#a855f7"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* 🆚 Competitor Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-[0_0_40px_rgba(139,92,246,0.3)]"
        >
          <h2 className="text-2xl mb-8">Competitor Comparison</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {["Competitor A", "Competitor B", "Competitor C"].map((comp) => (
              <div
                key={comp}
                className="bg-white/5 p-6 rounded-xl border border-white/10 hover:scale-105 transition-transform"
              >
                <h3 className="text-lg font-semibold mb-3">{comp}</h3>
                <p className="text-gray-400 text-sm">
                  Market Presence: Medium  
                  <br />
                  Pricing: Premium  
                  <br />
                  Strength: Brand Recognition
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 📌 SWOT Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-[0_0_40px_rgba(59,130,246,0.3)]"
        >
          <h2 className="text-2xl mb-8">SWOT Analysis</h2>

          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="text-blue-400 font-semibold mb-2">Strengths</h3>
              <ul className="list-disc ml-6 text-gray-300">
                <li>Strong market demand</li>
                <li>Scalable model</li>
              </ul>
            </div>

            <div>
              <h3 className="text-purple-400 font-semibold mb-2">Weaknesses</h3>
              <ul className="list-disc ml-6 text-gray-300">
                <li>High competition</li>
              </ul>
            </div>

            <div>
              <h3 className="text-green-400 font-semibold mb-2">Opportunities</h3>
              <ul className="list-disc ml-6 text-gray-300">
                <li>Growing digital adoption</li>
              </ul>
            </div>

            <div>
              <h3 className="text-red-400 font-semibold mb-2">Threats</h3>
              <ul className="list-disc ml-6 text-gray-300">
                <li>Regulatory challenges</li>
              </ul>
            </div>
          </div>
        </motion.div>

      </div>

    </div>
  )
}