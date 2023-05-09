import './App.css';
import Navigation from './Navigation';
import Home from './Home';
import Admin_Layout from './admin_pages/Admin_Layout';
import Book_Cleaning from './Book_Cleaning';
import Admin_Home from './admin_pages/Admin_Home';
import Confirm_Booking from './Confirm_Booking';
import Login from './Login';
import Register from './Register';
// React
import { Routes, Route } from 'react-router-dom';
import { registerLicense } from '@syncfusion/ej2-base';


function App() {
  registerLicense('ORg4AjUWIQA/Gnt2VFhiQlJPcEBFQmFJfFBmRGFTflZ6dldWACFaRnZdQV1mSXZSdEdjXHpZc3dX')
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Book_Cleaning" element={<Book_Cleaning />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/admin/*" element={<Admin_Layout />} />
        <Route path="/Confirm_Booking" element={<Confirm_Booking />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
