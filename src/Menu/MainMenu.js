import React,{useState} from "react";
import { Card, CardBody, CardTitle,Button } from 'react-bootstrap'

function MainMenu(){

    return(
        <Card>
        <Card.Body>
          <Card.Title>Main Menu</Card.Title>
          <div className="button-Menu">
            <Button >
              List Cars
            </Button>
            <Button >
              Favorites
            </Button>
          </div>
          <div className="button-Menu">
            <Button>
              Services
            </Button>
            <Button >
              About
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
}

export default MainMenu;