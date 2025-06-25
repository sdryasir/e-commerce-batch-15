import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router";
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import Categories from './pages/Categories';
import AddCategory from './pages/AddCategory';

function App() {

  return (
   <BrowserRouter>
   <Navbar/>
   <Sidebar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/admin/products' element={<Products/>} />
      <Route path='/admin/products/add' element={<AddProduct/>} />
      <Route path='/admin/categories' element={<Categories/>} />
      <Route path='/admin/categories/add' element={<AddCategory/>} />
    </Routes>
   </BrowserRouter>
  )
}

export default App
