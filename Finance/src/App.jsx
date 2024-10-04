import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Questionnaire from "./Questionnaire";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<h1>Home Page</h1>} />
            <Route path="/dashboard" element={<h1>Dashboard</h1>} />
            <Route path="/projects" element={<h1>Projects</h1>} />
            <Route path="/calendar" element={<h1>Calendar</h1>} />
            <Route path="/tasks" element={<h1>Tasks</h1>} />
            <Route path="/reporting" element={<h1>Reporting</h1>} />
            <Route path="/settings" element={<h1>Settings</h1>} />
            <Route path="/help" element={<h1>Help</h1>} />
            <Route path="/Questionnaire" element={<Questionnaire />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;