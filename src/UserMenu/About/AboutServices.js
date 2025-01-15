import React, { useEffect, useState } from "react";
import { Card,CardBody, CardTitle, Button } from "react-bootstrap";
import axios from "axios";

function AboutServices({ onBackToMenu }) {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            const userId = localStorage.getItem("userId");

            try {
                const response = await axios.get(
                    `http://34.38.235.50:1337/api/service-requests?populate=*&filters[users_permissions_user][id][$eq]=${userId}`
                );
                setServices(response.data.data);
            } catch (error) {
                console.error("Error fetching service requests:", error);
                alert("Error fetching service requests.");
            }
        };

        fetchServices();
    }, []);

    return(
    <Card style={{ width: "90%", maxWidth: "50%", margin: "auto", padding: "20px", marginTop: "20px" }}>
      <CardBody>
        <CardTitle style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold" }}>Service Requests</CardTitle>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <div style={{ flex: 1, textAlign: "center" }}>Brand</div>
          <div style={{ flex: 1, textAlign: "center" }}>Maintenance Type</div>
          <div style={{ flex: 1, textAlign: "center" }}>Date</div>
          <div style={{ flex: 1, textAlign: "center" }}>Status</div>
        </div>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {services.map((service) => (
            <li key={service.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ flex: 1, textAlign: "center" }}>{service.Brand}</div>
                <div style={{ flex: 1, textAlign: "center" }}>{service.AboutCar}</div>
                <div style={{ flex: 1, textAlign: "center" }}>{service.request_date}</div>
                <div style={{ flex: 1, textAlign: "center" }}>{service.request_status}</div>
              </div>
            </li>
          ))}
        </ul>
        <Button onClick={onBackToMenu} variant="secondary" style={{ marginTop: "20px" }}>
          Back To Main Menu
        </Button>
      </CardBody>
    </Card>
  );
}

export default AboutServices;
