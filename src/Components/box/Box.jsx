import React from "react";
import { Link } from "react-router-dom";

function Box({ number, onClick, onRemove, selectedItems }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (typeof onClick === "function") {
      onClick();
    }
  };

  return (
  
    <div className="box-container" onClick={handleClick}>
        


      <div className="box-content">
        <h2>Xona: {number}</h2>
        <button onClick={(e) => { e.stopPropagation(); onRemove(); }}>❌</button>

        {selectedItems && selectedItems.length > 0 && (
          <div className="selected-items">
            {selectedItems.map((item, index) => (
              <div key={index} className="item">
                {item.xona} | {item.joy}
              </div>
            ))}
          </div>
        )}
      </div>

      <Link to={`/home/${number}`} state={{ roomKey: number }}>
        Xona Qo'shish
      </Link>
    </div>
  );
}

export default Box;
