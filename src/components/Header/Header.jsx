import React from 'react'
import './header.css'
import { Button, Container, Form, Image, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logOut } from '../../store/slices/userSlice'




export default function Header() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userInfo } = useSelector(state => state.userLogin)
    const handleLogout = () => {
        dispatch(logOut())
        navigate('/')
    }

    return (
        <Navbar sticky="top" expand="lg" bg=" shadow" data-bs-theme="light" className='backgroundAnimation'  >
            <Container >
                <Navbar.Brand href='/' >

                    <Link to='/' className='text-light text-decoration-none'> My-Notes</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className='m-auto'>
                        {/* {JSON.stringify(userInfo)} */}
                    </Nav>
                    <Nav
                        className=" my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link >
                         {userInfo.name &&    <Link to='/my_notes' className='text-light text-decoration-none '>
                                My notes
                            </Link>
}
                        </Nav.Link>

                        {
                            userInfo?.name && <NavDropdown 

                                title={<Image className='p-0 m-0' src={`${userInfo.pic}`} roundedCircle={true} width={30} height={30} ></Image>
                                } drop='start' id="navbarScrollingDropdown" className='navbar-text-white p-0 m-0   '>
                                <NavDropdown.Item className='bg-transparent'   onClick={()=>{navigate('/profile')}}>My profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item className='text-danger bg-transparent' onClick={handleLogout}>
                                    Log Out
                                </NavDropdown.Item>
                               
                            </NavDropdown>
                        }
                        {/* <Image src={`${userInfo.pic}`} roundedCircle={true} width={50} height={40}></Image> */}


                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
