
import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';

import {
    Routes,
    Route,
    Link,
    useNavigate,
    useLocation,
    Navigate,
    Outlet,
} from "react-router-dom";
import { toast } from 'react-toastify';
import auth from './firebase.init';

const RequireAuth = ({ children }) => {
    const [sendEmailVerification, sending, VerificationError] = useSendEmailVerification(auth);
    const [user, loading] = useAuthState(auth);
    let location = useLocation();
    if (loading) {
        return <div className='d-flex justify-content-center align-items-center'>
            <Spinner className='text-center' animation="border" variant="primary" />
        </div>
    }
    if (!user) {

        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;


};

export default RequireAuth;