import React,{useState} from "react";
import { Button, Card, CardBody, CardTitle } from 'react-bootstrap';

function RequestMenu({onBackToMenu}){

    return(
        <Card>
            <CardBody>
                <CardTitle>RequestMenu</CardTitle>
                <div className="button-Menu">
                    <Button>Stock Request</Button>
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