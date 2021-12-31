import React, { useContext, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ReptifeedApi from "../api";
import Alert from "../common/Alert";
import UserContext from "../utils/UserContext";
import './NewReptileForm.css';

const NewReptileForm = () => {
  const navigate = useNavigate();
  const { setReptiles } = useContext(UserContext);
  const { id } = useParams();
  const init = {
    name: '',
    species: '',
    subspecies: '',
    birthday: '',
    imgUrl: ''
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
      const newReptile = await ReptifeedApi.createReptile({ ...formData, ownerId: +id });
      setReptiles(r => [...r, newReptile]);
      navigate(`/users/${+id}/reptiles/${newReptile.id}`);
    } catch (errors) {
      setFormMessages(errors);
    };
  };

  return (
    <div className="NewReptileForm">
      <h1>Add a reptile to your account</h1>
      <form onSubmit={handleSubmit}>
        <div className="NewReptileForm-form-group">
          <label className="NewReptileForm-label" htmlFor="name">Name:</label>
          <input
            className="NewReptileForm-input"
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="NewReptileForm-form-group">
          <label className="NewReptileForm-label" htmlFor="species">Species:</label>
          <select
            className="NewReptileForm-input"
            id='species'
            name='species'
            value={formData.species}
            onChange={handleChange}
          >
            <option value=''>-</option>
            <option value='blue tongue skink'>Blue Tongue Skink</option>
          </select>
        </div>
        <div className="NewReptileForm-form-group">
          <label className="NewReptileForm-label" htmlFor="subspecies">Subspecies:</label>
          <input
            className="NewReptileForm-input"
            type='text'
            id='subspecies'
            name='subspecies'
            value={formData.subspecies}
            onChange={handleChange}
          />
        </div>
        <div className="NewReptileForm-form-group">
          <label className="NewReptileForm-label" htmlFor="birthday">Birthday:</label>
          <input
            className="NewReptileForm-input"
            type='date'
            id='birthday'
            name='birthday'
            value={formData.birthday}
            onChange={handleChange}
          />
        </div>
        <div className="NewReptileForm-form-group">
          <label className="NewReptileForm-label" htmlFor="imgUrl">Picture:</label>
          <input
            className="NewReptileForm-input"
            type='text'
            id='imgUrl'
            name='imgUrl'
            value={formData.imgUrl}
            onChange={handleChange}
          />
        </div>
        <button className="NewReptileForm-submit" type="submit">Add Reptile</button>
        {formMessages.length ? <Alert type="danger" messages={formMessages} /> : null }
      </form>
    </div>
  );
};

export default NewReptileForm;