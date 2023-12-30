import { Link, Outlet, Route, Routes } from "react-router-dom";
import UserProfile from "../userPage/UserProfile";


export default function AdminPage() {
  return (
    <div className="flex">
      <aside className="w-1/4 p-4 bg-gray-200">
        <nav>
          <Link to="/admin/profile" className="block py-2 px-4 text-gray-700 hover:bg-gray-300">
            Profile
          </Link>
          <Link to="/admin/products" className="block py-2 px-4 text-gray-700 hover:bg-gray-300">
            Products
          </Link>
        </nav>
      </aside>

      <main className="w-3/4 p-4 bg-gray-100">
        {/* Use Outlet to render nested routes */}
        <UserProfile/>
      
      </main>
    </div>
  );
}
