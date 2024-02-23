import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export default function Footer() {

  return (
    <footer style={{width:'100%',position:'relative', bottom:0,display:'flex', justifyContent:'center'}}>
         <Container>
        <Row>
            <Col className='text-center py-3'>Copyright @My Notes</Col>
        </Row>
    </Container>
    </footer>
   
  )
}
