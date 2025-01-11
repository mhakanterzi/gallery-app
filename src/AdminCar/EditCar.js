import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Table, Button, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import axios from "axios";

function EditCar({onBackToMenu}) {
    const [cars, setCars] = useState([]); 
    const [selectedCar, setSelectedCar] = useState(null); 
    const [Brand, setBrand] = useState('');
    const [Model, setModel] = useState('');
    const [Year, setYear] = useState('');
    const [Price, setPrice] = useState('');
    const [Description, setDescription] = useState('');


    const fetchCars = async () => {
            const response = await axios.get(`http://localhost:1337/api/cars`);
            setCars(response.data.data);
    }

    useEffect(() => {
        fetchCars();
    }, []);

    const handleUpdate = (car) => {
        setSelectedCar(car);
        setBrand(car.Brand);
        setModel(car.Model || '');
        setYear(car.Year);
        setPrice(car.Price);
        setDescription(car.Description || '');
    };

    const handleCancelUpdate = () => {
        setSelectedCar(null);
        setBrand('');
        setModel('');
        setYear('');
        setPrice('');
        setDescription('');
    };

    const handleUpdateCar = async (e) => {
        e.preventDefault();
        if (!selectedCar) return; 

        const updatedCarData = {
            data: {
                Brand,
                Model,
                Year: parseInt(Year),
                Price: parseFloat(Price),
                Description,
            },
        };

            await axios.put(`http://localhost:1337/api/cars/${selectedCar.documentId}`, updatedCarData);
            alert("Car Updated Succesfuly.");
            fetchCars(); 
            handleCancelUpdate(); 
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
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map((car) => (
                            <tr key={car.documentId}>
                                <td>{car.Brand}</td>
                                <td>{car.Model || 'N/A'}</td>
                                <td>{car.Year}</td>
                                <td>{car.Price}</td>
                                <td>{car.Description || 'N/A'}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        onClick={() => handleUpdate(car)}
                                        style={{ marginRight: "5px" }}
                                    >
                                        Update
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Button onClick={onBackToMenu}>Back To Main Menu</Button>
            </CardBody>
            {selectedCar && (
                <CardBody>
                    <CardTitle>Updating Car</CardTitle>
                    <Form onSubmit={handleUpdateCar}>
                        <FormGroup controlId="Brand">
                            <FormLabel>Brand</FormLabel>
                            <FormControl
                                type="text"
                                value={Brand}
                                onChange={(e) => setBrand(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <FormGroup controlId="Model">
                            <FormLabel>Model</FormLabel>
                            <FormControl
                                type="text"
                                value={Model}
                                onChange={(e) => setModel(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup controlId="Year">
                            <FormLabel>Year</FormLabel>
                            <FormControl
                                type="number"
                                value={Year}
                                onChange={(e) => setYear(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup controlId="Price">
                            <FormLabel>Price</FormLabel>
                            <FormControl
                                type="number"
                                value={Price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup controlId="Description">
                            <FormLabel>Description</FormLabel>
                            <FormControl
                                type="text"
                                value={Description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormGroup>
                        <div className="button-Menu" style={{ marginTop: "20px" }}>
                            <Button
                                type="submit"
                                variant="success"
                                style={{ marginRight: "10px" }}
                            >Update
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={handleCancelUpdate}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </CardBody>
            )}
        </Card>
    );
}

export default EditCar;
