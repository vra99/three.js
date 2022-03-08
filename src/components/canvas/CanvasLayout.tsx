import { ReactNode } from "react"
import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Perf } from "r3f-perf";
import styled from 'styled-components';

interface CanvasLayoutProps {
    children: ReactNode,
    backgroundColor: string,
}

function CanvasLayout({ children, backgroundColor }: CanvasLayoutProps) {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [pixelRatio, setPixelRatio] = useState(0)

    useEffect(() => {
        const canvas = document.querySelector('.webgl')

        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
        setPixelRatio(window.devicePixelRatio)

        window.addEventListener('resize', () => {
            setWidth(window.innerWidth)
            setHeight(window.innerHeight)
            setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })

    }, []);

    // Size
    const sizes = {
        width: typeof window !== undefined ? width : undefined,
        height: typeof window !== undefined ? height : undefined
    }
    // Aspect
    let aspectRatio = width/height

    return (
        <>
            <StyledCanvas
                style={{ 
                    width: sizes.width, 
                    height: sizes.height,
                    backgroundColor: backgroundColor ? backgroundColor : '#393e46',
                }}
                camera={{
                    position: [0, 0, 3],
                    aspect: aspectRatio,
                    near: 0.1,
                    far: 100,
                }}
            >
                { children }
                <Perf position={"bottom-right"} />
            </StyledCanvas>
        </>
    );

}

const StyledCanvas = styled(Canvas)`
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
`;

export default CanvasLayout;