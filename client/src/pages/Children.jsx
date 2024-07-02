import { useState, useEffect } from "react";

import play from "../assets/images/playing.png";

function Children() {
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);

  useEffect(() => {
    // Fetch children data from your database
    fetch(`${import.meta.env.VITE_API_URL}/api/childrens`)
      .then((response) => response.json())
      .then((data) => setChildren(data))
      .catch((error) => console.error("Error fetching children data:", error));
  }, []);

  useEffect(() => {
    if (children.length > 0) {
      setSelectedChild(children[0]);
    }
  }, [children]);

  const handleChildClick = (child) => {
    setSelectedChild(child);
  };

  const renderChildInfo = () => {
    if (!selectedChild) {
      return null;
    }

    const dateOfBirth = new Date(selectedChild.date_of_birth);
    const formattedDate = dateOfBirth.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    return (
      <div className="child-info">
        <h2 className="child-title">
          {selectedChild.firstname} {selectedChild.lastname}
        </h2>
        <div className="para-child">
          <div>
            <p>
              <span>Sexe:</span> {selectedChild.gender}
            </p>
            <p>
              <span>Date de naissance:</span> {formattedDate}
            </p>
            <p>
              <span>Alimentation:</span> {selectedChild.alimentation}
            </p>
            <p>
              <span>Allergie:</span> {selectedChild.allergy}
            </p>
            <p>
              <span>Tétine:</span> {selectedChild.passy}
            </p>
            <p>
              <span>Lait:</span> {selectedChild.milk}
            </p>
          </div>
          <div className="play-pic">
            <img src={play} alt="child gaming pic" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="ChildrenComponent">
      <div className="children-list">
        {children.map((child) => (
          <button
            type="button"
            key={child.id}
            className="child-bubble"
            onClick={() => handleChildClick(child)}
          >
            <img src={child.avatar} alt={child.name} />
            <p className="child-name">{child.firstname}</p>
          </button>
        ))}
      </div>

      {renderChildInfo()}
    </section>
  );
}

export default Children;
