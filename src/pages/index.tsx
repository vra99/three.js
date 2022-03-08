import { useState } from 'react'
import { useControls, button } from "leva";
import Scene from "@/components/models/Scene";
import Friction from "@/components/models/Friction"
import Chain from '@/components/models/Chain';
import Sphere from "@/components/models/Sphere"
import CanvasLayout from "@/components/canvas/CanvasLayout";
import Layout from "@/components/layout/Layout";
import Menu from "@/components/menu/Menu";
import Constraints from '@/components/models/Constraints';
import { IoMdResize } from "react-icons/io";

export default function Home() {
    const { color, hoverColor, backgroundColor } = useControls({
        color: "#ff5722",
        backgroundColor: "#393e46",
        hoverColor: "#00adb5",
        name: 'World',
        size: { value: { width: 200, height: 300 }, label: <IoMdResize /> },
        save: button((get) => alert(`saved`)),
    });

    const [ object, setObject ] = useState( "world" )
    const handleMenu = ( e ) => {
      setObject( e )
    }

    const Scenes = () => (
      object === 'world' ? 
        <Friction color= { color } hoverColor= { hoverColor }/>
      : 
        object === 'box' ?
          <Scene color={color} hoverColor={hoverColor} />
      : 
        object === 'chain' ? 
          <Chain color={color} hoverColor={hoverColor} />
      :
        object === 'constraint' ? 
          <Constraints color={color} hoverColor={hoverColor} />
      :
        null
    )

    return (
        <>
          <Layout title={"First"}>
            <Menu handleMenu= { handleMenu } />    
            <CanvasLayout backgroundColor= { backgroundColor }>
              <Scenes />
            </CanvasLayout>
          </Layout>
        </>
    );
}  