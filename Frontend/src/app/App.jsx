import React from 'react'
import { RouterProvider } from "react-router-dom"
import {router} from "./App.route"
import "../../src/Feature/Shared/Styles/global.scss"
import { SongContextProvider } from '../Feature/home/song.context'
import { useEffect } from 'react'
import { fetchCurrentUser } from '../Feature/auth/auth.slice'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
          dispatch(fetchCurrentUser());
      },[]);
  return (
      <SongContextProvider>
    <RouterProvider router={router} />
      </SongContextProvider>
    
  )
}

export default App
