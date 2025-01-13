import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, CardTitle, Form } from "react-bootstrap";
import axios from "axios";

function StockRequest({ onBackToMenu }) {
  const [stockRequests, setStockRequests] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [newStock, setNewStock] = useState("");

  useEffect(() => {
    const fetchStockRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/car-requests?populate=*"
        );
        setStockRequests(response.data.data || []);
      } catch (error) {
        console.error("Error fetching stock requests:", error);
        alert("Failed to fetch stock requests.");
      }
    };
    fetchStockRequests();
  }, []);

  const handleUpdateStock = async () => {
    if (!selectedCar || !newStock) return;

    try {
      await axios.put(
        `http://localhost:1337/api/cars/${selectedCar.car.documentId}`,
        {
          data: { Stock: newStock },
        }
      );

      await axios.delete(
        `http://localhost:1337/api/car-requests/${selectedCar.documentId}`
      );

      alert("Stock successfully updated!");

      setStockRequests((prev) =>
        prev.filter((request) => request.documentId !== selectedCar.documentId)
      );

      setSelectedCar(null);
      setNewStock("");
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("Failed to update stock.");
    }
  };

  return (
    <Card style={{ width: "90%", maxWidth: "50%", margin: "auto", marginTop: "20px" }}>
      <CardBody>
        <CardTitle style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold" }}>
          Stock Requests
        </CardTitle>
        {stockRequests.length === 0 ? (
          <p style={{ textAlign: "center" }}>No stock requests available.</p>
        ) : (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {stockRequests.map((request) => {
              const user = request?.users_permissions_user || {};
              const car = request?.car || {};
              return (
                <li key={request.documentId} style={{ marginBottom: "10px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      User: {user?.username || "Unknown User"}
                    </div>
                    <div>
                      Car: {car?.Brand || "Unknown Brand"} {car?.Model || ""}
                    </div>
                    <Button variant="success" onClick={() => setSelectedCar(request)}>
                      Update Stock
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <Button onClick={onBackToMenu}>Back To Main Menu</Button>
      </CardBody>

      {selectedCar && (
        <Card style={{ marginTop: "20px", padding: "15px" }}>
          <CardBody>
            <CardTitle>Update Stock for {selectedCar.car.Brand} {selectedCar.car.Model}</CardTitle>
            <Form>
              <Form.Group controlId="newStock">
                <Form.Label>Enter New Stock Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={newStock}
                  onChange={(e) => setNewStock(e.target.value)}
                  placeholder="Enter stock quantity"
                  required
                />
              </Form.Group>
              <div style={{ marginTop: "10px" }}>
                <Button variant="secondary" onClick={() => setSelectedCar(null)}>
                  Cancel
                </Button>
                <Button variant="success" onClick={handleUpdateStock} style={{ marginLeft: "10px" }}>
                  Update Stock
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      )}
    </Card>
  );
}

export default StockRequest;
