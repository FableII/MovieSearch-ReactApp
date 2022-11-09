import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";

import { Footer } from "./components/Footer/Footer";
import { Navbar } from "./components/Navbar/Navbar";
import { Search } from "./pages/Search/Search";
import { Home } from "./pages/Home/Home";
import { SignIn } from "./pages/SignIn/SignIn";
import { SignUp } from "./pages/SignUp/SignUp";

function App() {
  return (
    <div className="App">
      
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/signin' element={<SignIn/>} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/search' element={<Search />} />
        </Routes>
        <Footer />
      </Router>
      
    </div>
  );
}

export default App;
