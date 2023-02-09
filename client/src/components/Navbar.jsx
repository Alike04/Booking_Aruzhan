import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, []);
  return (
    <nav className="h-[15vh] w-[100%] flex items-center bg-primary">
      <div className="flex justify-between mx-auto w-[80%] text-lg text-white">
        <div className="">
          <NavLink to="/">LOGO</NavLink>
        </div>
        <div className="space-x-16">
          <NavLink
            className="bg-dark p-3 rounded-md text-black hover:text-white duration-300 "
            to="about"
          >
            About
          </NavLink>
          <NavLink
            className="bg-dark p-3 rounded-md text-black hover:text-white duration-300 "
            to="courses"
          >
            Courses
          </NavLink>
          <NavLink
            className="bg-dark p-3 rounded-md text-black hover:text-white duration-300"
            to="booking"
          >
            Booking
          </NavLink>
        </div>
        {!user ? (
          <div className="space-x-16">
            <NavLink
              className="bg-dark p-3 rounded-md text-black hover:text-white duration-300"
              to="login"
            >
              Login
            </NavLink>
            <NavLink
              className="bg-dark p-3 rounded-md text-black hover:text-white duration-300"
              to="register"
            >
              Register
            </NavLink>
          </div>
        ) : (
          <div>
            <div
              className="bg-dark p-3 rounded-md text-black hover:text-white duration-300"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
            >
              Log out
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
