import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Navbar } from './components/Navbar/Navbar';
import { Main } from './components/Main/Main';
import { Pokemon } from './components/Main/Pokemon';
import {Route, Routes } from "react-router-dom";

function App() {
  return (
      <>
        <Navbar />
          <Routes>
            <Route path="/" element={<Main />} exact/>
            <Route path=":name" element={<Pokemon />} exact/>
          </Routes>
      </>
  );
}

export default App;
