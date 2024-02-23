import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import MainComponent from '../../components/MainComponent'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../store/slices/userSlice'
// import { registerAction } from '../../redux/actions/userActions'

const Register = () => {
    const dispatch = useDispatch()
const navigate =     useNavigate()
    const{userInfo,error} = useSelector(state => state.userLogin) 
    const [registerData, setregisterData] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
        pic: "https://images.unsplash.com/photo-1527960669566-f882ba85a4c6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    })
    const [message, setmessage] = useState(null)
    const [picMessage, setpicMessage] = useState(null)
 
    const [loading, setloading] = useState(false)

    const handleRegister = async (e) => {
        e.preventDefault()
        if (registerData.password !== registerData.cpassword) {
            setmessage('passwords do not match !')
        } else {
           dispatch(registerUser(registerData))

        }
    }
 
    useEffect(() => {
      
    if(userInfo){
        navigate('/my_notes')
    }

    }, [userInfo])
    
    

    const postDetails = (pics) => {

        if (!pics) {
            setpicMessage("please select an image")
        }
        setpicMessage(null)

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData()
            data.append('file', pics)
            data.append('upload_preset', 'my_notes')
            data.append('cloude_name', 'dnv9h0dxg')

            fetch('https://api.cloudinary.com/v1_1/dnv9h0dxg/image/upload', {
                method: 'post',
                body: data
            }).then((res) => res.json()).then(data => {
                // console.log(data)
                setregisterData({ ...registerData, pic: data.url.toString() })
            }).catch(err => console.log(err))
        } else {
            setpicMessage("please select an image")
        }

    }
    return (
        <MainComponent title="Register">
            <Container>
                {message && <Alert variant='danger'>{message}</Alert>}
                {picMessage && <Alert variant='danger'>{picMessage}</Alert>}
                {error && <Alert variant='danger'>{error}</Alert>}

                <Form onSubmit={handleRegister}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Name </Form.Label>
                        <Form.Control
                        className='bg-blurr'
                            value={registerData.name}
                            onChange={e => setregisterData({ ...registerData, name: e.target.value })}
                            type="name"
                            placeholder="name"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Email </Form.Label>
                        <Form.Control
                        className='bg-blurr'
                            value={registerData.email}
                            onChange={e => setregisterData({ ...registerData, email: e.target.value })}
                            type="email"
                            placeholder="name@example.com"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Password </Form.Label>
                        <Form.Control
                        className='bg-blurr'
                            value={registerData.password}
                            onChange={e => setregisterData({ ...registerData, password: e.target.value })}
                            type="password"
                            placeholder="123"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Confirm Password </Form.Label>
                        <Form.Control
                        className='bg-blurr'
                            value={registerData.cpassword}
                            onChange={e => setregisterData({ ...registerData, cpassword: e.target.value })}
                            type="password"
                            placeholder="Enter same password"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 " >
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control
                        className='bg-blurr'

                            onChange={e => postDetails(e.target.files[0])}
                            type="file"
                            label='Upload a profile pic'
                        />
                    </Form.Group>
                    <Button type="submit" className='backgroundAnimation border-0'>{
                        loading
                            ? <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            : "Register"
                    }
                    </Button>
                    <Row className='py-2'>
                        <Col>
                            Allready have an Account . <Link to='/login'>Login</Link>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </MainComponent>
    )
}

export default Register