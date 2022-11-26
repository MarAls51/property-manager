import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ProtectedRoute } from "./Context/ProtectedRoute";
import { UserAuthContextProvider } from "./Context/UserAuthContext";
import Login from "./Pages/Login/Login";
import { DashboardRedesign } from "./Pages/Dashboard/DashboardRedesign";

function App() {
  return (
    <UserAuthContextProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardRedesign />
              </ProtectedRoute>
            }
          />
          
      </Routes>
    </UserAuthContextProvider>
  );
}

export default App;
