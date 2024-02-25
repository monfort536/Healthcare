import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
//import ProtectedRoute from "./components/ProtectedRoute";
//import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";
import Profile from "./pages/doctor/Profile";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (          
          <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/apply-doctor" element={<ApplyDoctor />}/>         
            <Route path="/admin/users"  element={<Users />}/>            
            <Route path="/admin/doctors" element={<Doctors />}/>         
            <Route path="/doctor/profile/:id" element={<Profile />}/>
            <Route path="/doctor/book-appointment/:doctorId" element={<BookingPage /> }/>       
            <Route path="/notification" element={<NotificationPage />}/>
            <Route path="/login" element={ <Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/appointments" element={<Appointments />}/>
            <Route path="/doctor-appointments" element={<DoctorAppointments />}/>
            <Route path="/home" element={<HomePage />}/>                
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;