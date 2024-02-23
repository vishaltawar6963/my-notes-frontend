import React from 'react'
import  "./introPage.css";
import { Button, Container, Row } from 'react-bootstrap'

export default function IntroPage() {
  return (
    <div className='main'>
        <Container >
            <div className='titleContainer text-center text-sm-start '>
                <div>
                    <div>
                        <h1 className='title '>Welcome to MyNotes app</h1>
                        <p className='subtitle '>best platform to keep your notes</p>
                    </div>
                    <div className='buttonContainer flex-sm-row '>
                        
                        <a href='/login'>
                            <Button className='landingButton  backgroundAnimation border-0' variant=' text-light'>
                                login
                            </Button>
                        </a>
                        <a href='/register'>
                            <Button className='landingButton borderAnimation' variant="outline-light " size='lg' >
                                register
                            </Button>
                        </a>
                        
                    </div>

                </div>
            </div>
        </Container>
    </div>
  )
}
