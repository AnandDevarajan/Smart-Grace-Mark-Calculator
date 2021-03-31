import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import FormContainer from '../../components/FormContainer';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';

const StudentChangePassword = ({ history, match }) => {
  const id = match.params.id;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const studentSignin = useSelector((state) => state.studentSignin);
  const { error, studentInfo } = studentSignin;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === '' || confirmPassword === '') {
      setMessage('Enter all the details');
    } else if (password != confirmPassword) {
      setMessage('Password does not match');
    } else {
      axios
        .put(`/student/changepassword/${id}`, { password })
        .then((response) => {
          history.push('/student/profile');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Link to={`/student/edit/profile/${studentInfo.result.RollNum}`}>
        <Button variant='light'>
          <ArrowBackIcon /> Go Back
        </Button>
      </Link>
      <FormContainer>
        <Form onSubmit={submitHandler}>
          <h1>Change Password</h1>
          {message && <Message variant='warning'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          <Form.Group controlId='password'>
            <Form.Label style={{ color: 'black', fontWeight: 'bold' }}>
              New Password
            </Form.Label>
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
            Save Changes
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default StudentChangePassword;
