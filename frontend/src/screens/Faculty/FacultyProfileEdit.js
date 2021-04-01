import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import FormContainer from '../../components/FormContainer';
import { updateFacultyProfile } from '../../actions/facultyActions';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { FACULTY_PROFILE_UPDATE_RESET } from '../../constants/facultyConstants';
import axios from 'axios';

const FacultyProfileEdit = ({ location, history, match }) => {
  const id = match.params.id;
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  const facultySignin = useSelector((state) => state.facultySignin);
  const { error, facultyInfo } = facultySignin;

  const facultyProfileUpdate = useSelector(
    (state) => state.facultyProfileUpdate
  );
  const { error: errorUpdate, success: successUpdate } = facultyProfileUpdate;

  const redirect = location.search
    ? location.search.split('=')[1]
    : '/faculty/profile';

  useEffect(() => {
    if (successUpdate) {
      dispatch({
        type: FACULTY_PROFILE_UPDATE_RESET,
      });
      history.push(redirect);
    } else {
      if (facultyInfo) {
        axios
          .get(`/faculty/${id}`)
          .then((response) => {
            console.log(response);
            setEmail(response.data.faculty.EmailID);
            setPhone(response.data.faculty.PhoneNum);
            setAddress(response.data.faculty.Address);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (email !== '' && phone !== '' && address != '') {
      setMessage('');
      dispatch(updateFacultyProfile(id, email, phone, address));
    } else {
      setMessage('Enter all details');
    }
  };

  return (
    <>
      <Link to='/faculty/profile'>
        <Button variant='light'>
          <ArrowBackIcon /> Go Back
        </Button>
      </Link>
      <FormContainer>
        <h1>Edit Your Profile</h1>

        {message && <Message variant='warning'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label style={{ color: 'black', fontWeight: 'bold' }}>
              Email Address
            </Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='phone'>
            <Form.Label style={{ color: 'black', fontWeight: 'bold' }}>
              Phone Number
            </Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter phone number'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='address'>
            <Form.Label style={{ color: 'black', fontWeight: 'bold' }}>
              Address
            </Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter  Address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Link to={`/student/edit/profile/changepassword/${id}`}>
            Change Password?{' '}
          </Link>
          <br />
          <Button type='submit' variant='primary' className='mt-3'>
            Save Changes
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default FacultyProfileEdit;
