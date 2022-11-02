import { Routes, Route } from "react-router-dom";
import "./App.css";
import { UserAuthContextProvider } from "./Context/UserAuthContext";
import Login from "./Pages/Login/Login";
function App() {
  return (
    <UserAuthContextProvider>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </UserAuthContextProvider>
  );
}

export default App;
