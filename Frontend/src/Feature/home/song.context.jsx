import { createContext , useState } from "react";
export const SongContext = createContext()
export const SongContextProvider = ({children})=>{
    const [song, setsong] = useState("")
    const [loading, setloading] = useState(false)
    return (
        <SongContext.Provider value={{loading,setloading,song,setsong}}>

            {children}
        </SongContext.Provider>
    )
}