import logo from '../../assets/logo.png'
import "./Header.css"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse
} from 'mdb-react-ui-kit';
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { authAction } from "../../store";
toast.configure();
const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  console.log(pathname)
  const [showNavColor, setShowNavColor] = useState(false);
  const authCtx = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    const getTodo = () => {
      console.log(`Authorization Bearer ${token}`)
      axios
        .get('https://nakshatra-demo.herokuapp.com/api/users/me', { headers: { "Authorization": `Bearer ${token}` }, withCredentials: true })
        .then((response) => {
          console.log(response.data.data.data);
          dispatch(authAction.setData(response.data.data))
        })
        .catch((e) => {
          console.log('something went wrong :(', e);
          toast.error(e.message, {
            position: toast.POSITION.TOP_RIGHT
          });
        });
    };
    if (token) {
      getTodo();
    }
  }, []);
  return (
    <>
      <MDBNavbar expand='lg' dark className="bgs">
        <MDBNavbarBrand href='/' >
          <img
            src={logo}
            height='80'
            alt=''
            loading='lazy'
          />
          Alveoli
        </MDBNavbarBrand>
        <MDBContainer fluid>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarColor02'
            aria-controls='navbarColor02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavColor(!showNavColor)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse show={showNavColor} center navbar>
            <MDBNavbarNav className='justify-content-end mb-2 mb-lg-0 px-5'>
              <MDBNavbarItem className="mx-4">
                <MDBNavbarLink href='/upload' active={"/upload" === pathname}>Upload</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem className="mx-4">
                <MDBNavbarLink href='/whitepaper' active={"/whitepaper" === pathname}>WhitePaper</MDBNavbarLink>
              </MDBNavbarItem>
              {authCtx && authCtx.name ? (<MDBNavbarItem className="mx-4">
                <MDBNavbarLink href='/profile' active={"/profile" === pathname}>Profile</MDBNavbarLink>
              </MDBNavbarItem>) : (<MDBNavbarItem className="mx-4">
                <MDBNavbarLink href='/login' active={"/whitepaper" === pathname}>Login</MDBNavbarLink>
              </MDBNavbarItem>)}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Header;
