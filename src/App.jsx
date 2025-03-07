import { useState } from 'react'
import './App.css'
import CarritoContext from './store/carritoContext'
import GlobalContext from './store/globalContext'
import { Routes, Route } from 'react-router'
import Products from './pages/products.jsx'
import Header from './components/UI/header.jsx'
import Footer from './components/UI/footer.jsx'
import Carrito from './pages/carrito.jsx'
import Login from './pages/login.jsx'
import Formulario from './pages/formulario.jsx'
import Confirmation from './pages/confirmation.jsx'
import Agradecimiento from './pages/agradecimiento.jsx'

function App() {

  const [listaProductos, setListaProductos] = useState([]);
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [isCartHighlighted, setIsCartHighlighted] = useState(false);
  const [isCartHighlightedRed, setIsCartHighlightedRed] = useState(false);


  const menosHandler = (e) => {
    console.log('Quitar ' + e.target.value);

    for (let i = 0; i < listaProductos.length; i++) {
      if (listaProductos[i][0] === e.target.value) {

        // Iluminar el icono del carrito en rojo
        setIsCartHighlightedRed(true);
        setTimeout(() => {
          setIsCartHighlightedRed(false);
        }, 1000); // El icono se iluminará en rojo durante 1 segundo

        if (listaProductos[i][1] == 1) {
          let aux = listaProductos.slice();
          aux.splice(i, 1);
          setListaProductos(aux);
        } else {
          let aux = listaProductos.slice();
          aux[i][1] = listaProductos[i][1] - 1;
          setListaProductos(aux);
        }
      }
    }

    
    console.log(listaProductos);
  }

  const masHandler = (e) => {
    console.log('Añadir ' + e.target.value);

    let existe = false;
    for (let i = 0; i < listaProductos.length; i++) {
      if (listaProductos[i][0] === e.target.value) {
        existe = true;

        let aux = listaProductos.slice();
        aux[i][1] = listaProductos[i][1] + 1;

        setListaProductos(aux);
      }
    }

    if (!existe) {
      let aux = listaProductos.slice();
      aux.push([e.target.value, 1]);
      setListaProductos(aux);
    }

    // Iluminar el icono del carrito
    setIsCartHighlighted(true);
    setTimeout(() => {
      setIsCartHighlighted(false);
    }, 1000); // El icono se iluminará durante 1 segundo

    console.log(listaProductos);
  }

  const loginHandler = (email) => {
    setLogin(true);
    setUsername(email);
  }


  return (
    <>
      <GlobalContext.Provider value={{ login: login, loginHandler: loginHandler }}>
        <CarritoContext.Provider value={{ listaProductos: listaProductos, setListaProductos: setListaProductos, menosHandler: menosHandler, masHandler: masHandler }}>
        <Header isCartHighlighted={isCartHighlighted} isCartHighlightedRed={isCartHighlightedRed} />
        <div style={{ height: 100 }}></div>
          <Routes>
            <Route path='/' element={<Products />} />
            <Route path='/carrito' element={<Carrito />} />
            <Route path='/login' element={<Login />} />
            <Route path='/formulario' element={<Formulario />} />
            <Route path='/confirmation' element={<Confirmation />} />
            <Route path='/agradecimiento' element={<Agradecimiento />} />
            <Route path='*' element={<h1>404 - Not found</h1>} />
          </Routes>
          <Footer />
        </CarritoContext.Provider>
      </GlobalContext.Provider>
    </>
  )
}

export default App
