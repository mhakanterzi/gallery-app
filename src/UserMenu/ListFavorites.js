import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Button, Table } from "react-bootstrap";
import axios from "axios";

function ListFavorites({ onBackToMenu }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Please log in to view your favorites.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:1337/api/favorites?populate=car&filters[users_permissions_user][id][$eq]=${userId}`
        );
        setFavorites(response.data.data || []);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        alert("Failed to fetch favorites. Please try again.");
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (documentId) => {
    try {
      await axios.delete(`http://localhost:1337/api/favorites/${documentId}`);
      alert("Favorite successfully removed!");
      setFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite.documentId !== documentId)
      );
    } catch (error) {
      console.error("Error removing favorite:", error.response || error.message);
      alert("Failed to remove favorite. Please try again.");
    }
  };

  return (
    <Card style={{ width: "90%", maxWidth: "50%", margin: "auto", marginTop: "20px" }}>
      <CardBody>
        <CardTitle style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold" }}>
          My Favorite Cars
        </CardTitle>
        {favorites.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Brand</th>
                <th>Model</th>
                <th>Year</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((favorite) => {
                const car = favorite.car;
                return (
                  <tr key={favorite.id}>
                    <td>{car.Brand}</td>
                    <td>{car.Model}</td>
                    <td>{car.Year}</td>
                    <td>${car.Price}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveFavorite(favorite.documentId)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <p style={{ textAlign: "center" }}>You have no favorites yet.</p>
        )}
        <Button onClick={onBackToMenu}>Back To Main Menu</Button>
      </CardBody>
    </Card>
  );
}

export default ListFavorites;
