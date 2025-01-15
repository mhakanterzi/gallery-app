import React,{useState} from "react";
import{ Button, Card, CardBody, CardTitle, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import axios from "axios";

function AddCar({onBackToMenu}){
    const[Brand, setBrand] = useState('');
    const[Model, setModel] = useState('')
    const [Year, setYear] =useState(0);
    const [Price, setPrice] =useState(0)
    const[Description, setDescription]= useState('');
    const [Stock, setStock]= useState('');

    const handleAddCar= async(e)=>{
        e.preventDefault();

        const CarData = {
            data: {
            Brand,
            Model,
            Year,
            Price,
            Description,
            Stock
            }
        };

        try {
            const response =await axios.post('http://34.38.235.50:1337/api/cars', CarData)
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
                        <FormLabel>Model</FormLabel>
                        <FormControl
                        type="text"
                        value={Model}
                        onChange={(e)=> setModel(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup controlId="Year">
                        <FormLabel>Year</FormLabel>
                        <FormControl
                        type="number"
                        value={Year}
                        onChange={(e)=> setYear(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup controlId="Price">
                        <FormLabel>Price</FormLabel>
                        <FormControl
                        type="number"
                        value={Price}
                        onChange={(e)=> setPrice(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup controlId="Description">
                        <FormLabel>Description</FormLabel>
                        <FormControl
                        type="text"
                        value={Description}
                        onChange={(e)=> setDescription(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup controlId="Stock">
                        <FormLabel>Stock</FormLabel>
                        <FormControl
                        type="text"
                        value={Stock}
                        onChange={(e)=> setStock(e.target.value)}
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

export default AddCar;