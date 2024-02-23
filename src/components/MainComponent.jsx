import React, { Children } from 'react'
import { Container } from 'react-bootstrap'
import  "./MainComponent.css";

export default function MainComponent({title,children}) {
  return (
    <Container>

        <div className='page pt-3'>
            {
                title && 
                <>
                <h1 className='heading'>{title}</h1>
                <hr />   


              </>
            }
  {children}
        </div>
    </Container>
  )
}
