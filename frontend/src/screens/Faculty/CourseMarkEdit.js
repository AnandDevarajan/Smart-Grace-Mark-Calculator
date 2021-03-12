import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import FormContainer from '../../components/FormContainer';
import {
  listCourseMarks,
  updateCoursemark,
} from '../../actions/gracemarkActions';
import { GRACEMARK_UPDATE_RESET } from '../../constants/gracemarkConstants';
import axios from 'axios';

const CourseMarkEdit = ({ match, history }) => {
  const editID = match.params.id;
  const dispatch = useDispatch();

  const courseMarkList = useSelector((state) => state.courseMarkList);
  const { markList } = courseMarkList;

  const facultySignin = useSelector((state) => state.facultySignin);
  const { facultyInfo } = facultySignin;

  const gracemarkUpdate = useSelector((state) => state.gracemarkUpdate);
  const { error: errorUpdate, success: successUpdate } = gracemarkUpdate;

  const [internals, setInternals] = useState('');
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
          .get(`/course/mark/edit/${editID}`)
          .then((response) => {
            console.log(response);
            setInternals(response.data.markList.Internals);
            setMarks(response.data.markList.Marks);
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
      <Link to={`/faculty/students/${s}`} className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>EDIT MARK ID:{gracemarkId}</h1>
        {message && <Message variant='warning'>{message}</Message>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {console.log('State', description)}
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
