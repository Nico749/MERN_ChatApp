import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css'
import avatar from '../assets/avatar.png'
import { useState } from 'react';
import { useSignupUserMutation } from '../services/appApi';


function Signup() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [name,setName] = useState('')
  const [image,setImage] = useState(null)
  const [uploadingImg, setUploadingImg]=useState(false)
  const [imgPreview, setImgPreview] = useState(null)
  const navigate = useNavigate()
  const [signupUser, {isLoading,error}] = useSignupUserMutation()


  function validateImg(e){
    const file = e.target.files[0]
    // if size > 1 MB
    if(file.size>1048576){
      return alert('max file size is 1 MB ')
    }
    else{
      setImage(file)
      setImgPreview(URL.createObjectURL(file))
    }
  }
//IMPLEMENTING CLOUDINARY
  async function uploadImage(){
    const data = new FormData()
    data.append('file',image)
    data.append('upload_preset','first_upload_preset')
    try{
      setUploadingImg(true)
      // dmdaba3cq is the cloudinary name
      let res = await fetch('https://api.cloudinary.com/v1_1/dmdaba3cq/image/upload',{
        method:'post',
        body:data
      })
      const urlData = await res.json()
      setUploadingImg(false)
      return urlData.url
    }
    catch(err){
      setUploadingImg(false)
      console.log(err)
    }
  }

  async function handleSubmit(e){
    e.preventDefault()
    if(!image){
      return alert("Missing profile picture")
    }
    const url = await uploadImage(image)
   // console.log(url)
    //signup the user and navigate to the chat page once signed up
    signupUser({name, email,password,picture:url}).then(({data}) =>{
      if (data){
       // console.log(data)
        navigate("/chat")
      }
    })
  }
  

  return (
    <Container>
      <Row>
        <Col md={4} className='signup__bg'></Col>
        <Col md ={8} className='d-flex align-items-center justify-content-center flex-direction-column'>
    <Form onSubmit={handleSubmit}>
      <h1 className='text-center'>Create an account</h1>
      <div className='signup-profile-pic-container'>
        <img src={imgPreview ||avatar} className='image-signup' alt="profileImg"/>
        <label htmlFor='image-upload' className='image-upload-label'>
          <i className='fas fa-plus-circle add-picture-icon'></i>
        </label>
        {/* when we click we ope the folder with images to add a new one */}
        <input type='file' id='image-upload' hidden accept='image/png, image/jpeg' onChange={validateImg} />
      </div>
    <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Username" onChange={(e)=>setName(e.target.value)} value={name}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} value={email} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
      </Form.Group>
     
      <Button variant="primary" type="submit">
        {uploadingImg ? 'Signing you up....': 'Signup'}
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