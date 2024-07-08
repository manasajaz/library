import React from 'react'
import { useNavigate } from 'react-router-dom';
import BAbutton from '../component/button';

function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('role');
        navigate('/');
    };

    return (
        <BAbutton onClick={handleLogout} label="Logout" />
    )
}

export default Logout