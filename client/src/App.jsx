import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Booking from "./pages/Booking";
import Courses from "./pages/Courses";
import Login from "./pages/login";
import Main from "./pages/Main";
import Register from "./pages/Register";

function App() {
  const [user, setUser] = useState({});

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
    } else {
      axios
        .post(`${import.meta.env.VITE_API_URL}auth`, { token: token })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          console.log(res.data);
        })
        .catch((e) => {
          console.error(e);
          // localStorage.removeItem("token");
        });
    }
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
