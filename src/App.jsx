import "./App.css";
import AddProperty from "./components/AddProperty";
import Admindashboard from "./components/admin/Admindashboard";
import CommunityHub from "./components/Community";
import OwnerDashboard from "./components/OwnerDashboard";
import PropertyFullDetail from "./components/PropertyDetails";
import SearchProperty from "./components/SearchProperty";
import ContactUs from "./home/ContactUs";

import Home from "./home/Home";

import Navbar from "./navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import ForgotPaasword from "./page/ForgotPaasword";

function App() {
  return (
    <>
      <Navbar/>


      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgot-password" element={<ForgotPaasword/>}/>
      </Routes>


      <Routes>
        <Route path="/admin-dashboard" element={<Admindashboard/>}/>
      </Routes>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property-search" element={<SearchProperty />} />
          <Route path="/property-details" element={<PropertyFullDetail />} />
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
          <Route path="/community" element={<CommunityHub />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/add-property" element={<AddProperty/>}/>
        </Routes>
     
    </>
  );
}

export default App;
