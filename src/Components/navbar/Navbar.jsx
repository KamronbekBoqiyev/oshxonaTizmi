import React, { useState } from "react";
import { FaNewspaper } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./navbar.css";
import { MdPeopleAlt } from "react-icons/md";

function Navbar() {

  
  return (
    <div className="right">
      
        <Link to={"/people"}>
          <MdPeopleAlt  className="file" />
        </Link>
   
    </div>
  );
}

export default Navbar;
