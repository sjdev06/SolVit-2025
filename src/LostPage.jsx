import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Search } from "lucide-react";
import "./LostPage.css";

const LostPage = () => {
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verifying, setVerifying] = useState(null);
  const [verified, setVerified] = useState(null);
  const [answer, setAnswer] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/lost-items") // Replace with your backend API URL
      .then((response) => response.json())
      .then((data) => {
        setLostItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching lost items:", err);
        setError("Failed to fetch lost items");
        setLoading(false);
      });
  }, []);

  const handleVerify = (id, location) => {
    if (verifying === id) {
      if (answer.toLowerCase() === location.toLowerCase()) {
        setVerified(id);
        setVerifying(null);
      } else {
        alert("Incorrect answer. Please try again.");
      }
      setAnswer("");
    } else {
      setVerifying(id);
      setVerified(null);
    }
  };

  if (loading) return <p>Loading lost items...</p>;
  if (error) return <p className="error">{error}</p>;

  const filteredItems = lostItems.filter((item) =>
    [item.name, item.description].some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container">
      <div className="wrapper">
        <div className="header">
          <button onClick={() => navigate("/")} className="back-link">
            <ArrowLeft className="mr-2" size={20} />
          </button>
          <h1 className="header-title">Lost Items</h1>
        </div>

        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search for lost items..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredItems.length === 0 ? (
          <p className="text-center">No items match your search.</p>
        ) : (
          <div className="grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="card">
                <img src={item.image} alt={item.name} width={300} height={200} className="card-image" />
                <div className="card-body">
                  <div className="card-title">{item.name}</div>
                  <div className="card-info">Date: {item.date}</div>
                  <div className="card-info">Contact: {item.mobile}</div>
                  <div className="card-info">{item.description}</div>

                  {verified === item.id ? (
                    <div className="owner-box">
                      <h4>
                        <Check size={18} /> Owner Details
                      </h4>
                      <p><b>Name:</b> {item.owner.name}</p>
                      <p><b>Address:</b> {item.owner.address}</p>
                      <p><b>Phone:</b> {item.owner.phone}</p>
                    </div>
                  ) : verifying === item.id ? (
                    <div className="verification-box">
                      <h4>Verification</h4>
                      <p>Where was this item found? (Hint: college name)</p>
                      <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="verification-input"
                      />
                      <button onClick={() => handleVerify(item.id, item.location)} className="verify-btn">
                        Submit
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => handleVerify(item.id, item.location)} className="verify-btn">
                      Verify
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LostPage;
