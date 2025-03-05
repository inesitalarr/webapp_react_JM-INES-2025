import { useState } from 'react'
import './App.css'
import CarritoContext from './store/carritoContext';
import GlobalContext from './store/globalContext'
import { Routes, Route } from 'react-router'
import Products from './pages/products.jsx'
import Header from './components/UI/header.jsx'
import Footer from './components/UI/footer.jsx'
import Carrito from './pages/carrito.jsx'
import Login from './pages/login.jsx'

function App() {

  const [listaProductos, setListaProductos] = useState([]);
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState('');


  return (
    <>
    

      <GlobalContext.Provider value={{ login: login, setLogin: setLogin, username: username, setUsername: setUsername }}>
        <CarritoContext.Provider value={{ listaProductos: listaProductos, setListaProductos: setListaProductos }}>
        <Header />
        <div style={{ height: 100 }}></div>
        <Routes>
          <Route path='/' element={<Products />}></Route>
          <Route path='/carrito' element={<Carrito />} />
          <Route path='/login' element={<Login />} />
          
        </Routes>
        <Footer />
        </CarritoContext.Provider>
      </GlobalContext.Provider>
    </>
  )
}

export default App
