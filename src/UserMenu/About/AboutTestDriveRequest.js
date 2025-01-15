import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardTitle } from "react-bootstrap";
import axios from "axios";

function UserCars({ onBackToMenu }) {
  const [userCars, setUserCars] = useState([]);

  useEffect(() => {
    const fetchUserCars = async () => {
      try {
        const userId = localStorage.getItem("userId");

        const response = await axios.get(
          `http://34.38.235.50:1337/api/bookings?populate=car&filters[users_permissions_user][id][$eq]=${userId}`
        );

        setUserCars(response.data.data);
      } catch (error) {
        console.error("Error fetching user cars:", error);
        alert("Failed to fetch user cars.");
      }
    };

    fetchUserCars();
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
          Your Cars
        </CardTitle>
        {userCars.length === 0 ? (
          <p style={{ textAlign: "center" }}>No cars available for you.</p>
        ) : (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {userCars.map((booking) => (
              <li key={booking.id} style={{ marginBottom: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <strong>Car:</strong> {booking.car.Brand || "Unknown Brand"} {booking.car.Model || ""}
                  </div>
                  <div>
                    <strong>Year:</strong> {booking.car.Year || "Unknown Year"}
                  </div>
                  <div>
                    <strong>Price:</strong> {booking.car.Price || "Unknown Price"}
                  </div>
                  <div>
                    <strong>Status:</strong> {booking.book_status || "Unknown"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <Button onClick={onBackToMenu}>Back To Main Menu</Button>
      </CardBody>
    </Card>
  );
}

export default UserCars;
