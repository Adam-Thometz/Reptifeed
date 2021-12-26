import React from "react";

const Alert = ({ type = 'danger', messages = [] }) => {
  return (
    <div className={`Alert-${type}`}>
      {messages.map(m => (
        <p key={m}>{m}</p>
      ))}
    </div>
  );
};

export default Alert;