import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Chat from './pages/Chat';
import { useSelector } from 'react-redux';


function App() {
  const user = useSelector((state)=>state.user)
  return (

<Router> 
<Navigation />
<Routes>
<Route path="/" element={<Home />} />
{!user && (
  <>
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
</>
)}
<Route path="/chat" element={<Chat />} />

</Routes>
</Router>
  

  );
}

export default App;
