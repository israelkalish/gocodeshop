import React, {useContext} from 'react';
import { MyContext } from '../../MyContext';

function AdminLogin() {
  const {password, handlePasswordChange,handleFormSubmit} = useContext(MyContext);

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <button type="submit">Log in</button>
    </form>
  );
}

export default AdminLogin;