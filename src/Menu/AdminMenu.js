import React,{useState} from "react";
import { Card, CardBody, CardTitle,Button } from 'react-bootstrap'
import AdminCarMenu from "../AdminMenus/AdminCarMenu";
import RequestMenu from "../AdminMenus/RequestMenu";

function AdminMenu(){
    const[showCarMenu, setShowCarMenu]= useState(false)
    const[showRequestMenu, setShowRequestMenu] = useState(false)

    const HandleCarMenu =() =>{
        setShowCarMenu(true)
    }
    const handleBackCarMenu=()=>{
        setShowCarMenu(false)
    }
    if(showCarMenu){
        return <AdminCarMenu onBackToMenu={handleBackCarMenu} />;
      };

    const handleRequestMenu =()=>{
        setShowRequestMenu(true);
    }
    const requestBack=()=>{
        setShowRequestMenu(false)
    }
    if(showRequestMenu){
        return <RequestMenu onBackToMenu={requestBack}/>;
    }

    return(
        <Card>
        <Card.Body>
          <Card.Title>Main Menu</Card.Title>
          <div className="button-Menu">
            <Button onClick={HandleCarMenu}>
              Cars Menu
            </Button>
            <Button >
              Update Stock
            </Button>
          </div>
            <Button variant='primary' onClick={handleRequestMenu} style={{height:'60px', width:'160px', marginLeft:'95px' }} >
              Requests
            </Button>
        </Card.Body>
      </Card>
    );
}

export default AdminMenu;