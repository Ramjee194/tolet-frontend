import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Admindashboard from './admin/Admindashboard'

function Adminlayout() {
  return (
   <>
   <Routes>
    <Route path='/admin-dashboard' element={<Admindashboard/>}/>
   </Routes>
   </>
  )
}

export default Adminlayout