import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import { listCourseStudents } from '../../actions/studentActions';
import { Link } from 'react-router-dom';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import '../Home.css';
import EditIcon from '@material-ui/icons/Edit';
import { Input } from '@material-ui/core';

const CourseStudents = ({ history, match }) => {
  const department = match.params.id;
  const [edit, setEdit] = useState(false);
  const [internals, setInternals] = useState('');
  const [marks, setMarks] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const courseStudentList = useSelector((state) => state.courseStudentList);
  const { error, students } = courseStudentList;

  const facultySignin = useSelector((state) => state.facultySignin);
  const { facultyInfo } = facultySignin;

  useEffect(() => {
    if (facultyInfo) {
      dispatch(listCourseStudents(department));
    } else {
      history.push('/');
    }
  }, [dispatch, history, facultyInfo]);

  const submitMarks = (id, internals, marks) => {
    if (internals === ' ' || marks === '') {
      setMessage('');
      setMessage('Enter all the details');
    } else if (internals > 50 || marks > 50) {
      setMessage('');
      setMessage('Invalid details');
    } else {
      let total = parseInt(internals) + parseInt(marks);
      dispatch(addCourseMarks(id, total));
    }
  };

  return (
    <div className='ml-5 align-items-center'>
      <Link to='/faculty/profile'>
        <Button variant='light'>
          <ArrowBackIcon /> Go Back
        </Button>
      </Link>
      <h1>STUDENT LIST - {facultyInfo.result.CourseID}</h1>
      {message ? (
        <Message variant='warning'>{message}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Branch</th>
              <th>Batch</th>
              <th>Internals</th>
              <th>Marks</th>
              <th>Total </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.RollNum}>
                <td>{student.RollNum}</td>
                <td>{student.Name}</td>
                <td>{student.Branch}</td>
                <td>{student.Batch}</td>
                <td id={student.RollNum}>
                  <Input onChange={(e) => setInternals(e.target.value)}></Input>
                </td>
                <td>
                  <Input onChange={(e) => setMarks(e.target.value)}></Input>
                </td>
                <td></td>
                {edit ? (
                  <td>
                    <EditIcon />
                  </td>
                ) : (
                  <td>
                    <CheckBoxIcon
                      style={{ color: 'green' }}
                      onClick={() => {
                        submitMarks(student.RollNum, internals, marks);
                      }}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default CourseStudents;
