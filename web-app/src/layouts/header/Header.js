import { useState } from "react"
import "./Header.css"
import logo from '../../assets/logo.png'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import {useLocation} from 'react-router-dom'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
toast.configure();
const Header = () => {
  const location=useLocation();
  const [loading, setLoading] = useState(false)
  const pathname=location.pathname;
  const handleLogout=async (e)=>{
    e.preventDefault();
    setLoading(false)
    try {
      
      await fetch("https://nakshatra-demo.herokuapp.com/api/users/logout")
      setLoading(false)
    toast.success("Logout Success", {
      position: toast.POSITION.TOP_CENTER
  });
    } catch (error) {
      console.log(error)
            setLoading(false)
            toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT
            });
    }
    
  }
  return (
    <>
    {loading&&<LoadingSpinner/>}
      <Navbar variant="dark" className="px-5">
        <Navbar.Brand href="/">
          <img
            alt=""
            src={logo}
            width="100"
            height="80"
            className="d-inline-block align-top"
          />{' '}
          Neural Descent
        </Navbar.Brand>
        <Container className="justify-content-center">
          <Nav className="justify-content-end" activeKey={location&&location.pathname&&pathname}>
            <Nav.Item>
              <Nav.Link href="/upload">Upload</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/history">History</Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
        <Nav>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg"
              width="40"
              height="40"
              className="d-inline-block rounded-circle"
            />{' '}
            <NavDropdown title="Abhay Lal" id="nav-dropdown" className="d-inline-block">
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/signup">SignUp</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>LogOut</NavDropdown.Item>
            </NavDropdown>
          </Navbar.Brand>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
