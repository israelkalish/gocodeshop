import React, {useContext, useEffect} from 'react';
import { MyContext } from '../../MyContext';
import AdminLogin from '../AdminLoginPage/AdminLoginPage';
import {useNavigate } from 'react-router-dom';

const AdminPage = () => {
  
  const navigate = useNavigate()
  
  const {isadmin} = useContext(MyContext);
  useEffect(()=> {
    if(isadmin) {
      navigate("/")
    }},[isadmin])

  if (!isadmin) {
    return (
      <AdminLogin/>
    )
  }
  return (<div></div>)
}

export default AdminPage