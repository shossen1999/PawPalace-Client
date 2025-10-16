import { useContext } from "react";

import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { AuthContext } from "../../Provider/AuthProvider";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()
    if (loading) {
        return <Skeleton height={50} width="100%" count={5}></Skeleton>
    }
    if (user) {
        return children
    }
    return <Navigate to="/login" state={location.pathname} replace={true}></Navigate>
};
PrivateRoute.propTypes = {
    children: PropTypes.node
}
export default PrivateRoute;