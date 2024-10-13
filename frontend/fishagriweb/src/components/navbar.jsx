import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/home";
  const isDiscoverPage = location.pathname === "/discover";
  const isControlPage = location.pathname === "/control";
  const isHistoryPage = location.pathname === "/history";
  const isAdminPage = location.pathname === "/admin";

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // Retrieve user data from sessionStorage
  useEffect(() => {
    const name = sessionStorage.getItem("userName");
    const adminStatus = sessionStorage.getItem("isAdmin") === "true";

    setUserName(name);
    setIsAdmin(adminStatus);
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };

  const handleClickOutside = (e) => {
    const dropdown = document.querySelector(".dropdown-menu");
    if (dropdown && !dropdown.contains(e.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logout function
  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear();

    // Navigate to the login page
    navigate("/login");
  };

  return (
    <>
      <div
        className="pronav"
        style={{
          display: "flex",
          justifyContent: "center",
          zIndex: 30,
          backgroundColor: "white",
        }}
      >
        <img
          src={require("../images/logo.jpg")}
          alt="icon"
          style={{
            width: "80px",
            height: "40px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        />
        <div style={{ display: "flex", marginLeft: "1000px" }}>
          <div style={{ marginTop: "22px", position: "relative" }}>
            <Link to="/home" className="navbtn">
              HOME
            </Link>
            {isHomePage ? (
              <div className="pageline"></div>
            ) : (
              <div className="navline"></div>
            )}
          </div>
          <div style={{ display: "flex", marginTop: "20px" }}>
            <div style={{ position: "relative" }}>
              <Link to="/discover" className="navbtn">
                DISCOVER
              </Link>
              {isDiscoverPage ? (
                <div className="pageline"></div>
              ) : (
                <div className="navline"></div>
              )}
            </div>
            <div style={{ position: "relative" }}>
              <Link to="/control" className="navbtn">
                CONTROL
              </Link>
              {isControlPage ? (
                <div className="pageline"></div>
              ) : (
                <div className="navline"></div>
              )}
            </div>
            <div style={{ position: "relative" }}>
              <Link to="/history" className="navbtn">
                HISTORY
              </Link>
              {isHistoryPage ? (
                <div className="pageline"></div>
              ) : (
                <div className="navline"></div>
              )}
            </div>
            {isAdmin && (
              <div style={{ position: "relative" }}>
                <Link to="/admin" className="navbtn">
                  ADMIN
                </Link>
                {isAdminPage ? (
                  <div className="pageline"></div>
                ) : (
                  <div className="navline"></div>
                )}
              </div>
            )}
          </div>
        </div>
        <div
          className="dropdown"
          style={{ position: "relative", marginTop: "8px" }}
        >
          <button className="avatar" onClick={toggleDropdown}>
            <div
              className="avatar"
              style={{
                backgroundColor: "white",
                width: "43px",
                height: "43px",
                position: "absolute",
                top: "3px",
                left: "3px",
              }}
            >
              <img
                src={require("../images/dory-blue-tang-fish-1962774-1662170.png")}
                alt=""
                className="avafish"
              />
            </div>
          </button>
          {isDropdownVisible && (
            <div
              className="dropdown-menu"
              style={{
                position: "absolute",
                right: "20px",
                marginTop: "8px",
                backgroundColor: "white",
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                borderRadius: "4px",
                zIndex: 100,
              }}
            >
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                <li>
                  <span style={{ padding: "10px 15px", display: "block" }}>
                    Hello, {userName}!
                  </span>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item"
                    style={{
                      color: "#46a2f5",
                      padding: "10px 15px",
                      display: "block",
                      textDecoration: "none",
                      fontWeight: "bold",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
