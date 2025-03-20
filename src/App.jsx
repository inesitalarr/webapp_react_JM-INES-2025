import { useState, useEffect } from 'react'
import './App.css'
import CarritoContext from './store/carritoContext'
import GlobalContext from './store/globalContext'
import { Routes, Route } from 'react-router'
import Products from './pages/products.jsx'
import Header from './components/UI/header.jsx'
import Footer from './components/UI/footer.jsx'
import Formulario from './pages/formulario.jsx'
import Confirmation from './pages/confirmation.jsx'
import Agradecimiento from './pages/agradecimiento.jsx'
import Pedidos from './pages/pedidos.jsx'
import axios from 'axios'
import { Toast, ToastContainer } from 'react-bootstrap';
import ToastContext from './store/toastContext.jsx'

function App() {

  const [listaProductos, setListaProductos] = useState([]);
  const [login, setLogin] = useState(false);
  const [idToken, setIdToken] = useState('');
  const [uid, setUid] = useState('');
  const [isCartHighlighted, setIsCartHighlighted] = useState(false);
  const [isCartHighlightedRed, setIsCartHighlightedRed] = useState(false);
  const [total, setTotal] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [mensajeToast, setMensajeToast] = useState('');
  const [varianteToast, setVarianteToast] = useState('');


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

    generarToast('Sesión cerrada exitosamente', 'danger');
  }

  useEffect(() => {
    const authData = {
      idToken: localStorage.getItem('idToken')
    }
    if (localStorage.getItem('login') === 'true') {
      axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDw-qrJJtrzAnjQY1eB6tUbruo3TanpKRc', authData)
        .then((response) => {
          console.log('Recuperando información...');
          setLogin(true);
          loginHandler(localStorage.getItem('idToken'), response.data.users[0].localId);
        })
        .catch((error) => {
          console.log(error);
          console.log('Sesión expirada');
          provocarLogout();
        })
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

  const generarToast = (mensaje, variante) => {
    setShowToast(true);
    setMensajeToast(mensaje);
    setVarianteToast(variante);
  }

  return (
    <>
      <ToastContext.Provider value={{ generarToast: generarToast }}>
        <GlobalContext.Provider value={{ login: login, loginHandler: loginHandler, idToken: idToken, uid: uid, provocarLogout: provocarLogout }}>
          <CarritoContext.Provider value={{ listaProductos: listaProductos, setListaProductos: setListaProductos, menosHandler: menosHandler, masHandler: masHandler, vaciarCarrito: vaciarCarrito, total: total, totalHandler: totalHandler }}>
            <Header isCartHighlighted={isCartHighlighted} isCartHighlightedRed={isCartHighlightedRed} />
            <div style={{ height: 100 }}></div>
            <Routes>
              <Route path='/' element={<Products />} />
              <Route path='/formulario' element={<Formulario />} />
              <Route path='/confirmation' element={<Confirmation />} />
              <Route path='/agradecimiento' element={<Agradecimiento />} />
              <Route path='/pedidos' element={<Pedidos />} />
              <Route path='*' element={<h1>404 - Not found</h1>} />
            </Routes>
            <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 1 }}>
              <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg={varianteToast}>
                <Toast.Header>
                  <img
                    src="/imgs/icons/logo.png"
                    className="rounded me-2"
                    alt=""
                    style={{ width: 20, height: 20 }}
                  />
                  <strong className="me-auto">Aviso</strong>
                </Toast.Header>
                <Toast.Body className={['primary', 'secondary', 'success', 'danger', 'dark'].find(variant => variant === varianteToast) && 'text-white'}>
                  {mensajeToast}
                </Toast.Body>
              </Toast>
            </ToastContainer>
            <Footer />
          </CarritoContext.Provider>
        </GlobalContext.Provider>
      </ToastContext.Provider>
    </>
  )
}

export default App
