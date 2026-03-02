import logo from "../../assets/logo.png"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { useState } from "react"

export default function BrandSection() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10])
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10])

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative flex flex-col items-center text-center px-6 pt-10 pb-24 overflow-hidden"
    >

      {/* Interactive Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.15)_1px,_transparent_1px)] bg-[size:40px_40px] opacity-20 -z-20"></div>

      {/* Neural SVG Background */}
      <svg className="absolute w-full h-full opacity-20 -z-10">
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        {[...Array(15)].map((_, i) => (
          <line
            key={i}
            x1={`${Math.random() * 100}%`}
            y1={`${Math.random() * 100}%`}
            x2={`${Math.random() * 100}%`}
            y2={`${Math.random() * 100}%`}
            stroke="url(#neuralGradient)"
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* Title */}
      <motion.h1
        style={{ rotateX, rotateY }}
        className="mt-4 text-[6rem] md:text-[9rem] font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent"
      >
        IdeaPulse
      </motion.h1>

      {/* Tagline */}
      <p className="mt-4 text-xl md:text-2xl text-gray-300">
        From Idea to Insight — Instantly.
      </p>

      {/* Logo with Parallax */}
      <motion.img
        src={logo}
        alt="IdeaPulse Logo"
        style={{ rotateX, rotateY }}
        className="mt-12 w-[400px] md:w-[520px] object-contain drop-shadow-[0_0_120px_rgba(59,130,246,0.8)] animate-logoFloat"
      />

      {/* AI Scanning Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-scan"></div>

    </div>
  )
}