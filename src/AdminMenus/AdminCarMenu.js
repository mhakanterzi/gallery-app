import React, {useState} from "react";
import { Button, Card, CardBody, CardTitle } from 'react-bootstrap';
import AddCar from '../AdminCar/AddCar'
import EditCar from "../AdminCar/EditCar";
import DeleteCar from "../AdminCar/DeleteCar";

function AdminCarMenu({onBackToMenu}){
    const[Addcar, setAddCar]=useState(false)
    const [editCar, setEditCar]= useState(false);
    const[deleteCar, setDeleteCar] = useState(false)

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
    const handleDeleteCAr=()=>{
        setDeleteCar(true)
    }
    const handleDeleteback=()=>{
        setDeleteCar(false)
    }
    if(deleteCar){
        return <DeleteCar onBackToMenu={handleDeleteback}/>
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
                    <Button onClick={handleDeleteCAr}>Delete Car</Button>
                    <Button onClick={onBackToMenu}>Back To Admin Menu</Button>
                </div>
            </CardBody>
        </Card>
    );
}

export default AdminCarMenu;