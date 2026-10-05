import { Route, Routes, Navigate, useLocation } from "react-router";
import "./App.css";
import {
  Register,
  Login,
  Home,
  AddEvent,
  Profile,
  UpcommingEvents,
  Calander,
  ShowEvents,
} from "./Pages/Index";
import { ToastContainer } from "react-toastify";
import type { UserNamespace } from "./Types/User";
import { getUser } from "./Services/getUser";
import { Navbar } from "./Components/Navbar";

function App() {
  const location = useLocation();
  const user: UserNamespace.User = getUser();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/";
  return (
    <>
      {!hideNavbar && <Navbar />}
      <ToastContainer />
      <Routes>
        {user.id != -1 ? (
          <>
            <Route path="/addevent" element={<AddEvent />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <Route path="/addevent" element={<Navigate to="/login" replace />} />
        )}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />

        <Route path="/upcommingevents" element={<UpcommingEvents />} />
        <Route path="/events/:date?/:end?" element={<ShowEvents />} />
        <Route path="/calander" element={<Calander />} />
      </Routes>
    </>
  );
}

export default App;
