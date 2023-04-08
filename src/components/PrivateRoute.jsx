import { Navigate } from 'react-router-dom';
import useUser from '../hooks/useUser';

const PrivateRoute = ({children}) => {
    const user =useUser();
    return (user?.role=='student')?children:<Navigate to="/studentPortal/studentLogin"/>
};

export default PrivateRoute;