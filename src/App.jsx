import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Pacientes from "./pages/Pacientes";
import Doctores from "./pages/Doctores";
import Citas from "./pages/Citas";
import Recetas from "./pages/Recetas";
import Medicamentos from "./pages/Medicamentos";
import Especialidades from "./pages/Especialidades"
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
       <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/pacientes" element={<ProtectedRoute><Pacientes /></ProtectedRoute>} />
          <Route path="/doctores" element={<ProtectedRoute><Doctores /></ProtectedRoute>} />
          <Route path="/citas" element={<ProtectedRoute><Citas /></ProtectedRoute>} />
          <Route path="/recetas" element={<ProtectedRoute><Recetas /></ProtectedRoute>} />
          <Route path="/medicamentos" element={<ProtectedRoute><Medicamentos /></ProtectedRoute>} />
          <Route path="/especialidades" element={<ProtectedRoute><Especialidades /></ProtectedRoute>} />
        </Routes>
    </BrowserRouter>
  );
}
