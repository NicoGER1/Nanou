import { useState, useEffect } from "react";

import parentChild from "../assets/images/parent-pic.png";

function Parents() {
  const [children, setChildren] = useState([]);
  const [selectedParent, setSelectedParent] = useState(null);

  const handleChildClick = (childId) => {
    console.info(childId);
    fetch(
      `${import.meta.env.VITE_API_URL}/api/childrens_parents/child/${childId}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setSelectedParent(data[0]);
        } else {
          setSelectedParent(null);
        }
      })
      .catch((error) => console.error("Error fetching parent data:", error));
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/childrens`)
      .then((response) => response.json())
      .then((data) => {
        setChildren(data);
        if (data.length > 0) {
          handleChildClick(data[0].ID);
        }
      })
      .catch((error) => console.error("Error fetching children data:", error));
  }, []);

  const renderParentInfo = () => {
    if (!selectedParent) {
      return null;
    }

    return (
      <div className="parent-info">
        <h2 className="parent-title">Informations du parent</h2>
        <div className="para-parent">
          <div>
          <p>
            <span>Prénom:</span> {selectedParent.firstname}
          </p>
          <p>
            <span>Nom:</span> {selectedParent.lastname}
          </p>
          <p>
            <span>Adresse:</span> {selectedParent.address}
          </p>
          <p>
            <span>Email:</span> {selectedParent.email}
          </p>
          <p>
            <span>Numéro de téléphone:</span> {selectedParent.phoneNumber}
          </p>
          </div>
          <div className="parent-pic">
            <img src={parentChild} alt="parent with child" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="ParentsComponent">
      <div className="children-parent-list">
        {children.map((child) => (
          <button
            type="button"
            key={child.ID}
            className="child-bubble"
            onClick={() => handleChildClick(child.ID)}
          >
            <img src={child.avatar} alt={child.firstname} />
            <p className="child-name">{child.firstname}</p>
          </button>
        ))}
      </div>

      {renderParentInfo()}
    </section>
  );
}

export default Parents;
