// src/Login.js
import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admmin');

  const handleLogin = () => {
    // Implement logic untuk proses login di sini
    console.log(`Username: ${username}, Password: ${password}`);
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
