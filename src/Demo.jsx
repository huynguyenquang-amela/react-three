import { useGLTF } from '@react-three/drei'
import { VideoMesh } from './VideoMesh'

export function Demo(props) {
  const gltf = useGLTF('./models/demo.glb')

  return (
    <>
      <primitive object={gltf.scene} />

      <VideoMesh url="/models/hocphan000.webm" position={[-5.5, 1.5, -2]} rotation={[0, Math.PI / 2 - 0.2, 0]} />
      <VideoMesh url="/models/hocphan001.webm" position={[0, 1.5, -6]} rotation={[0, 0, 0]} />
      <VideoMesh url="/models/hocphan002.webm" position={[5.8, 1.5, -2]} rotation={[0, -Math.PI / 2 + 0.2, 0]} />
    </>
  )
}

useGLTF.preload('/models/demo.glb')
