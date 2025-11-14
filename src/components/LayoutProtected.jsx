import { Outlet } from "react-router-dom";

const LayoutProtected = () => {
  return (
    <div>
      {/* Semua halaman private (yang di dalam ProtectedRoute) akan muncul di sini */}
      <Outlet />
    </div>
  );
};

export default LayoutProtected;
