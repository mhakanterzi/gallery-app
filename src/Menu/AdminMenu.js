import React,{useState} from "react";
import { Card, CardBody, CardTitle,Button } from 'react-bootstrap'
import AdminCarMenu from "../AdminMenus/AdminCarMenu";
import RequestMenu from "../AdminMenus/RequestMenu";
import StockRequest from "../Requests/StockRequest";

function AdminMenu(){
    const[showCarMenu, setShowCarMenu]= useState(false)
    const[showRequestMenu, setShowRequestMenu] = useState(false)
    const[showStock, setShowStock]=useState(false)

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

    const handleStockMenu=()=>{
      setShowStock(true)
    }
    const handleStockBack=() =>{
      setShowStock(false)
    }
    if(showStock){
      return<StockRequest onBackToMenu={handleStockBack} />
    }

    return(
        <Card>
        <CardBody>
          <CardTitle>Main Menu</CardTitle>
          <div className="button-Menu">
            <Button onClick={HandleCarMenu}>
              Cars Menu
            </Button>
            <Button onClick={handleStockMenu}>
              Update Stock
            </Button>
          </div>
            <Button variant='primary' onClick={handleRequestMenu} style={{height:'60px', width:'160px', marginLeft:'95px' }} >
              Requests
            </Button>
        </CardBody>
      </Card>
    );
}

export default AdminMenu;