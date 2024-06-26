// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css'
import Dashboard from './components/Dashboard/Dashboard'
import Footer from './components/Footer/Footer'
import SpacePage from './components/SpacePage/SpacePage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/board/:id' element={<SpacePage/>} />
      </Routes>
  <Footer/>
    </Router>
  )
}

export default App
