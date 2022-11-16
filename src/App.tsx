import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/ErrorFallback/ErrorFallback";
import { Footer } from "./components/Footer/Footer";
import { Navbar } from "./components/Navbar/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { MoviePage } from "./pages/MoviePage/MoviePage";
import { MoviesSection } from "./pages/MoviesSection/MoviesSection";
/* import { SearchSection } from "./pages/SearchSection/SearchSection"; */ // TEST Static Search
import { FavoritesPage } from "./pages/FavoritesPage/FavoritesPage";
import { HistoryPage } from "./pages/HistoryPage/HistoryPage";
import { Home } from "./pages/Home/Home";
import { SignIn } from "./pages/SignIn/SignIn";
import { SignUp } from "./pages/SignUp/SignUp";
import "./App.css";


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/movies" element={<MoviesSection />} />
          <Route
            path="/movies/:name"
            element={
              <ErrorBoundary fallback={<ErrorFallback />}>
                <MoviePage />
              </ErrorBoundary>
            }
          />
            {/* <Route path="/new" element={<SearchSection />} />  */}{/*//TEST Static Search*/}
          <Route element={<ProtectedRoute />}>
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
