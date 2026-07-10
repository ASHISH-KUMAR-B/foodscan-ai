import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { ROUTES } from "./constants/routes.js";

import Home from "./pages/Home.jsx";
import Login from "./features/auth/Login.jsx";
import Register from "./features/auth/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Scan from "./features/scanner/pages/Scan.jsx";
import History from "./features/history/pages/History.jsx";
import Profile from "./features/profile/pages/Profile.jsx";
import Settings from "./features/settings/pages/Settings.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path="/registar" element={<Register />} />
          <Route
            path={ROUTES.DASHBOARD}
            element={(
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            )}
          />
          <Route
            path={ROUTES.SCAN}
            element={(
              <ProtectedRoute>
                <Scan />
              </ProtectedRoute>
            )}
          />
          <Route
            path={ROUTES.HISTORY}
            element={(
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            )}
          />
          <Route
            path={ROUTES.PROFILE}
            element={(
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            )}
          />
          <Route
            path={ROUTES.SETTINGS}
            element={(
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            )}
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}