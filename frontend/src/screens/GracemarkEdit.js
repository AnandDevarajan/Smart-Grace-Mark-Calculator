import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import {
  getGracemarkDetails,
  updateGracemark,
} from '../actions/gracemarkAction';
import { GRACEMARK_UPDATE_RESET } from '../constants/gracemarkConstant';
import axios from 'axios';
const GracemarkEdit = ({ match, history }) => {
  const gracemarkId = match.params.id;
  const dispatch = useDispatch();

  const gracemarkDetails = useSelector((state) => state.gracemarkDetails);
  const { error, gracemark } = gracemarkDetails;

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const gracemarkUpdate = useSelector((state) => state.gracemarkUpdate);
  const { error: errorUpdate, success: successUpdate } = gracemarkUpdate;

  const [description, setDescription] = useState('');
  const [marks, setMarks] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (successUpdate) {
      dispatch({
        type: GRACEMARK_UPDATE_RESET,
      });
      history.push('/admin/gracemarklist');
    } else {
      if (adminInfo) {
        axios
          .get(`/gracemark/${gracemarkId}`)
          .then((response) => {
            console.log(response);
            setDescription(response.data.gracemark.Description);
            setMarks(response.data.gracemark.GraceMark);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        history.push('/admin/login');
      }
    }
  }, [successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (description !== '' && marks !== '') {
      setMessage('');
      dispatch(updateGracemark({ id: gracemarkId, description, marks }));
    } else {
      setMessage('Enter all details');
    }
  };

  return (
    <>
      <Link to='/admin/gracemarklist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>EDIT GRACE MARK ID:{gracemarkId}</h1>
        {message && <Message variant='warning'>{message}</Message>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {console.log('State', description)}
        {error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter  Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Marks Allotted</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Marks'
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default GracemarkEdit;
