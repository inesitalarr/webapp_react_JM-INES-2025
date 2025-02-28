import { useState } from 'react'
import './App.css'
import GlobalContext from './store/globalContext'
import { Routes, Route } from 'react-router'
import Productos from './pages/productos.jsx'
import Header from './components/UI/header.jsx'
import Footer from './components/UI/footer.jsx'
import Carrito from './pages/carrito.jsx'

function App() {


  return (
    <>
    
      <GlobalContext.Provider value={{}}>
        <Header />
        <Routes>
          <Route path='/' element={<Productos />}></Route>
          <Route path='/carrito' element={<Carrito />} />
        </Routes>
        <Footer />
      </GlobalContext.Provider>
    </>
  )
}

export default App
