import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {LinkContainer} from 'react-router-bootstrap'
import chatLogo from '../assets/chatLogo.jpg'
import {useSelector} from 'react-redux'
import Button from 'react-bootstrap/esm/Button';
import { useLogoutUserMutation } from '../services/appApi';
function Navigation() {
  //with useselector we have access to our state
  const user =useSelector((state)=>state.user)
  const [logoutUser] = useLogoutUserMutation()
async function handleLogout(e){
  e.preventDefault()
  await logoutUser(user)
  window.location.replace("/")
}

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to='/'>
        <Navbar.Brand>
            <img src={chatLogo} style = {{width:50, height:50}}/>
            </Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            {/* ms-auto put it to the right */}
          <Nav className="ms-auto">
            {!user && (
              <>
            <LinkContainer to='/login'>
                <Nav.Link>Login</Nav.Link>
            </LinkContainer>
           
            <LinkContainer to='/signup'>
                <Nav.Link>Signup</Nav.Link>
            </LinkContainer>
            </>
           )} <LinkContainer to='/chat'>
                <Nav.Link>Chat</Nav.Link>
            </LinkContainer>
            {user && 
            <NavDropdown title={
              <>
              <img src ={user.payload.picture} style ={{width:30, height:30,objectFit:"cover", borderRadius:"50%", marginRight:10}} />
              {user.payload.name}
              </>
            } id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          
              <NavDropdown.Item>
                <Button variant="danger" onClick={handleLogout}> Logout</Button>
              </NavDropdown.Item>
            </NavDropdown>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;