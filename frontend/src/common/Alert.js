import React from "react";
import { useNavigate } from "react-router-dom";
import './Alert.css'

const Alert = ({ type = 'danger', messages = [], link = '' }) => {
  const navigate = useNavigate();
  return (
    <div className={`Alert ${type}`} onClick={link ? () => navigate(link) : null} style={ link ? {cursor: 'pointer'} : {}}>
      {messages.map((m, i) => (
        <p key={i}>{m}</p>
      ))}
    </div>
  );
};

export default Alert;