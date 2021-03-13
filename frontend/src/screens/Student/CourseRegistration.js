import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import { listCourses } from '../../actions/courseActions';
import { Link } from 'react-router-dom';
import '../Home.css';
import axios from 'axios';
import { response } from 'express';

const CourseRegistration = ({ history, match }) => {
  const department = match.params.id;
  const dispatch = useDispatch();

  
  
  const studentSignin = useSelector((state) => state.studentSignin);
  const { studentInfo } = studentSignin;

  useEffect(() => {
    if (studentInfo) {
      axios
        .get(`/course/${department}`)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      history.push('/');
    }
  }, [dispatch, history, studentInfo]);

  return (
    <div className='align-items-center'>
      <h1>Course Registration</h1>
      <Table striped bordered hover className='table-sm'>
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
          </tr>
        </thead>
        <tbody>
          {/* {courses.map((course) => (
            <tr key={course.CourseID}>
              <td>{course.CourseID}</td>
              <td>{course.CourseName}</td>
            </tr>
          ))} */}
        </tbody>
      </Table>
    </div>
  );
};

export default CourseRegistration;
