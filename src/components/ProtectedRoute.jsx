import React, { useContext, useRef } from 'react'
import { MyContext } from '../Context';
import { Navigate, useLocation } from 'react-router';

export const ProtectedRoute = ({children}) => {
    const { user, setShowAuthPage } = useContext(MyContext);
    const location = useLocation();
    const showRef = useRef(false);
    if(!user){
        if(!showRef.current){
            setShowAuthPage(true);
            showRef.current = true;
        }
        return <Navigate to ="/" state={{ from: location }} replace />;
    }
    return children;
}
