import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DashBoard from "./Pages/DashBoard";
import StockData from "./components/StockData";
import Questionnaire from "./Questionnaire";
import LoginPage from "./pages/LoginPage";

import Navbar from "./components/Navbar";
import PortfolioSection from "./pages/PorfolioSection";
import ResearchSection from "./pages/ResearchSection";




function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/stocks/:symbol" element={<StockData />} /> 
            <Route path="/research" element={<ResearchSection />} /> 


          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
