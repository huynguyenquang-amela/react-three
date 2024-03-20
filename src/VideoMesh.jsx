import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useRef, useEffect } from 'react'

export function VideoMesh(props) {
  const videoTexture = useRef()
  const video = document.createElement('video')
  video.src = props?.url
  video.crossOrigin = 'Anonymous'
  video.loop = true
  video.muted = true

  console.log('props: ', props)
  useEffect(() => {
    if (videoTexture.current) {
      video.play()
    }
  }, [videoTexture.current])

  videoTexture.current = new THREE.VideoTexture(video)

  // Kích thước của mặt phẳng chứa video
  const videoWidth = 3.5
  const videoHeight = 2

  // Tạo một mặt phẳng với kích thước của video
  const geometry = new THREE.PlaneGeometry(videoWidth, videoHeight)
  const material = new THREE.MeshBasicMaterial({ map: videoTexture.current, transparent: true })

  // Tạo mesh từ geometry và material
  const videoMesh = new THREE.Mesh(geometry, material)

  // Điều chỉnh kích thước và vị trí của video
  videoMesh.scale.set(1, 1, 1) // Điều chỉnh tỷ lệ kích thước theo trục X, Y, Z
  videoMesh.position.set(props?.position[0], props?.position[1], props?.position[2]) // Điều chỉnh vị trí của video trong không gian 3D
  videoMesh.rotation.set(props?.rotation[0], props?.rotation[1], props?.rotation[2])

  return (
    <>
      <primitive object={videoMesh} />
    </>
  )
}

useGLTF.preload('/models/demo.glb')
