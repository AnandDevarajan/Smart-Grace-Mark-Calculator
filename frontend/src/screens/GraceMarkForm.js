import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { studentLogin } from '../actions/studentAction';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const GraceMarkForm = ({ location, history }) => {
  const [description, setDescription] = useState('');
  const [mark, setMark] = useState('');

  const dispatch = useDispatch();

  const studentSignin = useSelector((state) => state.studentSignin);
  const { error, studentInfo } = studentSignin;

  const redirect = location.search
    ? location.search.split('=')[1]
    : '/admin/profile';

  useEffect(() => {
    if (studentInfo) {
      history.push(redirect);
    }
  }, [history, studentInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(studentLogin(email, password));
  };

  return (
    <>
      <Link to='/'>
        <Button variant='light'>
          <ArrowBackIcon /> Go Back
        </Button>
      </Link>
      <FormContainer>
        <h3>ADD GRACE MARK</h3>
        {error && <Message variant='danger'>{error}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='description'>
            <Form.Label>Description of Grace Mark</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='name'>
            <Form.Label>Marks Allotted</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter marks'
              value={mark}
              onChange={(e) => setMark(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='info'>
            Add
          </Button>
        </Form>
        <Row className='py-3'></Row>
      </FormContainer>
    </>
  );
};

export default GraceMarkForm;
