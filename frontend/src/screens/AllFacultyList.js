import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { listFaculties } from '../actions/facultyAction';

const AllFacultyList = ({ history }) => {
  const dispatch = useDispatch();

  const facultyList = useSelector((state) => state.facultyList);
  const { error, faculties } = facultyList;

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  useEffect(() => {
    if (adminInfo) {
      dispatch(listFaculties());
    } else {
      history.push('/');
    }
  }, [dispatch, history, adminInfo]);

  console.log(faculties);
  return (
    <>
      <h1>Faculty LIST</h1>
      {error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Faculty ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Course ID</th>
              <th>Class Adviser</th>
              <th>Batch</th>
            </tr>
          </thead>
          <tbody>
            {faculties.map((faculty) => (
              <tr key={faculty.FacultyID}>
                <td>{faculty.FacultyID}</td>
                <td>{faculty.Name}</td>
                <td>
                  <a href={`mailto:${faculty.EmailID}`}>{faculty.EmailID}</a>
                </td>
                <td>{faculty.PhoneNum}</td>
                <td>{faculty.Department}</td>
                <td>{faculty.CourseID}</td>
                <td>{faculty.ClassAdviser}</td>
                <td>{faculty.Batch}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default AllFacultyList;
