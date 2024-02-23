import React, { useState } from 'react'
import CreateNote from '../create-note/CreateNote'
import MainComponent from '../../components/MainComponent'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { updateNote } from '../../store/slices/noesSlice'
import { baseUrl } from '../../url'

const UpdateNotes = () => {
    const { id: noteIdFromParams } = useParams()
    const [updateData, setupdateData] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getSingleNOte = async () => {
        const { data } = await axios.get(`${baseUrl}/api/notes/${noteIdFromParams}`)
        setupdateData(data)

    }
    const handleUpdate = (e) => {
        e.preventDefault()
        const {title , category , desc , _id} = updateData
        console.log(title , category , desc , _id)
        dispatch(updateNote({title, category, desc , _id}))
        navigate("/my_notes")

    
     }
   
   
    useEffect(() => {
        getSingleNOte()
    }, [])

    return (
        <MainComponent title='Update Note'>
            <Card className='bg-blurr'>
                <Card.Header> <span className='h5'>create note</span></Card.Header>
                <Card.Body>
                    <Form onSubmit={handleUpdate}>
                        <Form.Group className='mb-3' controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control className='bg-blurr'   required type='title' value={updateData.title} placeholder='enter title' onChange={e => setupdateData({ ...updateData, title: e.target.value })} />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='desc'>
                            <Form.Label>desc</Form.Label>
                            <Form.Control className='bg-blurr'   required as="textarea" rows={3} type='desc' value={updateData.desc} placeholder='enter desc' onChange={e => setupdateData({ ...updateData, desc: e.target.value })} />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='category'>
                            <Form.Label>category</Form.Label>
                            <Form.Control className='bg-blurr'   required type='category' value={updateData.category} placeholder='enter category' onChange={e => setupdateData({ ...updateData, category: e.target.value })} />
                        </Form.Group>
                        <Button type='submit' className='backgroundAnimation border-0'  >Update</Button>
                    </Form>
                </Card.Body>

            </Card>
        </MainComponent>
    )
}

export default UpdateNotes