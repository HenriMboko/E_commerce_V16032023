import React,{useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import {Form, Button, Row, Col, Container} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {createUser} from "../features/auth/authSlice"
import {toast} from "react-toastify"
import {useDispatch, useSelector} from "react-redux"

function RegisterPage() {

const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
})

const dispatch = useDispatch()
const navigate = useNavigate()

const {user, isError, isSuccess, message} =
 useSelector((state) =>state.auth)


const {name, email, password} = formData


const handleChange = (ev) =>{
  setFormData({...formData, [ev.target.name]:ev.target.value})
}


const onSubmit = (ev) =>{

ev.preventDefault()

dispatch(createUser(formData))

}


useEffect(() => {

  if(isError){
    toast.error(message)
  }

  if(isSuccess || user){
    toast.success("user create ")
    navigate('/')
  }
 
}, [isError,navigate, user, message, dispatch, isSuccess])





  return (
    <>
      <Container>
        <Row className='justify-content-md-center py-3'>
          <Col xs={12} md={6}>
            <h1>Sign In</h1>
          
            <Form onSubmit={onSubmit}>

            <Form.Group controlId='name'>
                <Form.Label>Name </Form.Label>
                <Form.Control 
                  type="name"
                  placeholder='Enter your name'
                  name = 'name'
                  value={name}
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                  type="email"
                  placeholder='Enter your Email'
                  name = 'email'
                  value={email}
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>

              <Form.Group className='py-3' controlId='password'>
                <Form.Label>Password Address</Form.Label>
                <Form.Control 
                    type="password"
                    name = 'password'
                  placeholder='Enter your Password'
                  value={password}
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>

              <Button  type='submit' variant='primary' >
                Sign In
              </Button>

              <Row className='py-3'>
                <Col>
                New Customer <Link to="/register">Create a New User</Link></Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default RegisterPage