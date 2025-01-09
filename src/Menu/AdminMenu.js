import React,{useState} from "react";
import { Card, CardBody, CardTitle,Button } from 'react-bootstrap'

function AdminMenu(){

    return(
        <Card className="mb-3">
        <Card.Body>
          <Card.Title>Main Menu</Card.Title>
          <div className="button-Menu">
            <Button >
              Cars Menu
            </Button>
            <Button >
              Stok Güncelleme
            </Button>
          </div>
          <div className="button-Menu">
            <Button>
              Talepler
            </Button>
            <Button >
              Servis işlemleri
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
}

export default AdminMenu;