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

  const menosHandler = (e) => {
    console.log('Quitar ' + e.target.value);

    for (let i = 0; i < listaProductos.length; i++) {
        if (listaProductos[i][0] === e.target.value) {
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
    console.log(listaProductos);
}


  return (
    <>
    

      <GlobalContext.Provider value={{ login: login, setLogin: setLogin, username: username, setUsername: setUsername }}>
        <CarritoContext.Provider value={{ listaProductos: listaProductos, setListaProductos: setListaProductos, menosHandler: menosHandler, masHandler: masHandler }}>
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
