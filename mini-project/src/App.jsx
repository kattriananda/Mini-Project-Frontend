import { useState } from 'react'
import './App.css'
import Cart from './components/Cart'
import Sidebar from './layout/Sidebar'
import Header from './layout/Header'
import Home from './page/Home'
import Pembayaran from './page/Pembayaran'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import ListProduct from './page/ListProduct'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/listproduct' element={<ListProduct/>}/>
        <Route path='/checkout' element={<Pembayaran/>}/>
      </Routes>
    </Router>
      {/* <Home/> */}
      {/* <Pembayaran/> */}
    </>
  )
}

export default App
