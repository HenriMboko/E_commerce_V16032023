import React from 'react'
import { Container,Nav, Navbar } from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"
import {logout, reset} from "../features/auth/authSlice"
import { useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
//import {Button} from "react-bootstrap"





function Headers() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
const {user} = useSelector((state) => state.auth) 

const handleClick = () =>{

  dispatch(reset())
  dispatch(logout())
  navigate("/")
}



  return (

    
    <header>
      <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
        <Navbar.Brand>ProShop</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <LinkContainer to="/cart">
            <Nav.Link>
              <i className='fas fa-shopping-cart'></i>Cart
              </Nav.Link>
            </LinkContainer>

            {
              user ? (
                <LinkContainer onClick={handleClick} to="/">
                <Nav.Link>
                  <i className='fas fa-user'></i>Logout 
                  </Nav.Link>
                </LinkContainer>
              ) : (
               <>
                 <LinkContainer to="/login">
                <Nav.Link>
                  <i className='fas fa-user'></i>Sign In
                  </Nav.Link>
                </LinkContainer>

                <LinkContainer to="/register">
                <Nav.Link>
                  <i className='fas fa-user'></i>Sign Up
                  </Nav.Link>
                </LinkContainer>
               </>
              )
            }

          </Nav>
        </Navbar.Collapse>





      </Container>

    </Navbar>
  </header>
    
    
  
  )
}

export default Headers