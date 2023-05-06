import './App.css';
import Navigation from './Navigation';
import Home from './Home';
// React
import { Routes, Route } from 'react-router-dom';
import Book_Cleaning from './Book_Cleaning';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Book_Cleaning" element={<Book_Cleaning />} />
      </Routes>
    </div>
  );
}

export default App;
