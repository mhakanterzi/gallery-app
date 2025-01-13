import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardTitle } from "react-bootstrap";
import axios from "axios";

function TestDriveRequests({ onBackToMenu }) {
  const [testDriveRequests, setTestDriveRequests] = useState([]);

  useEffect(() => {
    const fetchTestDriveRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/bookings?populate=*"
        );
        // Yalnızca "Pending" durumunda olanları filtreliyoruz
        const pendingRequests = response.data.data.filter(
          (request) => request.book_status === "Pending"
        );
        setTestDriveRequests(pendingRequests || []);
      } catch (error) {
        console.error("Error fetching test drive requests:", error);
        alert("Failed to fetch test drive requests.");
      }
    };

    fetchTestDriveRequests();
  }, []);

  const handleAcceptRequest = async (documentId) => {
    try {
      await axios.put(
        `http://localhost:1337/api/bookings/${documentId}`,
        {
          data: { book_status: "Accepted" },
        }
      );

      alert("Test drive request accepted!");
      // Kabul edilen talebi listeden çıkarıyoruz
      setTestDriveRequests((prev) =>
        prev.filter((request) => request.documentId !== documentId)
      );
    } catch (error) {
      console.error("Error accepting test drive request:", error);
      alert("Failed to accept the test drive request.");
    }
  };

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
          Test Drive Requests
        </CardTitle>
        {testDriveRequests.length === 0 ? (
          <p style={{ textAlign: "center" }}>No pending test drive requests available.</p>
        ) : (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {testDriveRequests.map((request) => {
              const user = request?.users_permissions_user || {};
              const car = request?.car || {};
              return (
                <li key={request.id} style={{ marginBottom: "10px" }}>
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
                    <Button
                      variant="success"
                      onClick={() => handleAcceptRequest(request.documentId)}
                    >
                      Accept
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <Button onClick={onBackToMenu}>Back To Main Menu</Button>
      </CardBody>
    </Card>
  );
}

export default TestDriveRequests;