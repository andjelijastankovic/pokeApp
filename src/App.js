import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Navbar } from './components/Navbar/Navbar';
import { Main } from './components/Main/Main';
import { Pokemon } from './components/Main/Pokemon';
import {Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<Main />} exact/>
            <Route path=":name" element={<Pokemon />} exact/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
