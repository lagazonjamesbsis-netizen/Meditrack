import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages_backup/Login";
import Signup from "./pages_backup/Signup";
import Dashboard from "./pages_backup/Dashboard";
import ForgotPassword from "./pages_backup/ForgotPassword";
import ResidenceDetails from "./pages_backup/ResidenceDetails";
import Verification from "./pages_backup/Verification";
import Done from "./pages_backup/Done";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password"element={<ForgotPassword />}/>
        <Route path="/residence-details" element={<ResidenceDetails />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/done" element={<Done />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;