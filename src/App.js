import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ProtectedRoute } from "./Context/ProtectedRoute";
import { UserAuthContextProvider } from "./Context/UserAuthContext";
import Login from "./Pages/Login/Login";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { Message } from "./Pages/Message/Message";
import { AccessedProperty } from "./Pages/AccessedProperty/AccessedProperty";
import { DashboardRedesign } from "./Pages/Dashboard/DashboardRedesign";
import { AccountMenu } from "./Pages/Dashboard/AccountMenu";
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
           <Route path="/messages" element={<Message/>} />
           <Route path="/accessUsers" element={<AccessedProperty />} />
           <Route path="/accountMenu" element={<AccountMenu />} />
      </Routes>
    </UserAuthContextProvider>
  );
}

export default App;
