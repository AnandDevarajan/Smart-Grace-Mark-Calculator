import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';

import { Link } from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import '../Home.css';
import axios from 'axios';

const ViewCourseMarks = ({ history, match }) => {
  const str = match.params.id;
  let n = str.length;
  let rollnum = str.substring(0, n - 6);
  let branch = str.substring(n - 5, n - 2);
  let batch = str.substring(n - 1, n);
  const [marks, setMarks] = useState([]);

  const dispatch = useDispatch();

  const studentList = useSelector((state) => state.studentList);
  const { error, students } = studentList;

  const facultySignin = useSelector((state) => state.facultySignin);
  const { facultyInfo } = facultySignin;

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const studentSignin = useSelector((state) => state.studentSignin);
  const { studentInfo } = studentSignin;

  useEffect(() => {
    if (adminInfo || facultyInfo || studentInfo) {
      axios
        .get(`/course/student/marks/${rollnum}`)
        .then((response) => {
          console.log(response.data);
          setMarks(response.data.markList);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      history.push('/');
    }
  }, [dispatch, history, adminInfo]);

  console.log(marks);
  return (
    <div className='ml-5 align-items-center'>
      {adminInfo ? (
        <Link to='/admin/students'>
          <Button variant='light'>
            <ArrowBackIcon /> Go Back
          </Button>
        </Link>
      ) : (
        <Link to={`/faculty/adviser/students/${facultyInfo.result.Batch}`}>
          <Button variant='light'>
            <ArrowBackIcon /> Go Back
          </Button>
        </Link>
      )}

      <h1 className='py-3 text-center'>Mark List</h1>
      <h4>
        {rollnum} - {branch} {batch}
      </h4>
      <h4></h4>
      {error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>Internals</th>
              <th>Marks</th>
              <th>Total</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((mark) => (
              <tr>
                <td>{mark.CourseID}</td>
                <td> {mark.CourseName}</td>
                <td>{mark.Internals}</td>
                <td>{mark.Marks}</td>
                <td>{mark.Total}</td>
                <td>{mark.Grade}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ViewCourseMarks;
