
import Header from './Header';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <>
      <Header />
      <Outlet /> {/* Render child routes here */}
    </>
  );
};

export default UserLayout;
