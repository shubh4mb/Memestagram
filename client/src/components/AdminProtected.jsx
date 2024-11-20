import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { verifyToken } from '../redux/admin/AdminVerifyThunk';
import { useEffect } from 'react';

const AdminProtected = ({ children }) => {
    const dispatch = useDispatch();
    const { isAuthenticated, loading } = useSelector((state) => state.admin);

    useEffect(() => {
        // Only verify the token if not already authenticated and not loading
        if (!isAuthenticated && !loading) {
            dispatch(verifyToken());
        }
    }, [isAuthenticated, loading, dispatch]); // Add dependencies here

    // If still loading, you might want to show a loader here
    if (loading) {
        return <div>Loading...</div>;
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default AdminProtected;
