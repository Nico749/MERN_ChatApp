import React from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './Home.css'

const Home = () => {
  return (
<Row>
    <Col md={6} className = "d-flex flex-direction-column align-items-center justify-content-center">
        <div>
            <h1>Share memories, thoughts, and experiences with your mates!</h1>
            <LinkContainer to='/chat'>
                <Button variant='success'>Get Started <i className='fas fa-comments home-messagee-icon'></i></Button>
                
            </LinkContainer>
        </div>
    </Col>
    {/* md=6 splits the screen in halves */}
    <Col md={6} className= 'home__bg'>
    </Col>
</Row>
  )
}

export default Home
