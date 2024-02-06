import React from 'react';
import './error.css';
const Error = ({ message }) => {
  return (
    <div className={`error-message ${message ? 'visible' : 'hidden'}`}>
      {message}
    </div>
  );
};

export default Error;
