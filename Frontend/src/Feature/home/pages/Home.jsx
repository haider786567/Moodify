import React from 'react'
import FaceExpression from '../../expression/component/FaceExpression.jsx'
import { useSong } from '../hook/useSong.js'
import Player from "../component/Player.jsx"
import Logout from "../component/Logout.jsx"

const Home = () => {
    const { handleGetSong } = useSong()
    return (
        <>
            <Logout />
            <FaceExpression 
                onClick={(expression) => { handleGetSong({ mood: expression }) }}/>
            <Player />

        </>
    )
}

export default Home 
