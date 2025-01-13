import React,{useState} from "react";
import { Button, Card, CardBody, CardTitle } from 'react-bootstrap';
import TestDriveRequests from "../Requests/TestDriveRequests";

function RequestMenu({onBackToMenu}){
    const[testCar, setTestCar] = useState(false)

    const testCarOpen=()=>{
        setTestCar(true)
    }
    const testCarClose=()=>{
        setTestCar(false)
    }
    if(testCar){
        return <TestDriveRequests onBackToMenu={testCarClose}/>
    }

    return(
        <Card>
            <CardBody>
                <CardTitle>RequestMenu</CardTitle>
                <div className="button-Menu">
                    <Button onClick={testCarOpen}>Test Drive Request</Button>
                    <Button>Service Request</Button>
                </div>
                <div className="button-Menu">
                    <Button>Service Operations</Button>
                    <Button onClick={onBackToMenu}>Back To Admin Menu</Button>
                </div>
            </CardBody>
        </Card>
    );
}

export default RequestMenu;