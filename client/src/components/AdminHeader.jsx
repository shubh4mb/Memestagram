import { Link } from "react-router-dom";
import AdminLogout from "./Logoutadmin";
import { useSelector } from "react-redux";

// import AdminViewMeme from './AdminViewMeme'

const AdminHeader = () => {
  const admin = useSelector((state) => state.admin.admin)
  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Memestagram Admin</h1>
        <nav className="flex space-x-4">
          

        </nav>


        {admin
        &&
        <Link to="/admin/createuser" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">
        Add User
      </Link>}
        {admin  &&
          <Link to='/admin/viewmemeadmin' className="text-gray-300 hover:text-white transition duration-300 ease-in-out">
            Manage Memes
          </Link>}
        {admin  &&
          < AdminLogout />}

      </div>
    </header>
  );
};

export default AdminHeader;