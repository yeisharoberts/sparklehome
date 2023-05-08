import './App.css';
import Navigation from './Navigation';
import Home from './Home';
// React
import { Routes, Route } from 'react-router-dom';
import Book_Cleaning from './Book_Cleaning';
import Admin_Layout from './admin_pages/Admin_Layout';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Book_Cleaning" element={<Book_Cleaning />} />
        <Route path="/admin/*" element={<Admin_Layout />} />
      </Routes>
    </div>
  );
}

export default App;
