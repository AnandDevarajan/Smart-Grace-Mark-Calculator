import React, { useState, useEffect } from 'react';

import { Link, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';

const StudentResetPassword = ({ location, history }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const { token } = useParams();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      axios
        .post(`/student/newpassword`, { password, token })
        .then((response) => {
          console.log(response);
          setMessage(null);
          history.push('/student/login');
        })
        .catch((err) => {
          console.log(err);
          setMessage(null);
          setMessage('Cannot reset password now');
        });
    } else {
      setMessage('');
      setMessage('Password does not match');
    }
  };

  return (
    <>
      <Link to='/'>
        <Button variant='light'>
          <ArrowBackIcon /> Go Back
        </Button>
      </Link>
      <FormContainer>
        <h3>CREATE NEW PASSWORD</h3>
        {message && <Message variant='danger'>{message}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label style={{ color: 'black', fontWeight: 'bold' }}>
              Confirm Password
            </Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Update password
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default StudentResetPassword;
