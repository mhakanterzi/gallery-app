import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardTitle, Table } from "react-bootstrap";
import axios from "axios";

function ListCars({onBackToMenu}){
    const [cars, setcars]=useState([])

    useEffect(()=>{
        const listCar =async()=>{
            const response = await axios.get('http://localhost:1337/api/cars');
            setcars(response.data.data);
        } 
        listCar();
    },[])

    return(
        <Card>
        <CardBody>
            <CardTitle>All Cars</CardTitle>
            <div style={{display:'flex', justifyContent :'space-between', marginBottom:'10px'}}>
                    <div style={{display:'flex', justifyContent :'space-between', alignItems:'center'}}>Brand</div>
                    <div style={{display:'flex', justifyContent :'space-between', alignItems:'center'}}>Model</div>
                    <div style={{display:'flex', justifyContent :'space-between', alignItems:'center'}}>Year</div>
                    <div style={{display:'flex', justifyContent :'space-between', alignItems:'center'}}>Description</div>
                    <div style={{display:'flex', justifyContent :'space-between', alignItems:'center'}}>Stock</div>
                    <div style={{display:'flex', justifyContent :'space-between', alignItems:'center'}}>Price</div>
                </div>
                <ul style={{listStyleType: 'none', padding :0}}>
                {cars.map((cars) => (
                    <li key={cars.documentId}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div  style={{ flex: 1, textAlign: 'center' }}>{cars.Brand}</div>
                            <div  style={{ flex: 1, textAlign: 'center' }}>{cars.Model}</div>
                            <div  style={{ flex: 1, textAlign: 'center' }}>{cars.Year}</div>
                            <div  style={{ flex: 1, textAlign: 'center' }}>{cars.Description}</div>
                            <div  style={{ flex: 1, textAlign: 'center' }}>{cars.Stock}</div>
                            <div  style={{ flex: 1, textAlign: 'center' }}>{cars.Price}</div>
                            </div>
                    </li>
                    ))}
                </ul>
            <Button onClick={onBackToMenu}>Back To Main Menu</Button>
        </CardBody>
        </Card>
    )
}

export default ListCars;