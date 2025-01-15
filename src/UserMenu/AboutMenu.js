import React,{useState} from "react";
import { Button, Card, CardBody, CardTitle } from 'react-bootstrap';
import AboutServices from "./About/AboutServices";
import AboutStockRequest from "./About/AboutStockRequest";
import AboutTestDriveRequest from './About/AboutTestDriveRequest'

function RequestMenu({onBackToMenu}){
    const[ServicesAbout, setServicesAbout] = useState(false)
    const[StockRequest, setStockRequest] = useState(false)
    const[TestDriveRequest, setTestDriveRequest] = useState(false)


    const servicesOpen=()=>{
        setServicesAbout(true)
    }
    const servicesClose=()=>{
        setServicesAbout(false)
    }
    if(ServicesAbout){
        return <AboutServices onBackToMenu={servicesClose}/>
    }

    const handleStockRequest=()=>{
        setStockRequest(true)
    }
    const BackStockRequest=()=>{
        setStockRequest(false)
    }
    if(StockRequest){
       return <AboutStockRequest onBackToMenu={BackStockRequest}/>
    }

    const TestDriveOpen=()=>{
        setTestDriveRequest(true)
    }
    const TestDriveClose=()=>{
        setTestDriveRequest(false)
    }
    if(TestDriveRequest){
        return <AboutTestDriveRequest onBackToMenu={TestDriveClose}/>
    }


    return(
        <Card>
            <CardBody>
                <CardTitle>RequestMenu</CardTitle>
                <div className="button-Menu">
                    <Button onClick={servicesOpen}>Service Request</Button>
                    <Button onClick={handleStockRequest}>Stock Request</Button>
                </div>
                <div className="button-Menu">
                    <Button onClick={TestDriveOpen} >Test Drive Request</Button>
                    <Button onClick={onBackToMenu} >Back To Admin Menu</Button>
                </div>
            </CardBody>
        </Card>
    );
}

export default RequestMenu;