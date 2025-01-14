import React,{useState} from "react";
import { Card, CardBody, CardTitle,Button } from 'react-bootstrap'
import ListCars from "../UserMenu/ListCars";
import ListFavorites from '../UserMenu/ListFavorites'
import Services from "../UserMenu/Service";

function MainMenu(){
  const [ListCar, setListCar]= useState(false);
  const[ListFavorite, setListFavorite] =useState(false)
  const[ListServices, setServices] = useState(false)

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

  const handleListService=()=>{
    setServices(true)
  }
  const ListBack=()=>{
    setServices(false)
  }
  if(ListServices){
    return <Services onBackToMenu={ListBack}/>
  }

    return(
        <Card>
        <CardBody>
          <CardTitle>Main Menu</CardTitle>
          <div className="button-Menu">
            <Button onClick={handleListCar}>
              List Cars
            </Button>
            <Button onClick={handleListFavorite}>
              Favorites
            </Button>
          </div>
          <div className="button-Menu">
            <Button onClick={handleListService}>
              Services
            </Button>
            <Button >
              About
            </Button>
          </div>
        </CardBody>
      </Card>
    );
}

export default MainMenu;