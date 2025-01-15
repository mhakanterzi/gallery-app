import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, CardTitle } from "react-bootstrap";
import axios from "axios";

function StockRequest({ onBackToMenu }) {
  const [stockRequests, setStockRequests] = useState([]);

  useEffect(() => {
    const fetchStockRequests = async () => {
      try {
        const userId = localStorage.getItem("userId");

        const response = await axios.get(
          `http://localhost:1337/api/car-requests?populate=*&filters[users_permissions_user][id][$eq]=${userId}`
        );
        setStockRequests(response.data.data || []);
      } catch (error) {
        console.error("Error fetching stock requests:", error);
        alert("Failed to fetch stock requests.");
      }
    };
    fetchStockRequests();
  }, []);

  return (
    <Card
      style={{
        width: "90%",
        maxWidth: "50%",
        margin: "auto",
        padding: "20px",
        marginTop: "20px",
      }}
    >
      <CardBody>
        <CardTitle
          style={{
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          All Cars
        </CardTitle>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
            fontWeight: "bold",
          }}
        >
          <div style={{ flex: 1, textAlign: "center" }}>Brand</div>
          <div style={{ flex: 1, textAlign: "center" }}>Model</div>
          <div style={{ flex: 1, textAlign: "center" }}>Year</div>
          <div style={{ flex: 1, textAlign: "center" }}>Description</div>
          <div style={{ flex: 1, textAlign: "center" }}>Stock</div>
          <div style={{ flex: 1, textAlign: "center" }}>Price</div>
          <div style={{ flex: 1, textAlign: "center" }}>Status</div>
        </div>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {stockRequests.map((request) => {
            const car = request.car; // car bilgisi burada alınıyor
            const status =
              car.Stock > 0 ? "Stock Updated" : "Pending"; // Stok durumuna göre mesaj

            return (
              <li key={request.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ flex: 1, textAlign: "center" }}>
                    {car.Brand}
                  </div>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    {car.Model}
                  </div>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    {car.Year}
                  </div>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    {car.Description}
                  </div>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    {car.Stock}
                  </div>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    {car.Price}
                  </div>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <span
                      style={{
                        color: car.Stock > 0 ? "green" : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {status}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <Button
          onClick={onBackToMenu}
          variant="secondary"
          style={{ marginTop: "20px" }}
        >
          Back To Main Menu
        </Button>
      </CardBody>
    </Card>
  );
}

export default StockRequest;
