import React from 'react'
import {Col, Form, Row, Button } from 'react-bootstrap'
import './MessageForm.css'
function MessageForm() {
function handleSubmit(e){
    e.preventDefault()
}

  return (
    <div>
      <div className='messages'>
          <Form onSubmit={handleSubmit}>
              <Row>
                  <Col md={10}>
                      <Form.Control type='text' placeholder='Your message'></Form.Control>
                  </Col>
                  <Col md={2}>
                      <Button variant = 'primary' type= 'submit' style ={{width:'100%', backgroundColor:"blue"}}>
                        <i className='fas fa-paper-plane'></i>
                      </Button>
                  </Col>
              </Row>
          </Form>

      </div>
      </div>
      )
}

export default MessageForm
