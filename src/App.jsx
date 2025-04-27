import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./page/home/Home";
import Top from "./page/home/top/Top";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import People from "./Components/people/People";

function App() {
  const [name, setName] = useState();

  const [xonaa, setXonaa] = useState();
  const [nambrr, setNaberr] = useState();

  const [nonn, setnonn] = useState();
  const [nonnabrr, setnonnabrr] = useState();

  const [choyy, setchoyy] = useState();
  const [choyNn, setchoNyy] = useState();

  const [salatt, setsalatt] = useState();
  const [salatNn, setsalatnN] = useState();

  const [taomm, settaomm] = useState();
  const [taomNn, settaomNn] = useState();

  const [data, setData] = useState([]);

  const [manzil, setManzil] = useState();
  const [raqami, setRaqami] = useState();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="home"
            element={
              <Home
                setRaqami={setRaqami}
                setManzil={setManzil}
                setXonaa={setXonaa}
                setNaberr={setNaberr}
                setnonn={setnonn}
                setnonnabrr={setnonnabrr}
                setchoyy={setchoyy}
                setchoNyy={setchoNyy}
                setsalatt={setsalatt}
                setsalatnN={setsalatnN}
                settaomm={settaomm}
                settaomNn={settaomNn}
              />
            }
          />
          <Route path="/home/:id" element={<Home />} /> {/* ✅ Dinamik route */}
          <Route path="/" element={<Top manzil={manzil} raqami={raqami} />} />
          <Route path="/people" element={<People />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
