
import AdminHeader from './AdminHeader';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <Outlet /> {/* Render child routes here */}
    </>
  );
};

export default AdminLayout;
