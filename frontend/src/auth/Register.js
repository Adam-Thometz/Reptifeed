import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Alert from "../common/Alert";
import './Register.css'

const Register = ({ register }) => {
  const navigate = useNavigate();
  document.title = "Register | Reptifeed";

  const init = {
    username: '',
    password: '',
    email: ''
  }; 

  const [formData, setFormData] = useState(init);
  const [formMessages, setFormMessages] = useState([]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(d => ({ ...d, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await register(formData);
    if (res.success) {
      navigate(`/users/${res.id}`);
    } else {
      setFormMessages(res.errors)
    };
  };

  return (
    <div className="Register">
      <h1>Register for your Reptifeed account</h1>
      <form onSubmit={handleSubmit}>
        <div className="Register-form-group">
          <label className="Register-label" htmlFor="username">Username:</label>
          <input
            className="Register-input"
            type='text'
            id='username'
            name='username'
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="Register-form-group">
          <label className="Register-label" htmlFor="password">Password:</label>
          <input
            className="Register-input"
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="Register-form-group">
          <label className="Register-label" htmlFor="email">Email:</label>
          <input
            className="Register-input"
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button className="Register-submit" type="submit">Register</button>
        {formMessages.length ? <Alert type="danger" messages={formMessages} /> : null }
      </form>
    </div>
  );
};

export default Register;