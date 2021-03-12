import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import FormContainer from '../../components/FormContainer';
import { updateCoursemark } from '../../actions/courseActions';
import { COURSE_MARK_UPDATE_RESET } from '../../constants/courseConstants';
import axios from 'axios';

const CourseMarkEdit = ({ match, history }) => {
  const editID = match.params.id;
  let n = editID.length;
  let rollno = editID.substring(0, n - 9);
  let courseid = editID.substring(n - 8, n);

  const dispatch = useDispatch();

  const facultySignin = useSelector((state) => state.facultySignin);
  const { facultyInfo } = facultySignin;

  const courseDetails = useSelector((state) => state.courseDetails);
  const { error, markList } = courseDetails;

  const coursemarkUpdate = useSelector((state) => state.coursemarkUpdate);
  const { error: errorUpdate, success: successUpdate } = coursemarkUpdate;

  const [internals, setInternals] = useState('');
  const [marks, setMarks] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (successUpdate) {
      dispatch({
        type: COURSE_MARK_UPDATE_RESET,
      });

      //   history.push(`/faculty/students/${facultyInfo.result.Department}`);
    } else {
      if (facultyInfo) {
        axios
          .get(`/course/mark/edit/${editID}`)
          .then((response) => {
            console.log(response);
            setInternals(response.data.markList[0].Internals);
            setMarks(response.data.markList[0].Marks);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        history.push('/faculty/login');
      }
    }
  }, [successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (internals !== '' && marks !== '') {
      setMessage('');
      dispatch(updateCoursemark(editID, internals, marks));
      setMessage(`Course Marks updated successfully`);
    } else {
      setMessage('Enter all details');
    }
  };

  return (
    <>
      <Link
        to={`/faculty/students/${facultyInfo.result.Department}`}
        className='btn btn-light my-3'
      >
        Go Back
      </Link>

      <FormContainer>
        <h1>EDIT MARK {courseid} </h1>
        <p>Roll Number : {rollno}</p>
        {message && (
          <Message variant='success'>
            {message}{' '}
            <Link to={`/faculty/students/${facultyInfo.result.Department}`}>
              Go to student list
            </Link>
          </Message>
        )}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Internals</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter  Description'
                value={internals}
                onChange={(e) => setInternals(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Marks</Form.Label>
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

export default CourseMarkEdit;
