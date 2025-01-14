import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

function ListServices({ onBackToMenu }) {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:1337/api/service-requests?populate=*"
                );
                setServices(response.data.data);
            } catch (error) {
                console.error("Error fetching service requests:", error);
                alert("Error fetching service requests.");
            }
        };

        fetchServices();
    }, []);

    const handleUpdateStatus = async (documentId) => {
        try {
            await axios.put(
                `http://localhost:1337/api/service-requests/${documentId}`,
                {
                    data: {
                        request_status: "Finished",
                    },
                }
            );
            alert("Request Approved Successfully!");

            // Update the services list
            setServices((prevServices) =>
                prevServices.map((service) =>
                    service.id === documentId
                        ? { ...service, attributes: { ...service.attributes, request_status: "Finished" } }
                        : service
                )
            );
        } catch (error) {
            console.error("Error updating request status:", error);
            alert("Error updating request status.");
        }
    };

    const handleDelete = async (documentId) => {
        try {
            await axios.delete(`http://localhost:1337/api/service-requests/${documentId}`);
            alert("Request Deleted Successfully!");

            // Remove the deleted service from the list
            setServices((prevServices) =>
                prevServices.filter((service) => service.id !== documentId)
            );
        } catch (error) {
            console.error("Error deleting request:", error);
            alert("Error deleting request.");
        }
    };

    const FinishedButton = ({ request_status, service }) => {
        if (request_status === "Finished") {
            return (
                <Button variant="warning" onClick={() => handleUpdateStatus(service.documentId)}>
                    Mark as Not Finished
                </Button>
            );
        } else if (request_status === "Progress") {
            return (
                <Button variant="success" onClick={() => handleUpdateStatus(service.documentId)}>
                    Mark as Finished
                </Button>
            );
        }
        return null;
    };

    return (
        <div>
            <h2>Service Requests</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Brand</th>
                        <th>About Car</th>
                        <th>Request Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service, index) => (
                        <tr key={service.id}>
                            <td>{index + 1}</td>
                            <td>{service.Brand || "N/A"}</td>
                            <td>{service.AboutCar || "N/A"}</td>
                            <td>{service.request_date || "N/A"}</td>
                            <td>{service.request_status || "Pending"}</td>
                            <td>
                                <FinishedButton
                                    request_status={service.request_status}
                                    service={service}
                                />
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(service.documentId)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button onClick={onBackToMenu}>Return to Menu</Button>
        </div>
    );
}

export default ListServices;
