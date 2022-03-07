import React, { useContext } from "react";
import "./Header.css";
import LogImage from "../../asset/images/log.png";
import { NavLink } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { UserContext } from "../context/UseContext";

function Header(props) {
  const { isLogin } = useContext(UserContext);
  let U_name = "";
  let profile = "";
  if (localStorage.getItem("userinfo")) {
    const { name, profile_image } = JSON.parse(
      localStorage.getItem("userinfo")
    );
    U_name = name;
    profile = profile_image;
  }

  return (
    <>
      <Navbar className="row-div" fixed="top">
        <div className="first-col">
          <img src={LogImage} alt="" className="first-col-img-logo" />
          <h2>J Buddy</h2>
        </div>
        <div className="third-col">
          {isLogin && <NavLink to="/">Home</NavLink>}
          {isLogin && <NavLink to="/profile">Profile</NavLink>}
          {!isLogin && <NavLink to="/signup">Sign Up</NavLink>}
          {isLogin && <NavLink to="/signout">Sign Out</NavLink>}
          {!isLogin && <NavLink to="/signin">Sign In</NavLink>}

          {/* show user name and pic */}
          {isLogin && (
            <img
              src={`http://127.0.0.1:8000/storage/uploadImages/${profile}`}
              alt=""
              className="img-icon"
            />
          )}
          <NavLink to="/profile" style={{ color: "white", marginLeft: "10px" }}>
            {U_name}
          </NavLink>
        </div>
      </Navbar>
    </>
  );
}

export default Header;
