import React,{useState} from "react";
import{ Button, Card, CardBody, CardTitle, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import axios from "axios";

function Service({onBackToMenu}){
    const[Brand, setBrand] = useState('');
    const[AboutCar, setAboutCar] = useState('')
    const [request_date, setRequest_Date] =useState(0);

    const handleAddCar= async(e)=>{
        const userId = localStorage.getItem("userId");
        e.preventDefault();

        const CarData = {
            data: {
            Brand,
            AboutCar,
            request_date,
            request_status:'Pending',
            users_permissions_user: userId,
            }
        };

        try {
            await axios.post('http://34.38.235.50:1337/api/service-requests', CarData)
            alert('Car Added Succesfult...')
        } catch (error) {
            alert('Error. Please Check İnformations.')
        }
    }
    return(
        <Card>
            <CardBody>
                <CardTitle>Add Car Menu</CardTitle>
                <Form onSubmit={handleAddCar}>
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
                        <FormLabel>Maintenance Type</FormLabel>
                        <FormControl
                        type="text"
                        value={AboutCar}
                        onChange={(e)=> setAboutCar(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup controlId="Year">
                        <FormLabel>Year</FormLabel>
                        <FormControl
                        type="date"
                        value={request_date}
                        onChange={(e)=> setRequest_Date(e.target.value)}
                        />
                    </FormGroup>
                    <div className="button-Menu" style={{ marginTop: '20px' }}>
                    <Button type="submit">Add Car</Button>
                    <Button onClick={onBackToMenu}>Return The Menu</Button>
                    </div>
                </Form>
            </CardBody>
        </Card>
    )
}

export default Service;