import React,{useState} from "react";
import { Button, Card, CardBody, CardTitle } from 'react-bootstrap';
import AboutServices from "./About/AboutServices";
import AboutStockRequest from "./About/AboutStockRequest";

function RequestMenu({onBackToMenu}){
    const[ServicesAbout, setServicesAbout] = useState(false)
    const[StockRequest, setStockRequest] = useState(false)

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


    return(
        <Card>
            <CardBody>
                <CardTitle>RequestMenu</CardTitle>
                <div className="button-Menu">
                    <Button onClick={servicesOpen}>Service Request</Button>
                    <Button onClick={handleStockRequest}>Stock Request</Button>
                </div>
                <div className="button-Menu">
                    <Button onClick={onBackToMenu} style={{height:'60px', width:'160px', marginLeft:'95px' }} >Back To Admin Menu</Button>
                </div>
            </CardBody>
        </Card>
    );
}

export default RequestMenu;