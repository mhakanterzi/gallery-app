import React, { useState } from 'react';
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import MainMenu from './Menu/MainMenu';
import AdminMenu from './Menu/AdminMenu'
import { Container, Navbar, Nav, Button, NavbarBrand, NavbarText } from 'react-bootstrap';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[isAdmin, SetIsAdmin]= useState(false);
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  const LogOut =()=>{
    setIsLoggedIn(false);
    SetIsAdmin(false)
  }

  return (
    <Container className="App">
      <Navbar bg="dark" variant="dark">
        <NavbarBrand href="#home"></NavbarBrand>
        <Nav >
          {isLoggedIn ? (
            <>
              <NavbarText>Signed in as: {user}</NavbarText>
              <Button variant="outline-light" onClick={LogOut}>Logout</Button>
              <Button variant='outline-light'>Settings</Button>
            </>
          ) : null}
        </Nav>
      </Navbar>
      <div className="mt-5">
        {!isLoggedIn ? (
          <>
            {showRegister ? (
              <Register setShowRegister={setShowRegister} />
            ) : (
              <>
                <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} setIsAdmin={SetIsAdmin} />
              </> 
            )}
          </>
        ) : (
          isAdmin ? (
            <AdminMenu />
          ) : (
            <MainMenu />
          )
        )}
      </div>
    </Container>
  );
}

export default App;
