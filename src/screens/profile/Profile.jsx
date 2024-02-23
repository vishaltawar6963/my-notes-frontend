import React, { useEffect, useState } from 'react'
import MainComponent from '../../components/MainComponent'
import { Alert, Button, Col, Container, Form, Image, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser, updateUser } from '../../store/slices/userSlice'

const Profile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userInfo, error, loading } = useSelector(state => state.userLogin)
    const [updateUserData, setupdateUserData] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
        pic: "https://images.unsplash.com/photo-1527960669566-f882ba85a4c6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    })

    const [message, setmessage] = useState(null)
    const [picMessage, setpicMessage] = useState(null)
    const [picLoading, setpicLoading] = useState(true)


    const handleUpdateUser = async (e) => {
        const { email, name, pic, password } = updateUserData
        e.preventDefault()
        if (updateUserData.password !== updateUserData.cpassword) {
            setmessage('passwords do not match !')
        } else {
            dispatch(updateUser({ email, name, pic, password }))

        }
    }





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
            setpicLoading(false)

            fetch('https://api.cloudinary.com/v1_1/dnv9h0dxg/image/upload', {
                method: 'post',
                body: data
            }).then((res) => res.json()).then(data => {
                // console.log(data)
                setupdateUserData({ ...updateUserData, pic: data.url.toString() })
                setpicLoading(true)
            }).catch(err => console.log(err))
        } else {
            setpicMessage("please select an image")
        }

    }
    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        } else {
            setupdateUserData(userInfo)
        }


    }, [])

    return (
        <MainComponent title="Register">
            <Container>
                <Row className='flex-column-reverse flex-sm-row'>
                    <Col sm={6} >

                        {picMessage && <Alert variant='danger'>{picMessage}</Alert>}
                        {message && <Alert variant='danger'>{message}</Alert>}
                        {error && <Alert variant='danger'>{error}</Alert>}

                        <Form onSubmit={handleUpdateUser}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Name </Form.Label>
                                <Form.Control
                                    className='bg-blurr'
                                    value={updateUserData.name}
                                    onChange={e => setupdateUserData({ ...updateUserData, name: e.target.value })}
                                    type="name"
                                    placeholder="name"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Email </Form.Label>
                                <Form.Control
                                    className='bg-blurr'
                                    value={updateUserData.email}
                                    onChange={e => setupdateUserData({ ...updateUserData, email: e.target.value })}
                                    type="email"
                                    placeholder="name@example.com"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Password </Form.Label>
                                <Form.Control
                                    className='bg-blurr'
                                    value={updateUserData.password}
                                    onChange={e => setupdateUserData({ ...updateUserData, password: e.target.value })}
                                    type="password"
                                    placeholder="123"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Confirm Password </Form.Label>
                                <Form.Control
                                    className='bg-blurr'
                                    value={updateUserData.cpassword}
                                    onChange={e => setupdateUserData({ ...updateUserData, cpassword: e.target.value })}
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
                            <Button type="submit" className='bg-blurr border-0'>{
                                loading
                                    ? <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    : "Update Profile"
                            }
                            </Button>

                        </Form>
                    </Col>
                    <Col sm={6}  className=''>
                        <div className="image-container d-flex justify-content-center align-items-center" style={{ width: '100%', height: '100%' }}>
                            {
                                picLoading
                                    ? <Image className='h-50 w-50  object-fit-cover' src={updateUserData.pic} alt='image error'></Image>
                                    : <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true" />
                            }
                        </div>
                    </Col>
                </Row>

            </Container>
        </MainComponent>
    )
}

export default Profile