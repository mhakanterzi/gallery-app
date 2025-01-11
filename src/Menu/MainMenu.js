import React,{useState} from "react";
import { Card, CardBody, CardTitle,Button } from 'react-bootstrap'
import ListCars from "../UserMenu/ListCars";
import ListFavorites from '../UserMenu/ListFavorites'

function MainMenu(){
  const [ListCar, setListCar]= useState(false);
  const[ListFavorite, setListFavorite] =useState(false)

  const handleListCar =()=>{
    setListCar(true)
  }
  const handleBackListCar =()=>{
    setListCar(false)
  }
  if(ListCar){
      return <ListCars onBackToMenu={handleBackListCar}/>
  }

  const handleListFavorite=()=>{
    setListFavorite(true)
  }
  const handleBackFavorites=()=>{
    setListFavorite(false)
  }
  if(ListFavorite){
    return <ListFavorites onBackToMenu={handleBackFavorites}/>
  }

    return(
        <Card>
        <Card.Body>
          <Card.Title>Main Menu</Card.Title>
          <div className="button-Menu">
            <Button onClick={handleListCar}>
              List Cars
            </Button>
            <Button onClick={handleListFavorite}>
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