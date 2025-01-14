import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

function AboutServices({ onBackToMenu }) {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            const userId = localStorage.getItem("userId");

            try {
                const response = await axios.get(
                    `http://localhost:1337/api/service-requests?populate=*&filters[users_permissions_user][id][$eq]=${userId}`
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
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button onClick={onBackToMenu}>Return to Menu</Button>
        </div>
    );
}

export default AboutServices;
