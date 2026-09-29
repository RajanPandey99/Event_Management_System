import { Route, Routes, Navigate } from "react-router";
import "./App.css";
import {
  Register,
  Login,
  Home,
  AddEvent,
  Profile,
  UpcommingEvents,
  Calander
} from "./Pages/Index";
import { ToastContainer } from "react-toastify";
import type { UserNamespace } from "./Types/User";
import { getUser } from "./Services/getUser";

function App() {
  const user: UserNamespace.User = getUser();
  return (
    <>
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
        <Route path="/calander" element={<Calander/>}/>
      </Routes>
    </>
  );
}

export default App;
