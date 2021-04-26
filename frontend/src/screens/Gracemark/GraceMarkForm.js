import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../../components/Message';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { createGracemark } from '../../actions/gracemarkActions';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { GRACEMARK_CREATE_RESET } from '../../constants/gracemarkConstants';

const GraceMarkForm = ({ location, history }) => {
  const [description, setDescription] = useState('');
  const [mark, setMark] = useState('');
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const gracemarkCreate = useSelector((state) => state.gracemarkCreate);
  const { success, error, gracemarkInfo } = gracemarkCreate;

  useEffect(() => {
    dispatch({
      type: GRACEMARK_CREATE_RESET,
    });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (description === '' || mark === '') {
      setMessage('Enter all the details');
    } else {
      dispatch(createGracemark(description, mark));
      setDescription('');
      setMark('');
      if (message !== null || error || success) {
        setMessage(null);
      }
    }
  };

  return (
    <>
      <Link to='/admin/gracemarklist' className='goback'>
        <Button variant='light'>
          <ArrowBackIcon /> Go Back
        </Button>
      </Link>

      <FormContainer>
        <div className='card ml-5 px-3 py-2 overflow my_card'>
          <h2 className='text-center text-info'>CREATE GRACE MARK</h2>
          {message && <Message variant='warning'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {success && (
            <Message variant='success'>
              Grace Mark created successfully{' '}
              <Link to='/admin/gracemarklist'> Go to Gracemark List</Link>
            </Message>
          )}
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
            <Button type='submit' variant='success'>
              Create
            </Button>
          </Form>
          <Row className='py-3'></Row>
        </div>
      </FormContainer>
    </>
  );
};

export default GraceMarkForm;
