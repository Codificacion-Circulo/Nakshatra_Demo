import "./Header.css"
import logo from '../../assets/logo.png'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import {useLocation} from 'react-router-dom'
const Header = () => {
  const location=useLocation();
  const pathname=location.pathname;
  return (
    <>
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
              <NavDropdown.Item href="/logout">LogOut</NavDropdown.Item>
            </NavDropdown>
          </Navbar.Brand>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
