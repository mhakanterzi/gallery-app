import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Table, Button } from "react-bootstrap";
import axios from "axios";

function DeleteCar({ onBackToMenu }) {
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    try {
      const response = await axios.get("http://34.38.235.50:1337/api/cars?populate=*");
      setCars(response.data.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDeleteCar = async (documentId) => {
    try {
      await axios.delete(`http://34.38.235.50:1337/api/cars/${documentId}`);
      alert("Car Deleted Successfully.");
      fetchCars(); 
    } catch (error) {
      console.error("Error deleting car:", error);
      alert("Failed to delete the car. Please try again.");
    }
  };

  return (
    <Card>
      <CardBody>
        <CardTitle>All Cars</CardTitle>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Brand</th>
              <th>Model</th>
              <th>Year</th>
              <th>Price</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>{car.Brand}</td>
                <td>{car.Model || "N/A"}</td>
                <td>{car.Year}</td>
                <td>{car.Price}</td>
                <td>{car.Description || "N/A"}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteCar(car.documentId)} 
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button onClick={onBackToMenu}>Back To Main Menu</Button>
      </CardBody>
    </Card>
  );
}

export default DeleteCar;
