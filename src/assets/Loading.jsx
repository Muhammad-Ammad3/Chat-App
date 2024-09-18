import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Loading = () => {
    const navigate = useNavigate()

useEffect(()=>{
    checkUser()
},[])
const checkUser = async()=>{
    const userId = await localStorage.getItem('userId')
    if(userId !== null){
        navigate('/Home')
    }else{
        navigate('/Login')

    }
}


return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">Loading, please wait...</p>
    </div>
  );
};


export default Loading;
