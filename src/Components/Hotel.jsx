import React, { useState, useEffect } from "react";

const Hotel = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <h2>{props.name}</h2>
      {!isExpanded ? null : (
        <div>
          {props.name}
          <br />
          {props.city}
          <br /> {props.stars}
        </div>
      )}
      {
        <button onClick={handleToggle}>
          {isExpanded ? "Show less" : "Show more"}
        </button>
      }
    </div>
  );
};

export default Hotel;
