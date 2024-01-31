import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/MainPage" element={<MainPage />} />
            <Route path="/Navbar" element={<Navbar />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
