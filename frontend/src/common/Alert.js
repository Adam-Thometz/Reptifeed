import React from "react";
import './Alert.css'

const Alert = ({ type = 'danger', messages = [] }) => {
  return (
    <div className={`Alert ${type}`}>
      {messages.map((m, i) => (
        <p key={i}>{m}</p>
      ))}
    </div>
  );
};

export default Alert;