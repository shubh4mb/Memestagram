import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/User/Home';
import Signin from './pages/User/Signin';
import Signup from './pages/User/Signup';
// import Header from "./components/Header";
import AdminLayout from "./components/AdminLayout"; // Import AdminLayout
import Profile from "./pages/User/Profile";
import AddMeme from "./pages/User/AddMeme";
import MemeHome from './pages/User/MemeHome';
import ProtectedRoute from "./components/Protectedroute";
import AdminProtected from "./components/AdminProtected";
import AdminLogin from "./pages/Admin/Adminsignup";
import Adminhome from "./pages/Admin/Adminhome";
import UserLayout from "./components/UserLayout";
import AdminCreateuser from './pages/Admin/AdminCreateUser'
import MemesPosted from "./components/MemesPosted";
 import AdminViewMeme from './components/AdminViewMeme'
import UsersMemes from "./components/UsersMemes";

const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        {/* User routes */}
        <Route path="/" element={<UserLayout/>}>
          <Route index element={<Home />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="addmeme" element={<ProtectedRoute><AddMeme /></ProtectedRoute>} />
          <Route path="memesposted" element={<ProtectedRoute><MemesPosted /></ProtectedRoute>} />
          <Route path="memehome" element={<ProtectedRoute><MemeHome /></ProtectedRoute>} />
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="usersmemes/:id" element={<ProtectedRoute><UsersMemes /></ProtectedRoute>} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="login" element={<AdminLogin />} /> 
          <Route path="home" element={<AdminProtected><Adminhome /></AdminProtected>} /> 
          <Route path="createuser" element={<AdminProtected><AdminCreateuser /></AdminProtected>} />
          <Route path="viewmemeadmin" element={<AdminProtected><AdminViewMeme /></AdminProtected>} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
