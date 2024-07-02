import { useState, useEffect } from "react";

function Avatar() {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    // Fetch children data from your database
    fetch(`${import.meta.env.VITE_API_URL}/api/childrens`)
      .then((response) => response.json())
      .then((data) => setChildren(data))
      .catch((error) => console.error("Error fetching children data:", error));
  }, []);

  return (
    <section className="avatar-list">
      {children.map((child) => (
        <button type="button" key={child.id} className="Avatar-Pic">
          <img src={child.avatar} alt={child.name} />
          <p className="avatarName">{child.firstname}</p>
        </button>
      ))}
    </section>
  );
}

export default Avatar;
