

import './App.css'
import Home from './home/Home'

import Navbar from './navbar/Navbar'
import {Routes,Route} from 'react-router-dom'

function App() {

  return (
    <>
    <main>
   
  
<Routes>
  <Route path="/" element={<Home />} />
</Routes>
</main>
      
    </>
  )
}

export default App
