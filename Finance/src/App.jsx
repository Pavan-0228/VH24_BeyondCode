import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DashBoard from "./Pages/DashBoard";
import StockData from "./components/StockData";

function App() {
  return (
    <RouterRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/stocks/:symbol" element={<StockData />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
    </Router>
  );
}

export default App;
