import './App.css';
import Navigation from './Navigation';
import Home from './Home';
// React
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
