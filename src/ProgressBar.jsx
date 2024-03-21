import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function ProgressBar({ width }) {
  const barRef = useRef()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 50) {
          clearInterval(interval)
          return 50
        }
        return oldProgress + 1
      })
    }, 100) // Update progress every 100 milliseconds

    return () => clearInterval(interval)
  }, [])

  useFrame(() => {
    const scaleX = (progress / 100) * width
    barRef.current.scale.x = scaleX // Scale based on progress and width
    // barRef.current.position.x = -(width / 2) + scaleX / 2 + 1.6 // Adjust position based on width
  })

  return (
    <mesh ref={barRef} position={[0, 2.8, 0]}>
      <boxGeometry args={[1, 0.05, 0.1]} /> // Width is 1, but we scale it
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

export default ProgressBar
