import { useGLTF } from '@react-three/drei'
import { VideoMesh } from './VideoMesh'
import { useEffect, useState } from 'react'
import { Html } from '@react-three/drei'

export function DemoSubject(props) {
  const gltf = useGLTF('./models/demo.glb')
  const [selectedAnswer, setSelectedAnswer] = useState(0)
  const [isShowQuestion, setIsShowQuestion] = useState(false)
  const [isSkip, setIsSkip] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setIsShowQuestion(true)
    }, 10000)
  })

  return (
    <>
      <primitive object={gltf.scene} />

      <VideoMesh url="/models/hocphan12.webm" position={[0, 1.2, -1.3]} rotation={[0, Math.PI / 2 - 1.5, 0]} />
      <Html scale={10} position={[2, 2, 0]}>
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
          <h1 className="skip" onClick={() => setIsSkip(true)}>
            Skip
          </h1>
          {/* {question.map((item) => (
            <div className="question">
              <h1>{item.title}</h1>
              {item.answers.map((answer) => (
                <div className="answer">
                  <h1>{answer}</h1>
                </div>
              ))}
            </div>
          ))} */}
        </div>
      </Html>
      <Html scale={10} position={[5, 2, 1]}></Html>
    </>
  )
}

useGLTF.preload('/models/demo.glb')
