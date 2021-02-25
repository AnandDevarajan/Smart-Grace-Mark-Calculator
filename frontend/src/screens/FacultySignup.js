import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { studentRegister } from '../actions/studentAction';

const FacultySignup = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('select');
  const [department, setDepartment] = useState('CSE');
  const [courseId, setCourseId] = useState('');
  const [advisor, setAdvisor] = useState('[choose]');
  const [batch, setBatch] = useState('[choose batch]');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const studentSignup = useSelector((state) => state.studentSignup);
  const { error, studentInfo } = studentSignup;

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
    if (
      name === '' ||
      phone === '' ||
      address === '' ||
      dob === '' ||
      advisor === '[choose]' ||
      department === '' ||
      courseId === '' ||
      gender === 'select' ||
      batch === '[choose batch]' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      setMessage('Enter all the details');
    } else if (password !== confirmPassword) {
      setMessage('');
      setMessage('Passwords do not match');
    } else {
      setMessage('');
      dispatch(
        studentRegister(
          name,
          email,
          password,
          dob,
          advisor,
          department,
          courseId,
          batch,
          gender,
          phone,
          address
        )
      );
    }
  };

  return (
    <>
      <Link to='/'>
        <Button>Go Back</Button>
      </Link>
      <FormContainer>
        <h1>CREATE A FACULTY ACCOUNT</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label style={{ color: 'black', fontWeight: 'bold' }}>
              Name
            </Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter  name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
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

          <Form.Group controlId='password'>
            <Form.Label style={{ color: 'black', fontWeight: 'bold' }}>
              password
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
          <Form.Group controlId='department'>
            <Form.Label style={{ color: 'black', fontWeight: 'bold' }}>
              Department
            </Form.Label>
            <Form.Control
              as='select'
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option>CSE</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='advisor'>
            <Form.Label style={{ color: 'black', fontWeight: 'bold' }}>
              Class Advisor
            </Form.Label>
            <Form.Control
              as='select'
              value={advisor}
              onChange={(e) => setAdvisor(e.target.value)}
            >
              <option>[choose]</option>
              <option>Yes</option>
              <option>No</option>
            </Form.Control>
          </Form.Group>
          {advisor === 'Yes' && (
            <Form.Group controlId='batch'>
              <Form.Label style={{ color: 'black', fontWeight: 'bold' }}>
                Select batch
              </Form.Label>
              <Form.Control
                as='select'
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
              >
                <option>[choose batch]</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
                <option>E</option>
              </Form.Control>
            </Form.Group>
          )}

          <Form.Group controlId='dob'>
            <Form.Label style={{ color: 'black', fontWeight: 'bold' }}>
              Date of Birth
            </Form.Label>
            <Form.Control
              type='name'
              placeholder='dd/mm/yyyy'
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='gender'>
            <Form.Label style={{ color: 'black', fontWeight: 'bold' }}>
              Gender
            </Form.Label>
            <Form.Control
              as='select'
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option>select</option>
              <option>Male</option>
              <option>Female</option>
            </Form.Control>
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
          <Button type='submit' variant='primary'>
            Register
          </Button>
        </Form>
        <Row className='py-3'>
          <Col>
            Already have an account ?
            <Link
              to={
                redirect
                  ? `/faculty/login?redirect=${redirect}`
                  : '/faculty/login'
              }
            >
              {' '}
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default FacultySignup;
