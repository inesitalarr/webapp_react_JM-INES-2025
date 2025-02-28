import { useState } from 'react'
import './App.css'
import GlobalContext from './store/globalContext'
import { Routes, Route } from 'react-router'
import Products from './pages/products.jsx'

function App() {


  return (
    <>
      <GlobalContext.Provider value={{}}>
        <Routes>
          <Route path='/' element={<Products />}></Route>
        </Routes>
      </GlobalContext.Provider>
    </>
  )
}

export default App
