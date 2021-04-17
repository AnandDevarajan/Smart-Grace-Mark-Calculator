import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Navbar.css';
const FormContainer = ({ children }) => {
  return (
    <Container style={{ marginTop: '30px' }} className='mobile_form'>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
