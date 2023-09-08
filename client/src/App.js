import RegisterPage from "./pages/register/registerPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/loginPage";
import IntegrationsPage from "./pages/home/Intergrations_screen/IntegrationsPage";
import FBLoginPage from "./pages/home/Intergrations_screen/FBLoginPage";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/protectedRoute";
import ChatScreen from "./pages/home/chatscreen/chatscreen";

function App() {
  return (
    <div className="App">
      <Toaster position="bottom-left" reverseOrder={false} />

      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/chatScreen" element={<ChatScreen />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/fblogin" element={<FBLoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
