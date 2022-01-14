import React, { useContext, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ReptifeedApi from "../api";
import Alert from "../common/Alert";
import UserContext from "../utils/UserContext";
import './EditUserForm.css'

const EditUserForm = () => {
  const { currUser, setCurrUser } = useContext(UserContext)
  const { id } = useParams();
  const navigate = useNavigate();

  document.title = `Edit ${currUser.username}'s Profile | Reptifeed`;
  const init = {
    username: currUser.username,
    password: '',
    email: currUser.email
  }; 

  const [formData, setFormData] = useState(init);
  const [formMessages, setFormMessages] = useState([]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(d => ({ ...d, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await ReptifeedApi.updateUser(+id, formData);
      setCurrUser(res);
      navigate(`/users/${res.id}`);
    } catch (errors) {
      setFormMessages(m => [...m, errors]);
    };
  };

  return (
    <div className="EditUserForm">
      <h1>Edit your information</h1>
      <form onSubmit={handleSubmit}>
        <div className="EditUserForm-form-group">
          <label className="EditUserForm-label" htmlFor="username">Username:</label>
          <input
            className="EditUserForm-input"
            type='text'
            id='username'
            name='username'
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="EditUserForm-form-group">
          <label className="EditUserForm-label" htmlFor="password">Password:</label>
          <input
            className="EditUserForm-input"
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="EditUserForm-form-group">
          <label className="EditUserForm-label" htmlFor="email">Email:</label>
          <input
            className="EditUserForm-input"
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button className="EditUserForm-submit" type="submit">Edit</button>
        {formMessages.length ? <Alert type="danger" messages={formMessages} /> : null }
      </form>
    </div>
  );
};

export default EditUserForm;