import "./App.css";
import AddProperty from "./components/AddProperty";
import CommunityHub from "./components/Community";
import OwnerDashboard from "./components/OwnerDashboard";
// import PropertyFullDetail from "./components/PropertyDetails";
import ContactUs from "./home/ContactUs";
import Home from "./home/Home";
import Navbar from "./navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import Adminlayout from "./Adminlayout";
import PropertyDetail from "./page/PropertyDetails";
import PropertySearch from "./page/PropertySearch";

// Admin Pages
import AdminDashboard from "./AdminDashboard";
import Properties from "./page/admin/Properties";
import Tenants from "./page/admin/Tenants";
import Earning from "./page/admin/Earning";
import Maintenance from "./page/admin/Maintenance";
import Finance from "./page/admin/Finance";
import Firstownerform from "./page/owner/FirstOwnerForm";
import Secondownerform from "./page/owner/Secondownerform";
import Thirdownerform from "./page/owner/Thirdownerform";
import Visitpropertypage from "./page/Visitpropertypage";
import Confirmbooking from "./page/Confirmbooking";
import Addpropertystep2 from "./components/Addpropertystep2";

function App() {
  
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/property" element={<PropertySearch />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        {/* <Route path="/property-details" element={<PropertyFullDetail />} /> */}
        <Route path="/community" element={<CommunityHub />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="add-property/step2" element={<Addpropertystep2/>}/>
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN ROUTES - CORRECTED for /admin/* pattern */}

        <Route path="/admin" element={<Adminlayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="properties" element={<Properties />} />
          <Route path="tenants" element={<Tenants />} />
          <Route path="earning" element={<Earning />} />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="finance" element={<Finance />} />
        </Route>

        {/* owner property verification form */}
        
        <Route>
          <Route path="/firstownerform" element={< Firstownerform/>} />
          <Route path="/secondownerform" element={<Secondownerform />} />
          <Route path="/thirdownerform" element={<Thirdownerform />} />
        </Route>

        {/* Catch all - 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

// Simple NotFound component
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-gray-600 mb-6">Page not found</p>
      <a href="/" className="text-red-600 hover:underline">
        Go back home
      </a>
    </div>
  </div>
);

export default App;
