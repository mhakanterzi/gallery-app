import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardTitle } from "react-bootstrap";
import axios from "axios";

function ListCars({ onBackToMenu }) {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const listCar = async () => {
      try {
        const response = await axios.get("http://localhost:1337/api/cars");
        setCars(response.data.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
        alert("Failed to fetch cars.");
      }
    };
    listCar();
  }, []);

  const StockCarButton = ({ stock }) => {
    return stock === 0 ? (
      <Button variant="danger">Want a Car</Button>
    ) : (
      <Button variant="primary">Test Drive</Button>
    );
  };

  const handleAddToFavorites = async (carId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to add cars to favorites.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:1337/api/favorites", {
        data: {
          users_permissions_user: userId,
          car: carId,
        },
      });
      console.log("Favorite added:", response.data);
      alert("Car successfully added to favorites!");
    } catch (error) {
      console.error("Error adding to favorites:", error.response?.data || error.message);
      alert("Failed to add car to favorites. Please try again.");
    }
  };
  

  return (
    <Card style={{ width: "90%", maxWidth: "50%", margin: "auto", padding: "20px", marginTop: "20px" }}>
      <CardBody>
        <CardTitle style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold" }}>All Cars</CardTitle>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <div style={{ flex: 1, textAlign: "center" }}>Brand</div>
          <div style={{ flex: 1, textAlign: "center" }}>Model</div>
          <div style={{ flex: 1, textAlign: "center" }}>Year</div>
          <div style={{ flex: 1, textAlign: "center" }}>Description</div>
          <div style={{ flex: 1, textAlign: "center" }}>Stock</div>
          <div style={{ flex: 1, textAlign: "center" }}>Price</div>
          <div style={{ flex: 1, textAlign: "center" }}>Actions</div>
        </div>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {cars.map((car) => (
            <li key={car.documentId}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ flex: 1, textAlign: "center" }}>{car.Brand}</div>
                <div style={{ flex: 1, textAlign: "center" }}>{car.Model}</div>
                <div style={{ flex: 1, textAlign: "center" }}>{car.Year}</div>
                <div style={{ flex: 1, textAlign: "center" }}>{car.Description}</div>
                <div style={{ flex: 1, textAlign: "center" }}>{car.Stock}</div>
                <div style={{ flex: 1, textAlign: "center" }}>{car.Price}</div>
                <div style={{ flex: 1, textAlign: "center" }}>
                  <StockCarButton stock={car.Stock} />
                </div>
                <div style={{ flex: 1, textAlign: "center" }}>
                  <Button variant="success" onClick={() => handleAddToFavorites(car.documentId)}>
                    Add to Favorites
                  </Button>
                </div>
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

export default ListCars;
