import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Logout.css";

const Logout = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <>
      <a onClick={() => setShowModal(true)} className="logout-link">
        Logout
      </a>

      {showModal && (
        <div className="logout-overlay">
          <div className="logout-modal">
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to log out of your account?</p>
            <div className="logout-buttons">
              <button
                className="btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="btn-logout" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
