import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import './Signup.css'
function Signup() {
  return (
    <Container>
      <Row>
        <Col md={4} className='signup__bg'></Col>
        <Col md ={8} className='d-flex align-items-center justify-content-center flex-direction-column'>
    <Form>
      <h1 className='text-center'>Create an account</h1>
    <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Username" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Signup
      </Button>
      <div className='py-4'>
        <p className='text-center'>
          Already a member? <Link to='/login'>Login here</Link>
        </p>

      </div>
    </Form>
    </Col>
    </Row>
    </Container>
  );
}

export default Signup;