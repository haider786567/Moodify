import React from 'react'
import { RouterProvider } from "react-router-dom"
import {router} from "./App.route"
import "../../src/Feature/Shared/Styles/global.scss"
import { useEffect } from 'react'
import { fetchCurrentUser } from '../Feature/auth/auth.slice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

function App() {
  const dispatch = useDispatch();
  const {authChecked} = useSelector((state) => state.auth);
  useEffect(() => {
  dispatch(fetchCurrentUser());
}, []);
if (!authChecked) {
  return <div>Loading...</div>;
}
  return (
      
    <RouterProvider router={router} />
      
    
  )
}

export default App
