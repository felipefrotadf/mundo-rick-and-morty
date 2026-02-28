import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Characters from "../pages/Characters";
import CharacterDetail from "../pages/CharacterDetail";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/characters"
          element={
            <PrivateRoute>
              <Characters />
            </PrivateRoute>
          }
        />
        <Route
          path="/characters/:id"
          element={
            <PrivateRoute>
              <CharacterDetail />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
