"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function GradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create gradient points
    const points = [
      { x: width * 0.1, y: height * 0.1, radius: Math.max(width, height) * 0.2, color: "rgba(76, 29, 149, 0.5)" }, // Purple
      { x: width * 0.9, y: height * 0.2, radius: Math.max(width, height) * 0.15, color: "rgba(6, 182, 212, 0.4)" }, // Cyan
      { x: width * 0.5, y: height * 0.8, radius: Math.max(width, height) * 0.25, color: "rgba(59, 130, 246, 0.4)" }, // Blue
    ]

    // Animation variables
    let animationFrameId: number
    let time = 0

    const animate = () => {
      time += 0.005

      // Clear canvas
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = "rgba(0, 0, 0, 0.9)"
      ctx.fillRect(0, 0, width, height)

      // Update point positions with gentle movement
      points.forEach((point, i) => {
        point.x = width * (0.2 + 0.6 * (0.5 + 0.5 * Math.sin(time + i * Math.PI * 0.67)))
        point.y = height * (0.2 + 0.6 * (0.5 + 0.5 * Math.cos(time * 0.8 + i * Math.PI * 0.53)))
      })

      // Draw gradients
      points.forEach((point) => {
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius)
        gradient.addColorStop(0, point.color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 z-0"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </motion.div>
  )
}

