import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
