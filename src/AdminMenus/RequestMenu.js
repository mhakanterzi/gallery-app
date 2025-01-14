import React,{useState} from "react";
import { Button, Card, CardBody, CardTitle } from 'react-bootstrap';
import TestDriveRequests from "../Requests/TestDriveRequests";
import ServiceRequests from "../Requests/ServiceRequests";
import ListServices from "../Requests/ListServices";

function RequestMenu({onBackToMenu}){
    const[testCar, setTestCar] = useState(false)
    const[serviceRequests, setServiceRequests] = useState(false)
    const[ListAllServices, setListServices]=useState(false)

    const testCarOpen=()=>{
        setTestCar(true)
    }
    const testCarClose=()=>{
        setTestCar(false)
    }
    if(testCar){
        return <TestDriveRequests onBackToMenu={testCarClose}/>
    }

    const handleServiceRequest=()=>{
        setServiceRequests(true)
    }
    const BackServiceRequest=()=>{
        setServiceRequests(false)
    }
    if(serviceRequests){
       return <ServiceRequests onBackToMenu={BackServiceRequest}/>
    }

    const handleAllServices=()=>{
        setListServices(true)
      }
      const AllServicesBack=()=>{
        setListServices(false)
      }
      if(ListAllServices){
        return <ListServices onBackToMenu={AllServicesBack}/>
      }

    return(
        <Card>
            <CardBody>
                <CardTitle>RequestMenu</CardTitle>
                <div className="button-Menu">
                    <Button onClick={testCarOpen}>Test Drive Request</Button>
                    <Button onClick={handleServiceRequest}>Service Request</Button>
                </div>
                <div className="button-Menu">
                    <Button onClick={handleAllServices}>Service Operations</Button>
                    <Button onClick={onBackToMenu}>Back To Admin Menu</Button>
                </div>
            </CardBody>
        </Card>
    );
}

export default RequestMenu;