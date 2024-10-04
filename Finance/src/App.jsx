import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Questionnaire from "./Questionnaire"; // Ensure this is the correct import path
import DashBoard from "./Pages/DashBoard";
import StockData from "./components/StockData";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignPage";
import StockCard from "./components/StockCard";
import Watchlist from "./components/Watchlist";
import Navbar from "./components/Navbar";
import PortfolioSection from "./pages/PorfolioSection";
import ResearchSection from "./Pages/ResearchSection";
import ReportingAndTransactionSection from "./Pages/ReportingAndTransactionSection";

// Custom Layout component to hide the Sidebar on specific routes
function Layout({ children }) {
  const location = useLocation();

  // Define routes where the Sidebar should not be displayed
  const hideSidebarRoutes = [ "/login","/Questionnaire", "/signup"];

  // Check if the current route is in the hideSidebarRoutes list
  const hideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="flex">
      {/* Conditionally render the Sidebar */}
      {!hideSidebar && <Sidebar /> &&  <Navbar/>}
      
      {/* Main content */}
      <div className="flex-1">{children}</div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Define routes here */}
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          <Route path="/projects" element={<h1>Projects</h1>} />
          <Route path="/calendar" element={<h1>Calendar</h1>} />
          <Route path="/tasks" element={<h1>Tasks</h1>} />
          <Route path="/reporting" element={<h1>Reporting</h1>} />
          <Route path="/settings" element={<h1>Settings</h1>} />
          <Route path="/help" element={<h1>Help</h1>} />
          
          {/* Routes without Sidebar */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Questionnaire" element={<Questionnaire />} />
          <Route path="/signup" element={<SignUpPage />} />
          
          {/* Other components */}
          <Route path="/stockcard" element={<StockCard />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/stocks/:symbol" element={<StockData />} /> 
          <Route path="/research" element={<ResearchSection />} /> 
          <Route path="/ReportingAndTransaction" element={<ReportingAndTransactionSection />} />
          <Route path="/Portfolio" element={<PortfolioSection />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
