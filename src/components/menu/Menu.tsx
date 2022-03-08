import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

    const Menu = ({ handleMenu }) => {

        const [ deleted, setDeleted ] = useState("")

        type optionsType = {
            name: string;
            img: string;
        }

        let options: optionsType[ ] = [
            { 
                name: "world",
                img: "https://media.istockphoto.com/photos/abstract-white-cube-block-moving-animation-background-3d-renderingn-picture-id1271870122?k=20&m=1271870122&s=612x612&w=0&h=-DthNRwfrJe3UIFNwmTuNoA_BZiS41NO6pVChlPogDs="
            },
            { 
                name: "box",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb-zF2tPGD6Ly_HwKjEnSGydcGJLr1LXnWry1Yks-W053ykf4c_sKZ2JojmctQGpxXjO0&usqp=CAU" 
            },
            { 
                name: "chain",
                img: "https://res.cloudinary.com/lenx2222/image/upload/v1646698736/Screenshot_194_tme2m7.png" 
            },
           { 
                name: "constraint",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvEdUOlBloGWZkMvnpHKP5gGbvYOLgK-BreA&usqp=CAU" 
            },
        ]

        return (
            <div>
                <div className= "absolute top-2 left-36">
                    <div className="flex">
                        <img 
                            src="https://uploads-ssl.webflow.com/5e5a5bd23fb2ccacf26e2a80/603fe6533d45a5e669bebf7c_image%204.svg" 
                            alt="menu"
                            className="menu-img z-50 w-24"
                        />
                        <h1 className="text-lg my-auto ml-2 text-Grey z-50"> ZEG.AI </h1>
                    </div>
                </div>
                <div className= "grid col-span-5 absolute bottom-10 z-50 left-36">
                    {
                        options.filter( o => !deleted.includes( o.name ) ).map( ( option, index ) => {
                            return (
                                <div 
                                    className="rounded-md bg-Grey shadow-button p-3 my-2 cursor-pointer bg-cover bg-center h-32 w-32 border-box relative"
                                    style={{ background: `url(${option.img})` }}
                                    key={index}
                                    onClick={ () => handleMenu(option.name) }
                                >
                                    <div   
                                        className="absolute top-0 right-0 m-2 rounded-full bg-white p-1 shadow-button"
                                        onClick= { () => setDeleted( deleted + option.name ) }
                                        >
                                        <AiOutlineClose className="w-4 h-4" />
                                    </div>
                                </div>
                            )
                        })
                    }   
                </div>
            </div>
    )}

export default Menu

