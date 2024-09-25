import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Checklist from "./pages/Checklist";
import ChecklistItem from "./pages/ChecklistItem";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={Dashboard} />}/>
        <Route path="/checklist" element={<ProtectedRoute element={Checklist} />} />
        <Route path="/checklist/:id" element={<ProtectedRoute element={ChecklistItem} />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
