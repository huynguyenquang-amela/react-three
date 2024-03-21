import { OrbitControls, useGLTF } from '@react-three/drei'
import { VideoMesh } from './VideoMesh'
import { useEffect, useRef, useState } from 'react'
import { Html } from '@react-three/drei'
import ProgressBar from './ProgressBar'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { useTransition, a, useSpring } from '@react-spring/three'

function Model({ url, position, ...props }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} position={position} {...props} />
}

function RotatingModel({ url, position, delay }) {
  const modelRef = useRef()
  const gltf = useLoader(GLTFLoader, url)
  const [show, setShow] = useState(false)

  // Delayed appearance
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  // Rotate the model
  useFrame(() => {
    modelRef.current.rotation.y += 0.01
  })

  // return <primitive ref={modelRef} object={gltf.scene} position={position} />
  const { opacity, scale } = useSpring({
    opacity: show ? 1 : 0,
    scale: show ? 1 : 0,
    config: { mass: 1, tension: 120, friction: 14, duration: 1500 },
    from: { opacity: 0, scale: 0 }
  })

  return (
    <a.primitive ref={modelRef} object={gltf.scene} scale={scale.to((s) => [s, s, s])} position={position}>
      <a.meshStandardMaterial attach="material" transparent opacity={opacity} />
    </a.primitive>
  )
}

export function DemoSubject(props) {
  const [selectedAnswer, setSelectedAnswer] = useState(0)
  const [isShowQuestion, setIsShowQuestion] = useState(false)
  const [isSkip, setIsSkip] = useState(false)

  useEffect(() => {
    // if (progress === 50) {
    setTimeout(() => {
      setIsShowQuestion(true)
    }, 5000)
    // }
  }, [])

  return (
    <>
      <ProgressBar progress={50} width={5} />
      {/* <primitive object={gltf.scene} /> */}
      {/* <HologramModel /> */}
      <Model url={'./models/demo.glb'} position={[0, 0, 0]} />
      <RotatingModel url={'./models/hologram.glb'} position={[-3, 0.5, 0]} delay={5000} />
      <VideoMesh url="/models/hocphan12.webm" position={[0, 1.2, -1.3]} rotation={[0, Math.PI / 2 - 1.5, 0]} />
      <Html scale={10} position={[-1, -2, 0]}>
        <div className={`list-questions ${isShowQuestion && 'animate'} ${isSkip && 'hide'}`}>
          <h1 className="question">Question 1</h1>
          <h1 className={`answer ${selectedAnswer === 1 && 'active'}`} onClick={() => setSelectedAnswer(1)}>
            A. Answer 1
          </h1>
          <h1 className={`answer ${selectedAnswer === 2 && 'active'}`} onClick={() => setSelectedAnswer(2)}>
            B. Answer 2
          </h1>
          <h1 className={`answer ${selectedAnswer === 3 && 'active'}`} onClick={() => setSelectedAnswer(3)}>
            C. Answer 3
          </h1>
          <h1 className={`answer ${selectedAnswer === 4 && 'active'}`} onClick={() => setSelectedAnswer(4)}>
            D. Answer 4
          </h1>
        </div>
      </Html>
      <Html scale={10} position={[2.5, -1, 0]}>
        <h1 className={`skip ${isShowQuestion && 'animate'} ${isSkip && 'hide'}`} onClick={() => setIsSkip(true)}>
          Skip
        </h1>
      </Html>
    </>
  )
}

useGLTF.preload('/models/demo.glb')
