import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ containerStyles }) => {
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Collection", path: "/collection" },
    { title: "Testimonials", path: "/testimonials" },
    { title: "Contact", path: "mailto:designdevproenmanuel@gmail.com" }

  ];
  return (
    <nav className={`${containerStyles}`}>
      {navLinks.map((link) => (
        <NavLink
          key={link.title}
          to={link.path}
          className={({ isActive }) =>
            `${isActive ? "active-link" : ""} px-3 py-2 rounded-full`
          }
        >
          {link.title}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
