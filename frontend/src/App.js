import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Problemas from "./pages/Problemas";
import NovoProblema from "./pages/NovoProblema";
import DetalhesProblema from "./pages/DetalhesProblema";

function PrivateRoute({ children }) {
  const { user } = React.useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/problemas"
            element={
              <PrivateRoute>
                <Problemas />
              </PrivateRoute>
            }
          />
          <Route
            path="/problemas/novo"
            element={
              <PrivateRoute>
                <NovoProblema />
              </PrivateRoute>
            }
          />
          <Route
            path="/problemas/:id"
            element={
              <PrivateRoute>
                <DetalhesProblema />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
