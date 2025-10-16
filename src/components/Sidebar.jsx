import { Link } from "react-router-dom";
import "../assets/styles/Style.css";
import "../assets/styles/Responsive.css";

export default function Sidebar() {
  return (
    <aside>
      <h4>Perkenalan Proyek</h4>
      <ul>
        <li>
          <Link to="/proyek/proyek-2d">Proyek 2D</Link>
        </li>
        <li>
          <Link to="/proyek/proyek-3d">Proyek 3D</Link>
        </li>
        <li>
          <Link to="/proyek/proyek-vba">Proyek VBA</Link>
        </li>
        <li>
          <Link to="/proyek/proyek-rendering">Proyek Rendering</Link>
        </li>
      </ul>
    </aside>
  );
}
