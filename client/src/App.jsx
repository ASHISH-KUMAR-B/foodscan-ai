import {
BrowserRouter,
Routes,
Route
}
from "react-router-dom";

import MainLayout from "./layouts/MainLayout.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Scan from "./pages/Scan.jsx";
import History from "./pages/History.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";



export default function App(){


return (

<BrowserRouter>

<Routes>


<Route path="/" element={<Home/>}/>


<Route path="/login" element={<Login/>}/>


<Route path="/register" element={<Register/>}/>


<Route

path="/dashboard"

element={

<ProtectedRoute>

<Dashboard/>

</ProtectedRoute>

}

/>

<Route
path="/scan"
element={
<ProtectedRoute>
<Scan/>
</ProtectedRoute>
}
/>


<Route
path="/history"
element={
<ProtectedRoute>
<History/>
</ProtectedRoute>
}
/>


<Route
path="/profile"
element={
<ProtectedRoute>
<Profile/>
</ProtectedRoute>
}
/>


<Route
path="/settings"
element={
<ProtectedRoute>
<Settings/>
</ProtectedRoute>
}
/>

</Routes>

</BrowserRouter>

);


}