import { useLocation } from "react-router-dom"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

export default function ResultsPage() {

  const location = useLocation()

  const storedData = localStorage.getItem("ideaResult")
  const data = location.state || (storedData ? JSON.parse(storedData) : null)

  if (!data || !data.breakdown) {
    return <div className="text-white p-10">No data found.</div>
  }

  const profileData = [
    { name: "Market", value: data.breakdown?.market_index || 0 },
    { name: "Competition", value: data.breakdown?.competition_index || 0 },
    { name: "Monetization", value: data.breakdown?.monetization_index || 0 },
    { name: "Scalability", value: data.breakdown?.scalability_index || 0 },
    { name: "Risk", value: data.breakdown?.risk_index || 0 },
  ]

  return (
    <div className="min-h-screen bg-black text-white px-8 py-16">

      <h1 className="text-4xl font-bold mb-10">
        Validation Dashboard
      </h1>

      <h2 className="text-2xl mb-8">
        Final Score: <span className="text-purple-400">
          {data.validation_score ?? 0}
        </span>
      </h2>

      {/* Line Graph */}
      <div className="mb-16">
        <h3 className="text-xl mb-4">Business Profile Analysis</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={profileData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" domain={[0, 100]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#a855f7"
              strokeWidth={3}
              dot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Competitors */}
      {data.competitors && (
          <div className="mb-16">
    <h3 className="text-xl mb-6">Competitor Comparison</h3>

    <div className="grid md:grid-cols-3 gap-6">
      {data.competitors.map((comp, index) => (
        <div
          key={index}
          className="bg-white/5 border border-white/10 rounded-xl p-6 hover:scale-105 transition"
        >
          <h4 className="text-lg font-semibold mb-3">{comp.name}</h4>
          <p className="text-gray-400 text-sm">
            Market Presence: <span className="text-purple-400">{comp.market_presence}</span>
          </p>
        </div>
      ))}
    </div>
  </div>
      )}

      {/* SWOT */}
      {data.swot && (
        <div>
          <h3 className="text-xl mb-8">SWOT Analysis</h3>

          <div className="grid md:grid-cols-2 gap-8">
            {["strengths", "weaknesses", "opportunities", "threats"].map((key) => (
              <div key={key} className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h4 className="text-lg font-semibold mb-4 capitalize text-purple-400">
                  {key}
                </h4>
                <ul className="list-disc ml-6 space-y-2 text-gray-300">
                  {data.swot[key]?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}