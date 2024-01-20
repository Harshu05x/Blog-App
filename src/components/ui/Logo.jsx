import React from 'react';
import { MdMenuBook } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


function Logo(props) {
    const navigate = useNavigate();
    return (
        <div className=' text-white text-4xl cursor-pointer'
            onClick={ () => navigate("/")}
        >
            <MdMenuBook />            
        </div>
    );
}

export default Logo;