import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../../components/Message';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { studentLogin } from '../../actions/studentActions';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const StudentLogin = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const studentSignin = useSelector((state) => state.studentSignin);
  const { error, studentInfo } = studentSignin;

  const redirect = location.search
    ? location.search.split('=')[1]
    : '/student/profile';

  useEffect(() => {
    if (studentInfo) {
      history.push(redirect);
    }
  }, [history, studentInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(studentLogin(email, password));
  };

  return (
    <>
      <Link to='/'>
        <Button variant='light'>
          <ArrowBackIcon /> Go Back
        </Button>
      </Link>
      <FormContainer>
        <h3>Student Login</h3>
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
            <Link to='/student/forgotpassword'>Forgot Password</Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default StudentLogin;
