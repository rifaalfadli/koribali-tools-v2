import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import "../assets/styles/ProfileMenu.css";

export default function ProfileMenu() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const username = userData.fullname;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile-section")) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      className="profile-section"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <img
        src="/images/avatar.svg"
        alt="User"
        className="profile-avatar"
        onClick={() => setShowProfileMenu(!showProfileMenu)}
      />

      {showTooltip && !showProfileMenu && (
        <span className="profile-tooltip">My Account</span>
      )}

      {showProfileMenu && (
        <div className="profile-popup">
          <img
            src="/images/avatar.svg"
            alt="Profile"
            className="profile-popup-img"
          />
          <p className="profile-username">{username}</p>
          <div className="profile-popup-actions">
            <Link to="/profile" className="profile-link">
              Profile
            </Link>
            <Logout />
          </div>
        </div>
      )}
    </div>
  );
}
