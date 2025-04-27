import React, { useState, useEffect } from "react";
import { 
  FaCircleArrowLeft, 
  FaTurnUp, 
  FaTrash, 
  FaMagnifyingGlass, // FaSearch o'rniga
  FaArrowLeft 
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./people.css";

function People({wan}) {
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  // notes o'zgarganda localStorage'ga saqlaymiz
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newNote = {
        id: Date.now(),
        text: input,
        createdAt: new Date().toISOString()
      };
      setNotes([...notes, newNote]);
      setInput("");
    }
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Bu qaydni rostdan ham o'chirmoqchimisiz?");
    if (confirmDelete) {
      setNotes(notes.filter(note => note.id !== id));
    }
  };

  // Qidiruv natijalari
  const filteredNotes = notes.filter(note =>
    note.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="telegram-theme">
      <div className="qayd">
        <Link to={"/"}>
          <FaArrowLeft />
        </Link>
        <h1>Qaydlar</h1>
      </div>

      {/* Qidiruv inputi */}
      <div className="search-container">
        <FaMagnifyingGlass className="search-icon" /> {/* FaSearch o'rniga */}
        <input
          type="text"
          placeholder=" qidirish..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Qaydlar ro'yxati */}
      <div className="cards-list">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div key={note.id} className="card">
              <div className="card-content">
                <h3>{note.text}</h3>
                <small>{new Date(note.createdAt).toLocaleString()}</small>
              </div>
              <button 
                onClick={() => handleDelete(note.id)} 
                className="delete-btn"
                aria-label="Delete note"
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <p className="no-notes">
            {searchTerm ? "Qidiruv bo'yicha natija topilmadi" : "Hozircha qaydlar mavjud emas"}
          </p>
        )}
      </div>

      {/* Yangi qayd qo'shish formasi */}
      <form onSubmit={handleSubmit} className="message-form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Yangi qayd qo'shish..."
          required
        />
        <button 
          type="submit" 
          className="btnn"
          disabled={!input.trim()}
        >
          <FaTurnUp />
        </button>
      </form>
    </div>
  );
}

export default People;