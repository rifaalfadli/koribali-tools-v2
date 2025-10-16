import { useEffect, useState } from "react";
import "../../assets/styles/Transition.css";

const PageTransition = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Jalankan animasi buka tirai
    setTimeout(() => setActive(true), 100);
  }, []);

  return (
    <div className={`page-transition ${active ? "active" : ""}`}>
      <div className="transition-top"></div>
      <div className="transition-bottom"></div>
    </div>
  );
};

export default PageTransition;
