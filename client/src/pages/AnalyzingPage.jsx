import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AnalyzingPage() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)

  const messages = [
    "Scanning Market Demand...",
    "Analyzing Competitors...",
    "Calculating TAM & SAM...",
    "Evaluating Monetization...",
    "Running Feasibility Model..."
  ]

  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          navigate("/results")
          return 100
        }
        return prev + 2
      })
    }, 60)

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length)
    }, 1000)

    return () => {
      clearInterval(interval)
      clearInterval(messageInterval)
    }
  }, [navigate])

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden text-white">

      {/* Background Glow */}
      <div className="absolute w-[600px] h-[600px] bg-purple-600/20 blur-[150px] animate-pulse"></div>

      <div className="z-10 w-full max-w-xl text-center space-y-10 px-6">

        <h1 className="text-4xl font-bold tracking-wide">
          AI is Analyzing Your Idea
        </h1>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-6 overflow-hidden backdrop-blur-md border border-white/20">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-xl text-purple-400 font-semibold">
          {progress}%
        </p>

        <p className="text-gray-400 animate-pulse">
          {messages[messageIndex]}
        </p>

      </div>
    </div>
  )
}