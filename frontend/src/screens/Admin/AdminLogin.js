import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { adminLogin } from '../../actions/adminActions';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './Admin.css';
const AdminLogin = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const adminSignin = useSelector((state) => state.adminSignin);
  const { error, adminInfo } = adminSignin;

  // const redirect = location.search
  //   ? location.search.split('=')[1]
  //   : '/admin/profile';
  const redirect = '/admin/profile';
  useEffect(() => {
    if (adminInfo) {
      history.push(redirect);
    }
  }, [history, adminInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(email, password));
  };

  return (
    <>
      {!adminInfo && (
        <>
          <Link to='/'>
            <Button variant='light' className='goback'>
              <ArrowBackIcon /> Go Back
            </Button>
          </Link>
          <FormContainer>
            <h2>Administration Login</h2>
            {error && <Message variant='danger'>{error}</Message>}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='password'>
                <Form.Label>password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type='submit' variant='info'>
                Sign In
              </Button>
            </Form>
            <Row className='py-3'>
              <Col>
                <Link to='/admin/forgotpassword'>Forgot Password</Link>
              </Col>
            </Row>
          </FormContainer>
        </>
      )}
    </>
  );
};

export default AdminLogin;
