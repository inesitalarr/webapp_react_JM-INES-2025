import { useState } from 'react'
import './App.css'
import GlobalContext from './store/globalContext'
import { Routes, Route } from 'react-router'
import Productos from './pages/productos.jsx'

function App() {


  return (
    <>
      <GlobalContext.Provider value={{}}>
        <Routes>
          <Route path='/' element={<Productos />}></Route>
        </Routes>
      </GlobalContext.Provider>
    </>
  )
}

export default App
