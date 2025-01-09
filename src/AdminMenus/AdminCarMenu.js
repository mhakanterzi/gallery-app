import React, {useState} from "react";
import { Button, Card, CardBody, CardTitle } from 'react-bootstrap';

function AdminCarMenu({onBackToMenu}){

    return(
        <Card>
            <CardBody>
                <CardTitle>Admin Car Menu</CardTitle>
                <div className="button-Menu">
                    <Button>Add Car</Button>
                    <Button>Edit Car</Button>
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