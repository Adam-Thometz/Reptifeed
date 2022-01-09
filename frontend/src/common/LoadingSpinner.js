import React from "react";
import './LoadingSpinner.css'

const LoadingSpinner = () => {
  return (
    <div className="LoadingSpinner">
      <h1>Loading...</h1>
      <div className="lds-ripple">
        <div>
        </div>
        <div>
        </div>
      </div>
    </div>
  )
};

export default LoadingSpinner;