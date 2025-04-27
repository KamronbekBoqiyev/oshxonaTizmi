import { useState, useEffect } from "react";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import "./Home.css";

export default function Home({ setManzil, setRaqami }) {
  const location = useLocation();
  const roomKey = String(location.state?.roomKey || "So'ri_1");

  const getKey = (key) => `${roomKey}_${key}`;

  const [non, setNon] = useState(localStorage.getItem(getKey("non")) || "yo'q");
  const [nonCount, setNonCount] = useState(+localStorage.getItem(getKey("nonCount")) || 0);
  const [choy, setChoy] = useState(localStorage.getItem(getKey("choy")) || "yo'q");
  const [choyCount, setChoyCount] = useState(+localStorage.getItem(getKey("choyCount")) || 0);

  const [salatlar, setSalatlar] = useState(
    JSON.parse(localStorage.getItem(getKey("salatlar"))) || [
      { turi: "yo'q", soni: "0x" },
      { turi: "yo'q", soni: "0x" },
      { turi: "yo'q", soni: "0x" },
    ]
  );

  const [shashliklar, setShashliklar] = useState(
    JSON.parse(localStorage.getItem(getKey("shashliklar"))) || [
      { turi: "yo'q", soni: "0x" },
    ]
  );

  const [manzil, setManzilLocal] = useState(roomKey.split("_")[0]);
  const [raqam, setRaqamLocal] = useState(roomKey.split("_")[1]);

  useEffect(() => {
    localStorage.setItem(getKey("manzil"), manzil);
    localStorage.setItem(getKey("raqami"), raqam);
    localStorage.setItem(getKey("non"), non);
    localStorage.setItem(getKey("nonCount"), nonCount);
    localStorage.setItem(getKey("choy"), choy);
    localStorage.setItem(getKey("choyCount"), choyCount);
    localStorage.setItem(getKey("salatlar"), JSON.stringify(salatlar));
    localStorage.setItem(getKey("shashliklar"), JSON.stringify(shashliklar));
  }, [manzil, raqam, non, nonCount, choy, choyCount, salatlar, shashliklar]);

  const handleChange = (setter, value) => setter(value);

  const handleSalatChange = (index, key, value) => {
    const updated = [...salatlar];
    updated[index][key] = value;
    setSalatlar(updated);
  };

  const handleShashlikChange = (index, key, value) => {
    const updated = [...shashliklar];
    updated[index][key] = value;
    setShashliklar(updated);
  };

  const addShashlik = () => {
    setShashliklar([...shashliklar, { turi: "yo'q", soni: "0x" }]);
  };

  const removeShashlik = (index) => {
    setShashliklar(shashliklar.filter((_, i) => i !== index));
  };

  return (
    <div className="containerrr cnt">
      <div className="left">
        <Link to="/">
          <BsArrowLeftSquareFill className="leftt" />
        </Link>
      </div>

      <h2 className="title">Jadval</h2>

      <div className="flex">
        <select
          value={manzil}
          onChange={(e) => {
            handleChange(setManzilLocal, e.target.value);
            setManzil(e.target.value);
          }}
        >
          {["So'ri", "Xona", "Kreslo", "Stul"].map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <select
          value={raqam}
          onChange={(e) => {
            handleChange(setRaqamLocal, e.target.value);
            setRaqami(e.target.value);
          }}
        >
          {[...Array(16)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="section">
        <label>NON:</label>
        <select
          className="select"
          value={non}
          onChange={(e) => handleChange(setNon, e.target.value)}
        >
          <option value="yo'q">yo'q</option>
          <option value="4000">4000</option>
          <option value="2000">2000</option>
          <option value="yarim">2000 + 4000</option>
        </select>

        <select
          className="select"
          value={nonCount}
          onChange={(e) => handleChange(setNonCount, +e.target.value)}
        >
          {[...Array(10)].map((_, i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>

      <div className="section">
        <label>CHOY:</label>
        <select
          className="select"
          value={choy}
          onChange={(e) => handleChange(setChoy, e.target.value)}
        >
          <option value="yo'q">yo'q</option>
          <option value="qora">qora</option>
          <option value="ko'k">ko'k</option>
        </select>

        <select
          className="select"
          value={choyCount}
          onChange={(e) => handleChange(setChoyCount, +e.target.value)}
        >
          {[...Array(10)].map((_, i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>

      <div className="section">
        <label>SALAT:</label>
        {salatlar.map((s, i) => (
          <div className="item" key={i}>
            <select
              className="select"
              value={s.turi}
              onChange={(e) => handleSalatChange(i, "turi", e.target.value)}
            >
              <option value="yo'q">yo'q</option>
              <option value="suzma">suzma</option>
              <option value="sveji">sveji</option>
              <option value="salyoni">salyoni</option>
            </select>

            <select
              className="select"
              value={s.soni}
              onChange={(e) => handleSalatChange(i, "soni", e.target.value)}
            >
              {[...Array(10)].map((_, j) => (
                <option key={j} value={`${j}x`}>
                  {j}x
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="section">
        <label>SHASHLIK:</label>
        {shashliklar.map((s, i) => (
          <div className="item" key={i}>
            <select
              className="select"
              value={s.turi}
              onChange={(e) => handleShashlikChange(i, "turi", e.target.value)}
            >
              <option value="yo'q">yo'q</option>
              <option value="go'sht">go'sht</option>
              <option value="jigar">jigar</option>
              <option value="qanot">qanot</option>
            </select>

            <select
              className="select"
              value={s.soni}
              onChange={(e) => handleShashlikChange(i, "soni", e.target.value)}
            >
              {[...Array(10)].map((_, j) => (
                <option key={j} value={`${j}x`}>
                  {j}x
                </option>
              ))}
            </select>

            <button onClick={() => removeShashlik(i)}>X</button>
          </div>
        ))}
        <button className="addButton" onClick={addShashlik}>
          + Shashlik qo'shish
        </button>
      </div>
    </div>
  );
}
