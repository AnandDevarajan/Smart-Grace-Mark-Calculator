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

const GracemarkEdit = ({ match, history }) => {
  const gracemarkId = match.params.id;
  const [description, setDescription] = useState('');
  const [marks, setMarks] = useState('');

  const dispatch = useDispatch();

  const gracemarkDetails = useSelector((state) => state.gracemarkDetails);
  const { loading, error, gracemark } = gracemarkDetails;

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const gracemarkUpdate = useSelector((state) => state.gracemarkUpdate);
  const { error: errorUpdate, success: successUpdate } = gracemarkUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({
        type: GRACEMARK_UPDATE_RESET,
      });
      history.push('/admin/gracemarklist');
    } else {
      if (adminInfo) {
        if (!gracemark || gracemark.GraceMarkID !== gracemarkId) {
          dispatch(getGracemarkDetails(gracemarkId));
        } else {
          setDescription(gracemark.Description);
          setMarks(gracemark.GraceMark);
        }
      } else {
        history.push('/admin/login');
      }
    }
  }, [gracemarkId, dispatch, gracemark, history, adminInfo, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateGracemark({ id: gracemarkId, description, marks }));
  };

  return (
    <>
      <Link to='/admin/gracemarklist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>EDIT GRACE MARK</h1>
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
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
