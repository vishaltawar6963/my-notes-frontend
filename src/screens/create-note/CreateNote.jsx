import React, { useState } from 'react'
import MainComponent from '../../components/MainComponent'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { createNote } from '../../store/slices/noesSlice'
import { useNavigate } from 'react-router-dom'

const   CreateNote = () => {
    const navigate = useNavigate()
const dispatch  =    useDispatch()
    const [createData, setcreateData] = useState({
        title:"",
        desc:"",
        category:""
    })
    const handleSubmit=(e)=>{
        e.preventDefault()
        dispatch(createNote(createData))
navigate('/my_notes')
        
    }
  return (
    <MainComponent title="Create new note" >
        <Card className='bg-blurr border-0'>
            <Card.Header> <span className='h5'>create note</span></Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3' controlId='title'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control className='bg-blurr' required type='title' value={createData.title} placeholder='enter title' onChange={e=> setcreateData({...createData , title:e.target.value})}/>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='desc'>
                        <Form.Label>desc</Form.Label>
                        <Form.Control className='bg-blurr ' required as="textarea" rows={3} type='desc' value={createData.desc} placeholder='enter desc' onChange={e=> setcreateData({...createData , desc:e.target.value})}/>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='category'>
                        <Form.Label>category</Form.Label>
                        <Form.Control className='bg-blurr ' required type='category' value={createData.category} placeholder='enter category' onChange={e=> setcreateData({...createData , category:e.target.value})}/>
                    </Form.Group>
<Button type='submit'className='backgroundAnimation border-0' >Create</Button>
                </Form>
            </Card.Body>
            <Card.Footer>
                <span className='blockquote-footer'>date :  </span>
            </Card.Footer>
        </Card>
    </MainComponent>   
  )
}

export default CreateNote