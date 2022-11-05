import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";

import { Footer } from "./components/Footer/Footer";
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./pages/Home/Home";
import { SignUp } from "./pages/SignUp/Signup";

function App() {
  return (
    <div className="App">
      
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
        <Footer />
      </Router>
      
    </div>
  );
}

export default App;
