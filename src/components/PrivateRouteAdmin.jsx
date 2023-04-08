import React from 'react';
import useUser from '../hooks/useUser';
import { Navigate } from 'react-router-dom';

const PrivateRouteAdmin = ({ children }) => {
    const user = useUser();
    return (user?.role == 'admin') ? children : <Navigate to="/admin" />
};

export default PrivateRouteAdmin;