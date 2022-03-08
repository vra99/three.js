import type { BoxProps, PlaneProps } from '@react-three/cannon'
import { Physics, useBox, useContactMaterial, usePlane } from '@react-three/cannon'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'

const materialColors = {
  ground: '#00adb5',
  rubber: '#364F6B',
  slippery: '#ff5722',
} as const


const bouncyMaterial = {
  restitution: 1.1,
}

const boxMaterial = 'box'

const groundMaterial = 'ground'

const rubberMaterial = 'rubber'

const slipperyMaterial = {
  friction: 0,
  name: 'slippery',
}

const Box = ({ args, color = 'white', ...props }: BoxProps & { color?: string }) => {
  const [ref] = useBox(() => ({
    args,
    mass: 10,
    ...props,
  }))
  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxBufferGeometry args={args} />
      <meshLambertMaterial color={color} />
    </mesh>
  )
}

const Plane = (props: PlaneProps) => {
  const [ref] = usePlane(() => ({ ...props }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry args={[100, 100]} />
      <meshStandardMaterial color={materialColors.ground} />
    </mesh>
  )
}

const useContactMaterials = (rubberSlips: boolean) => {
  useContactMaterial(groundMaterial, groundMaterial, {
    contactEquationRelaxation: 3,
    contactEquationStiffness: 1e8,
    friction: 0.4,
    frictionEquationStiffness: 1e8,
    restitution: 0.3,
  })

  useContactMaterial(boxMaterial, groundMaterial, {
    contactEquationRelaxation: 3,
    contactEquationStiffness: 1e8,
    friction: 0.4,
    frictionEquationStiffness: 1e8,
    restitution: 0.3,
  })
  useContactMaterial(boxMaterial, slipperyMaterial, {
    friction: 0,
    restitution: 0.3,
  })

  useContactMaterial(groundMaterial, slipperyMaterial, {
    friction: 0,
    restitution: 0.3,
  })
  useContactMaterial(slipperyMaterial, slipperyMaterial, {
    friction: 0.1,
    restitution: 0.3,
  })

  useContactMaterial(bouncyMaterial, slipperyMaterial, {
    friction: 0,
    restitution: 0.5,
  })
  useContactMaterial(bouncyMaterial, groundMaterial, {
    restitution: 0.9,
  })
  useContactMaterial(bouncyMaterial, bouncyMaterial, {
    restitution: 10.0, // This does nothing because bouncyMaterial already has a restitution
  })

  useContactMaterial(
    rubberMaterial,
    slipperyMaterial,
    {
      friction: rubberSlips ? 0 : 1,
      restitution: 0.3,
    },
    [rubberSlips],
  )

  useContactMaterial(rubberMaterial, bouncyMaterial, {
    restitution: 0.5,
  })
}

interface ColorsProps {
    color: string
    hoverColor: string
}

function PhysicsContent( { color, hoverColor } : ColorsProps ) {
  const [rubberSlips, setRubberSlips] = useState(false)
  const toggleRubberSlips = () => setRubberSlips(!rubberSlips)

  useContactMaterials(rubberSlips)

  return (
    <group onPointerMissed={toggleRubberSlips} onPointerUp={toggleRubberSlips}>
      <Box material={bouncyMaterial} position={[-7, 2, -2]} color={ hoverColor } />
      <Box material={boxMaterial} position={[-7, 2, 0]} color= { color } />
      <Box material={rubberMaterial} position={[-7, 2, 2]} color={materialColors.rubber} />
      <Box material={slipperyMaterial} position={[-7, 2, 4]} color={materialColors.slippery} />
      <Box
        material={slipperyMaterial}
        position={[-6, 1, 0]}
        color={materialColors.slippery}
        args={[4, 0.1, 10]}
        type="Static"
      />
      <Box
        material={bouncyMaterial}
        position={[-2, 0.1, 0]}
        color={materialColors.bouncy}
        args={[4, 0.1, 10]}
        type="Static"
      />
      <Box
        material={rubberMaterial}
        position={[15, 0.01, 0]}
        color={materialColors.rubber}
        args={[20, 0.1, 10]}
        type="Static"
      />
      <Plane material={groundMaterial} rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  )
}

export default ({ color, hoverColor } : ColorsProps ) => (
  <>
      <OrbitControls />
      <pointLight position={[1, 2, 3]} castShadow />
      <ambientLight intensity={0.2} />
      <Physics gravity={[3, -9.81, 0]}>
        <PhysicsContent color= { color } hoverColor= { hoverColor } />
      </Physics>
  </>
)