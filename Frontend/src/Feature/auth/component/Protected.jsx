import React from 'react'
import { useAuth } from '../hook/useAuth'
import { Navigate } from 'react-router'

function Protected({children}) {
    const {
        user,loading
    } = useAuth()
    
    if(loading ){
        <h1>Loading...</h1>
    }
    if(!user){
        return <Navigate to="/login" />
        
    }
return children
}

export default Protected
