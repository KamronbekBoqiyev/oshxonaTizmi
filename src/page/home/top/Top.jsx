import React, { useEffect, useState } from "react";
import Box from "../../../Components/box/Box";
import { MdAddHome } from "react-icons/md";
import "./Top.css";
// import People from "../../../Components/people/People";


function Top() {
  const [boxes, setBoxes] = useState([]);
  const [selectedData, setSelectedData] = useState({});

  // 🔄 LocalStorage'dan boshlang‘ich ma'lumotni yuklash
  useEffect(() => {
    const savedBoxes = JSON.parse(localStorage.getItem("boxes")) || [0];
    const savedData = JSON.parse(localStorage.getItem("boxesData")) || {};
    setBoxes(savedBoxes);
    setSelectedData(savedData);
  }, []);

  // ➕ Yangi Box qo‘shish
  const handleAddBox = () => {
    const newId = boxes.length > 0 ? Math.max(...boxes) + 1 : 0;
    const newBoxes = [...boxes, newId];
    setBoxes(newBoxes);
    localStorage.setItem("boxes", JSON.stringify(newBoxes));
  };

  // 🔁 Har bir Boxning tanlangan elementlarini saqlash
  const handleBoxSelectItems = (boxId, selectedItems) => {
    const updatedData = {
      ...selectedData,
      [boxId]: selectedItems,
    };
    setSelectedData(updatedData);
    localStorage.setItem("boxesData", JSON.stringify(updatedData));
  };

  // ❌ Box o‘chirish
  const handleRemoveBox = (boxId) => {
    const updatedBoxes = boxes.filter((id) => id !== boxId);
    const updatedData = { ...selectedData };
    delete updatedData[boxId];

    setBoxes(updatedBoxes);
    setSelectedData(updatedData);

    localStorage.setItem("boxes", JSON.stringify(updatedBoxes));
    localStorage.setItem("boxesData", JSON.stringify(updatedData));
  };

  // 🧹 Tozalash (reset qilish)
  const handleClearAll = () => {
    setBoxes([0]);
    setSelectedData({});
    localStorage.removeItem("boxes");
    localStorage.removeItem("boxesData");
  };

  return (
    <div className="top-container">
      {/* <People/> */}
      <div className="boxes-container">
        {boxes.map((boxId) => (
          <Box
            key={boxId}
            number={boxId}
            selectedItems={selectedData[boxId] || []}
            onSelect={(items) => handleBoxSelectItems(boxId, items)}
            onRemove={() => handleRemoveBox(boxId)}
            onClick={() => console.log(`Box ${boxId} bosildi`)}
          />
        ))}
      </div>

      <div className="buttons">
        <button onClick={handleAddBox} className="add-box-btn">
          <MdAddHome /> Yangi Box Qo‘shish
        </button>

        <button onClick={handleClearAll} className="clear-box-btn">
          ❌ Tozalash
        </button>
      </div>
    </div>
  );
}

export default Top;
