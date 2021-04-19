import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import FormContainer from '../../components/FormContainer';
import { listGracemarks } from '../../actions/gracemarkActions';
import { studentRequestGM, studentLogin } from '../../actions/studentActions';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const RequestForm = ({ location, history }) => {
  const [request, setRequest] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const studentSignin = useSelector((state) => state.studentSignin);
  const { error, studentInfo } = studentSignin;

  const gracemarkList = useSelector((state) => state.gracemarkList);
  const { gracemarks } = gracemarkList;

  const studentRequest = useSelector((state) => state.studentRequest);
  const { success, studentInfo: updatedStudent } = studentRequest;

  const redirect ='/student/login';

  useEffect(() => {
    if (success) {
      history.push('/student/profile');
    } else {
      dispatch(listGracemarks());
    }
  }, [history, redirect, success, updatedStudent]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (request === '' || request === 'select') {
      setMessage('Select an option');
    } else {
      setMessage('');
      dispatch(studentRequestGM(request));
      history.push('/student/profile');
    }
  };

  return (
    <>
      <Link to='/student/profile'>
        <Button variant='light'>
          <ArrowBackIcon /> Go Back
        </Button>
      </Link>
      {studentInfo.result.Requested === 'pending' ? (
        <FormContainer>
          <Message variant='warning'>
            Already requested for grace Mark{' '}
            <Link to='/student/profile'> Go to profile</Link>
          </Message>
        </FormContainer>
      ) : (
        <FormContainer>
          <h1>Request for Grace mark</h1>
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='gracemarkId'>
              <Form.Label style={{ color: 'black', fontWeight: 'bold' }}>
                Grace mark
              </Form.Label>
              <Form.Control
                as='select'
                value={request}
                onChange={(e) => setRequest(e.target.value)}
              >
                <option>select</option>
                {gracemarks.map((gracemark) => (
                  <option key={gracemark.GraceMarkID}>
                    {gracemark.Description}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Request
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default RequestForm;
