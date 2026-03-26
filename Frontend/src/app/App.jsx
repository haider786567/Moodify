import React from 'react'
import { RouterProvider } from "react-router-dom"
import {router} from "./App.route"
import { AuthProvider } from "../Feature/auth/auth.context"
import "../src/Feature/Shared/Styles/global.scss"
import { SongContextProvider } from '../Feature/home/song.context'

function App() {
  return (
    <AuthProvider>
      <SongContextProvider>
    <RouterProvider router={router} />
      </SongContextProvider>
    </AuthProvider>
  )
}

export default App
