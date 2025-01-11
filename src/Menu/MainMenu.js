import React,{useState} from "react";
import { Card, CardBody, CardTitle,Button } from 'react-bootstrap'
import ListCars from "../UserMenu/ListCars";

function MainMenu(){
  const [ListCar, setListCar]= useState(false);

  const handleListCar =()=>{
    setListCar(true)
  }
  const handleBackListCar =()=>{
    setListCar(false)
  }
  if(ListCar){
      return <ListCars onBackToMenu={handleBackListCar}/>
  }

    return(
        <Card>
        <Card.Body>
          <Card.Title>Main Menu</Card.Title>
          <div className="button-Menu">
            <Button onClick={handleListCar}>
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