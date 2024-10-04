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
import UserProfile from "./components/UserProfile";

// Custom Layout component to hide the Sidebar on specific routes
// function Layout({ children }) {
//   const location = useLocation();

//   // Define routes where the Sidebar should not be displayed
//   const hideSidebarRoutes = ["/login", "/questionnaire", "/signup"];

//   // Check if the current route is in the hideSidebarRoutes list
//   const hideSidebar = hideSidebarRoutes.includes(location.pathname);

//   return (
//     <div className="flex">
//       {/* Conditionally render the Sidebar and Navbar */}
//       {!hideSidebar && (
//         <>
//           {/* <Navbar /> */}
//           {/* <Sidebar /> */}
//         </>
//       )}

//       {/* Main content */}
//       <div className="flex-1">{children}</div>
//     </div>
//   );
// }

function App() {
  return (
    <Router>
      <Navbar/>
    <div className="flex">
      <Sidebar/>
      <div className="flex-1">

      
      {/* <Layout> */}
        <Routes>
          {/* Define routes here */}
          <Route path="/" element={<h1>Home Page</h1>} />
          {/* Routes without Sidebar */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Other components */}
          <Route path="/stockcard" element={<StockCard />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/stocks/:symbol" element={<StockData />} />
          <Route path="/research" element={<ResearchSection />} />
          <Route path="/reporting-and-transaction" element={<ReportingAndTransactionSection />} />
          <Route path="/portfolio" element={<PortfolioSection />} />
          <Route path="/mutualRecommend" element={<UserProfile userId={"66ffebb1d403629e535db3ca"} />} />

        </Routes>
      {/* </Layout> */}
      </div>
    </div>
      
    </Router>
  );
}

export default App;
