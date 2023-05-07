import { useState, Children } from 'react'
import { useTrail, a } from '@react-spring/web'
import { Canvas } from '@react-three/fiber'
import { Box, ContactShadows, Environment, Html, OrbitControls, Sky, useGLTF } from "@react-three/drei"

const Trail = ({ open, children }) => {
  const items = Children.toArray(children)
  const trail = useTrail(items.length, {
    config: { mass: 7, tension: 300, friction: 100 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })
  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} className="text-black text-7xl md:text-8xl tracking-tight font-extrabold leading-10 h-14 md:h-20" style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  )
}

function TextMain() {
  const [open, set] = useState(true)
  return (
    <div className="flex items-center justify-center md:justify-start md:m-40 md:mt-0 sm:m-0 sm:justify-center h-full">
      <Trail open={open}>
        <span className='text-white'>Let's</span>
        <span className='text-white'>Program!</span>
      </Trail>
    </div>
  )
}

function NotebookContent() {
  const { nodes, materials } = useGLTF("./notebook.glb")

  return (
      <group position={[0, 0, 0]} rotation={[0.3, 0, 0]}>
        <group rotation-x={-0.425} position={[0, -0.04, 0.41]}>
          <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh material={materials.aluminium} geometry={nodes['Cube008'].geometry} />
            <mesh material={materials['matte.001']} geometry={nodes['Cube008_1'].geometry} />
            <mesh geometry={nodes['Cube008_2'].geometry}>
              <Html className="content" rotation-x={-Math.PI / 2} position={[0, 0.05, -0.09]} transform occlude>
                <div className="wrapper" onPointerDown={(e) => e.stopPropagation()}>
                </div>
              </Html>
            </mesh>
          </group>
        </group>
        <mesh material={materials.keys} geometry={nodes.keyboard.geometry} position={[1.79, 0, 3.45]} />
        <group position={[0, -0.1, 3.39]}>
          <mesh material={materials.aluminium} geometry={nodes['Cube002'].geometry} />
          <mesh material={materials.trackpad} geometry={nodes['Cube002_1'].geometry} />
        </group>
        <mesh material={materials.touchbar} geometry={nodes.touchbar.geometry} position={[0, -0.03, 1.2]} />
      </group>
  )
}

export default function Main() {

  return (
    <main className='pb-60 flex-1'>
      <div style={{ zIndex: 1 }} className="absolute h-screen w-full top-0">
        <Canvas camera={{ position: [0, -2, 20], fov: 55 }}>
          <color attach="background" args={['black']} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
          <Environment preset="city" />
          <NotebookContent />
          <Html position={[0, 0, 10]} transform={false}>
            <div>
              <TextMain />
            </div>
          </Html>
          <OrbitControls />
        </Canvas>
      </div>
    </main>
  )
}