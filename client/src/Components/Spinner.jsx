import React from "react";

const Spinner = () => {
  return (
    <div>
      <div className="backdrop">
        <div className="spinner"></div>
        <div className="logo">loading...</div>
      </div>
    </div>
  );
};

export default Spinner;
