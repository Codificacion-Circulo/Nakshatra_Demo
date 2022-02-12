import "./Footer.css"
import React from 'react';
import {
  MDBFooter
} from 'mdb-react-ui-kit';
const Footer = () => {
  return (
    <MDBFooter className='text-center text-white container-fluid foo' style={{ backgroundColor: '#d8efed' }}>
      <div className='text-center text-dark p-3' style={{ backgroundColor: '#d8efed' }}>
        © 2022 Copyright:
        <a className='text-dark' href='/'>
        Alveoli
        </a>
      </div>
    </MDBFooter>
  );
};

export default Footer;
