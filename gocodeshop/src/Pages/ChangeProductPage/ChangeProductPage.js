import React, {useContext} from 'react';
import { MyContext } from '../../MyContext';
import AdminLogin from '../AdminLoginPage/AdminLoginPage';
import PageOfProduct from '../../components/PageOfProduct/PageOfProduct';

const ChangeProductPage = () => {
  
  const {isadmin} = useContext(MyContext);

  if (!isadmin) {
    return (
      <AdminLogin/>
    )
  }
  return (
    <PageOfProduct/>
  )
}

export default ChangeProductPage
