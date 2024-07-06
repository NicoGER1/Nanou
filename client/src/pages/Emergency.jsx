import { useState, useEffect } from "react";

function Emergency() {
  const [emergencyServices, setEmergencyServices] = useState([]);
  const [poisonServices, setPoisonServices] = useState([]);

  useEffect(() => {
    const fetchEmergencyServices = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/emergency`
        );
        const data = await response.json();
        setEmergencyServices(data);
      } catch (error) {
        console.error("Error fetching emergency services:", error);
      }
    };

    const fetchPoisonServices = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/poison_service`
        );
        const data = await response.json();
        setPoisonServices(data);
      } catch (error) {
        console.error("Error fetching poison services:", error);
      }
    };

    fetchEmergencyServices();
    fetchPoisonServices();
  }, []);

  return (
    <section className="EmergencyComponent">
      <div className="urgence">
        <h2 className="title">Numéros d'urgence</h2>
        <ul className="list">
          {emergencyServices.map((service) => (
            <li key={service.ID} className="list-item">
              {service.name} <span className="number-info">{service.number}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="poison">
        <h2 className="title">Centre antipoison</h2>
        <ul className="list">
          {poisonServices.map((service) => (
            <li key={service.ID} className="list-item">
              {service.name} <span className="number-info">{service.number}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Emergency;
