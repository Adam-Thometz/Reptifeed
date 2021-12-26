import React, { useContext, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ReptifeedApi from "../api";
import Alert from "../common/Alert";
import UserContext from "../utils/UserContext";

const EditReptileForm = () => {
  const { reptiles, setReptiles } = useContext(UserContext)
  const { reptileId } = useParams();
  const navigate = useNavigate();

  const reptile = reptiles.filter(r => r.id === +reptileId)[0];

  const init = {
    name: reptile.name,
    subspecies: reptile.subspecies,
    birthday: reptile.birthday,
    imgUrl: reptile.imgUrl
  };

  const [formData, setFormData] = useState(init);
  const [formMessages, setFormMessages] = useState([]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const updatedReptile = await ReptifeedApi.updateReptile(+reptileId, formData);
      setReptiles(data => [...data.filter(r => r.id !== reptile.id), updatedReptile]);
      navigate(`/users/${updatedReptile.ownerId}/reptiles`);
    } catch (errors) {
      setFormMessages(m => [...m, errors]);
    };
  };

  return (
    <div className="EditReptileForm">
      <h1>Edit your reptile</h1>
      <form onSubmit={handleSubmit}>
        <div className="EditReptileForm-form-group">
          <label className="EditReptileForm-label" htmlFor="name">Name:</label>
          <input
            className="EditReptileForm-input"
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="EditReptileForm-form-group">
          <label className="EditReptileForm-label" htmlFor="subspecies">Subspecies:</label>
          <input
            className="EditReptileForm-input"
            type='text'
            id='subspecies'
            name='subspecies'
            value={formData.subspecies}
            onChange={handleChange}
          />
        </div>
        <div className="EditReptileForm-form-group">
          <label className="EditReptileForm-label" htmlFor="birthday">Birthday:</label>
          <input
            className="EditReptileForm-input"
            type='date'
            id='birthday'
            name='birthday'
            value={formData.birthday}
            onChange={handleChange}
          />
        </div>
        <div className="EditReptileForm-form-group">
          <label className="EditReptileForm-label" htmlFor="imgUrl">Picture:</label>
          <input
            className="EditReptileForm-input"
            type='text'
            id='imgUrl'
            name='imgUrl'
            value={formData.imgUrl}
            onChange={handleChange}
          />
        </div>
        <button className="EditReptileForm-submit" type="submit">Edit</button>
        {formMessages.length ? <Alert type="danger" messages={formMessages} /> : null }
      </form>
    </div>
  );
};

export default EditReptileForm;