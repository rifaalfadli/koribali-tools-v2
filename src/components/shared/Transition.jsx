import { useEffect, useState } from "react";
import "../../assets/styles/Transition.css";

const PageTransition = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Jalankan animasi buka tirai
    const timer = setTimeout(() => setActive(true), 100);
    return () => clearTimeout(timer); // bersihkan timer saat unmount
  }, []);

  return (
    <div className={`page-Transition ${active ? "active" : ""}`}>
      <div className="transition-Top"></div>
      <div className="transition-Bottom"></div>
    </div>
  );
};

export default PageTransition;
