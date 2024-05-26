// import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { TbBrandZhihu } from "react-icons/tb";
import { useAuth } from '../../Context/auth';
// import  './Header.css';

function Header() {
  const [auth, setAuth] = useAuth();

  // logout karne pe yeh function call hoga jo ki {setAuth() function} ko call karega
  // from auth.jsx se aur uski ----> value reset kardega [user:null , token : ""],

  // reset karne k baad --> woh user data aur token dono ko {localStorage se} delete kar denge
  function handleLogout() {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout, Successfully");
    // localStorage se humko "auth" ko delete karna hai
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <TbBrandZhihu style={{ color: "orangered", fontSize: "30px", marginRight: "12px" }} />
          <Link to="/" className="navbar-brand" href="#">Rentify</Link>
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink  to="/" className="nav-link" >Home</NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink to="/category" className="nav-link" >Category</NavLink>
            </li> */}
            {/* !auth.user --> means agar user nhi hai tab ---> Register aur Login show karo */}
            {!auth.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link" >Register</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link" >Login</NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="">
                  <NavLink  to="/profile" className="nav-link" >Profile</NavLink>
                </li>
                <li className="">
                  <NavLink  to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="nav-link" >Dashboard</NavLink>
                </li>
                <li className="">
                  <NavLink to="/logout" className="nav-link"  onClick={handleLogout}>Logout</NavLink>
                </li>
              </>
            )}
            <li className="">
              <NavLink to="/cart" className="nav-link" >cart(0)</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
