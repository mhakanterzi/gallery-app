import React, {useState} from "react";
import { Button, Card, CardBody, CardTitle } from 'react-bootstrap';
import AddCar from '../AdminCar/AddCar'
import EditCar from "../AdminCar/EditCar";

function AdminCarMenu({onBackToMenu}){
    const[Addcar, setAddCar]=useState(false)
    const [editCar, setEditCar]= useState(false);

    const handleAddCar =()=>{
        setAddCar(true)
    }
    const backAddCar =()=>{
        setAddCar(false)
    }
    if(Addcar){
        return <AddCar onBackToMenu={backAddCar}/>
    }

    const handleEditCar=( ) =>{
        setEditCar(true)
    };
    const backEditCar=()=>{
        setEditCar(false)
    }
    if(editCar){
        return <EditCar onBackToMenu={backEditCar}/>
    }

    return(
        <Card>
            <CardBody>
                <CardTitle>Admin Car Menu</CardTitle>
                <div className="button-Menu">
                    <Button onClick={handleAddCar}>Add Car</Button>
                    <Button onClick={handleEditCar}>Edit Car</Button>
                </div>
                <div className="button-Menu">
                    <Button>Delete Car</Button>
                    <Button onClick={onBackToMenu}>Back To Admin Menu</Button>
                </div>
            </CardBody>
        </Card>
    );
}

export default AdminCarMenu;