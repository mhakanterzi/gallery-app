import React, { useEffect, useState } from "react";
import { Table, Button } from 'react-bootstrap';
import axios from "axios";

function ServiceRequests({ onBackToMenu }) {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://34.38.235.50:1337/api/service-requests?populate=*&filters[request_status][$eq]=Pending');
                setServices(response.data.data); 
            } catch (error) {
                console.error("Error fetching service requests:", error);
                alert('Error fetching service requests.');
            }
        };

        fetchServices();
    }, []);

    const handleUpdateStatus = async (documentId) => {
        try {
            await axios.put(`http://34.38.235.50:1337/api/service-requests/${documentId}`, {
                data: {
                    request_status: "Progress",
                },
            });
            alert("Request Approved Successfully!");

            setServices((prevServices) =>
                prevServices.filter((service) => service.documentId !== documentId)
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
                        <th>Maintenance Type</th>
                        <th>Request Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service) => (
                        <tr key={service.id}>
                            <td>{service.users_permissions_user.username}</td>
                            <td>{service.Brand}</td>
                            <td>{service.AboutCar}</td>
                            <td>{service.request_date}</td>
                            <td>{service.request_status || "Pending"}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => handleUpdateStatus(service.documentId)}
                                >
                                    Mark as In Progress
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

export default ServiceRequests;
