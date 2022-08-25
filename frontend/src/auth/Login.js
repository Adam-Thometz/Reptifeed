import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Alert from "../common/Alert";
import './Login.css'

const Login = ({ login }) => {
  const navigate = useNavigate();
  document.title = "Log in | Reptifeed";

  const init = {
    username: '',
    password: ''
  }; 

  const [formData, setFormData] = useState(init);
  const [formMessages, setFormMessages] = useState([]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(d => ({ ...d, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await login(formData);
    if (res.success) {
      navigate(`/users/${res.id}`);
    } else {
      setFormMessages(res.errors);
    };
  };

  return (
    <div tabIndex={0} className="Login">
      <h1>Login to your Reptifeed account</h1>
      <form onSubmit={handleSubmit}>
        <div className="Login-form-group">
          <label className="Login-label" htmlFor="username">Username:</label>
          <input
            className="Login-input"
            type='text'
            id='username'
            name='username'
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="Login-form-group">
          <label className="Login-label" htmlFor="password">Password:</label>
          <input
            className="Login-input"
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button className="Login-submit" type="submit">Login</button>
        <p>Want to try this app?</p>
        <p>Username: abc</p>
        <p>Password: 123</p>
        {formMessages.length ? <Alert type="danger" messages={formMessages} /> : null }
      </form>
    </div>
  )
};

export default Login;