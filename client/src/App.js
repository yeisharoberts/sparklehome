import './App.css';
import Navigation from './Navigation';
import Home from './Home';
// React
import { Routes, Route } from 'react-router-dom';
import Book_Cleaning from './Book_Cleaning';
import Admin_Home from './Admin_Home';
import { registerLicense } from '@syncfusion/ej2-base';

function App() {
  registerLicense('ORg4AjUWIQA/Gnt2VFhiQlJPcEBFQmFJfFBmRGFTflZ6dldWACFaRnZdQV1mSXZSdEdjXHpZc3dX')
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Book_Cleaning" element={<Book_Cleaning />} />
        <Route path="/Login" element={<Admin_Home />} />
      </Routes>
    </div>
  );
}

export default App;
