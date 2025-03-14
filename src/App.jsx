import { useState, useEffect } from 'react'
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
import Pedidos from './pages/pedidos.jsx'

function App() {

  const [listaProductos, setListaProductos] = useState([]);
  const [login, setLogin] = useState(false);
  const [idToken, setIdToken] = useState('');
  const [uid, setUid] = useState('');
  const [isCartHighlighted, setIsCartHighlighted] = useState(false);
  const [isCartHighlightedRed, setIsCartHighlightedRed] = useState(false);
  const [total, setTotal] = useState(0);


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

          let aux2 = '';
          for (let i = 0; i < aux.length; i++) {
            aux2 += aux[i][0] + ',' + aux[i][1] + ';';
          }
          localStorage.setItem('listaProductos', aux2);
        } else {
          let aux = listaProductos.slice();
          aux[i][1] = listaProductos[i][1] - 1;
          setListaProductos(aux);

          let aux2 = '';
          for (let i = 0; i < aux.length; i++) {
            aux2 += aux[i][0] + ',' + aux[i][1] + ';';
          }
          localStorage.setItem('listaProductos', aux2);
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
        aux[i][1] = parseInt(listaProductos[i][1], 10) + 1;

        setListaProductos(aux);

        carritoLocalStorage(aux);

        
      }
    }

    if (!existe) {
      let aux = listaProductos.slice();
      aux.push([e.target.value, 1]);
      setListaProductos(aux);

      carritoLocalStorage(aux);
    }

    // Iluminar el icono del carrito
    setIsCartHighlighted(true);
    setTimeout(() => {
      setIsCartHighlighted(false);
    }, 1000); // El icono se iluminará durante 1 segundo

    console.log(listaProductos);
  }

  const vaciarCarrito = () => {
    setListaProductos([]);
    localStorage.removeItem('listaProductos');
    setTotal(0);
  }

  const totalHandler = (total) => {
    setTotal(total);
  }

  const loginHandler = (idToken, uid) => {
    setLogin(true);
    setIdToken(idToken);
    setUid(uid);

    loginLocalStorage(idToken, uid);
  }

  const provocarLogout = () => {
    setLogin(false);
    setIdToken('');
    setUid('');

    localStorage.removeItem('login');
    localStorage.removeItem('idToken');
    localStorage.removeItem('uid');
  }

  useEffect(() => {
    if (localStorage.getItem('login') === 'true') {
      setLogin(true);
      loginHandler(localStorage.getItem('idToken'), localStorage.getItem('uid'));
    }
    let aux = localStorage.getItem('listaProductos');
    if (aux !== null) {
      aux = aux.split(';');
      let lista = [];
      for (let i = 0; i < aux.length; i++) {
        lista.push(aux[i].split(','));
        
      }
      setListaProductos(lista);
    }
  }, [])

  const loginLocalStorage = (idToken, uid) => {
    localStorage.setItem('login', 'true');
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('uid', uid);
  }

  const carritoLocalStorage = (carrito) => {
    let aux = '';
      for (let i = 0; i < carrito.length; i++) {
        aux += carrito[i][0] + ',' + carrito[i][1] + ';';
      }
      localStorage.setItem('listaProductos', aux);
    }

  return (
    <>
      <GlobalContext.Provider value={{ login: login, loginHandler: loginHandler, idToken: idToken, uid: uid, provocarLogout: provocarLogout }}>
        <CarritoContext.Provider value={{ listaProductos: listaProductos, setListaProductos: setListaProductos, menosHandler: menosHandler, masHandler: masHandler, vaciarCarrito: vaciarCarrito, total: total, totalHandler: totalHandler }}>
          <Header isCartHighlighted={isCartHighlighted} isCartHighlightedRed={isCartHighlightedRed} />
          <div style={{ height: 100 }}></div>
          <Routes>
            <Route path='/' element={<Products />} />
            <Route path='/carrito' element={<Carrito />} />
            <Route path='/login' element={<Login />} />
            <Route path='/formulario' element={<Formulario />} />
            <Route path='/confirmation' element={<Confirmation />} />
            <Route path='/agradecimiento' element={<Agradecimiento />} />
            <Route path='/pedidos' element={<Pedidos />} />
            <Route path='*' element={<h1>404 - Not found</h1>} />
          </Routes>
          <Footer />
        </CarritoContext.Provider>
      </GlobalContext.Provider>
    </>
  )
}

export default App
