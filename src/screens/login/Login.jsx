import React, { useState } from 'react'
import MainComponent from '../../components/MainComponent'
import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";


import { useEffect } from 'react'
import { loginhUser } from '../../store/slices/userSlice'
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { error, loading, userInfo } = useSelector(state => state.userLogin)
    console.log(userInfo)

    const [loginData, setloginData] = useState({
        email: '',
        password: '',



    })



    const handelSubmit = (e) => {
        e.preventDefault()
       
        dispatch(loginhUser(loginData))

    }

    useEffect(() => {


        if (userInfo) {
            navigate('/my_notes')
        }
    }, [userInfo])

    return (
        <MainComponent title="Login">
            <Container>
                {error && <Alert variant='danger'>
                    {error}
                </Alert>}
                <Form onSubmit={handelSubmit}>
                    <Form.Group className="mb-3 " >
                        
                        <Form.Label>Email </Form.Label>
                        <Form.Control
                            onChange={e => setloginData({ ...loginData, email: e.target.value })}
                            type="email"
                            className='bg-blurr'
                            placeholder="name@example.com"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 " >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            onChange={e => setloginData({ ...loginData, password: e.target.value })}
                            type="password"
                            className='bg-blurr'
                            placeholder="Examp213"
                        />
                    </Form.Group>
                    <Button type="submit" variant='outline-light' className='bg-blurr bg-blurr border-0'>{
                        loading
                            ? <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            : "Submit"
                    }
                    </Button>
                  
                    <Row className='py-2'>
                        <Col >
                            Dont have and account ! <Link to='/register' >Register here</Link>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </MainComponent>
    )
}

export default Login