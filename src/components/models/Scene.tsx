import React, { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";
// import Car from '@/components/models/Car';
import type { Mesh } from "three";


interface SceneProps {
    color: string;
    hoverColor: string;
}

interface BoxProps {
    color: string;
    hoverColor: string;
}

interface PlaneProps {
    color: string;
    hoverColor: string;
}

const Box = (props: BoxProps) => {
    let color = props.color;
    let hoverColor = props.hoverColor;
    // This reference will give us direct access to the mesh
    const mesh = useRef<Mesh>();

    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => {
        if (mesh.current)
            mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    });

    
    return (
        <mesh
        ref={mesh}
        scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}
        >
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? hoverColor : color} />
        </mesh>
    );
};

function Plane( props: PlaneProps ) {
    let color = props.color;
    let hoverColor = props.hoverColor;

    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
    }));
    return (
        <mesh 
            ref={ref} 
            rotation={[-Math.PI / 2, 0, 0]}
            scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
        >
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <meshLambertMaterial attach="material" color={hovered ? hoverColor : color} />
        </mesh>
    );
}

function Scene(props: SceneProps) {
    return (
        <>
            <OrbitControls />
            <Stars />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow />
            <pointLight position={[10, 10, 10]} />
            <Physics>
                <Box color={props.color} hoverColor={props.hoverColor} />
            </Physics>
        </>
    );
}

export default Scene;