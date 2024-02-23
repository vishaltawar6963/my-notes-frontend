import React, { useEffect, useState } from 'react'
import MainComponent from '../../components/MainComponent'
import { Link, useNavigate } from 'react-router-dom'
import { Accordion, Alert, Button, Card, Form, Spinner, useAccordionButton } from 'react-bootstrap'
import axios from "axios";
import {  useSelector , useDispatch} from "react-redux";
import { deleteNote, getUserNotes } from '../../store/slices/noesSlice';

export default function MyNotes() {
const {userNotes,error,deleteSucess, loading} = useSelector(state => state.notes)
const {userInfo} = useSelector(state => state.userLogin)
const dispatch = useDispatch()
const navigate = useNavigate()
const [search, setsearch] = useState("")
  
  

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log('totally custom!'),
    );

    return (
      <span onClick={decoratedOnClick} >{children}</span>
    );
  }

  const handleDelete =(id)=> {

 if(window.confirm("Are you sure ? "))dispatch(deleteNote(id))


  } 


  useEffect(() => {

   dispatch(getUserNotes())
  }, [deleteSucess])
  
  return (
    <MainComponent  title={`wellcome ${userInfo.name}`}>
     <div className='d-flex  justify-content-between mb-3'> <Link to='/create_notes' >
        <Button style={{ marginLeft: 10, marginBottom: 6 }} className='bg-blurr border-0' >create new note</Button>
      </Link>
      <Form.Control
              type="text"
              onChange={(e)=> setsearch(e.target.value)}
              placeholder="Search"
              
              className=" w-25 bg-blurr"
            /></div>
      {error && <Alert variant='danger'>{error}</Alert>}
      {loading && <h3 className='text-center'><Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            /></h3>}
      <Accordion defaultActiveKey="0" className='bg-blurr' style={{background:"none"}}>

      {
       userNotes && userNotes.filter(note=>note.title.toLowerCase().includes(search.toLowerCase())).map((note, i) => <Accordion.Item style={{background:"none", border:'none'}} key={`${note.title+ i}`}>

          <Card className='bg-blurr' >
              <CustomToggle eventKey={`${i}`}>

            <Card.Header className='d-flex justify-content-between '>
              <div>
                <span>{note.title}</span>
              </div>
              <div>
                <Link to={`/update_note/${note._id}`} ><Button size='sm' variant="outline-dark">   edit</Button></Link>
                <Button variant="outline-danger" size='sm' className='mx-2 ' onClick={() => handleDelete(note._id)}>delete</Button>
              </div>
            </Card.Header>
              </CustomToggle>
            <Accordion.Collapse eventKey={`${i}`}>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p>
                    {note.desc}
                  </p>
                  <footer className="blockquote-footer mt-2">
<small>
<cite title='Source Title'>date {note.updatedAt.substring(0, 10)}</cite>

</small>
                  </footer>
                </blockquote>
              </Card.Body>
            </Accordion.Collapse>

          </Card>
          </Accordion.Item>
       )
      }
 </Accordion>
      
    </MainComponent>
  )
}
