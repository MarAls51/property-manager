import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ProtectedRoute } from "./Context/ProtectedRoute";
import { UserAuthContextProvider } from "./Context/UserAuthContext";
import Login from "./Pages/Login/Login";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
function App() {
  return (
    <UserAuthContextProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
      </Routes>
    </UserAuthContextProvider>
  );
}

export default App;
