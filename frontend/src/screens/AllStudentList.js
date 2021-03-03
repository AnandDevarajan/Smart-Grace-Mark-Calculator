import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { listStudents, requestAccept } from '../actions/studentAction';
import { Link } from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
const AllStudentList = ({ history }) => {
  const dispatch = useDispatch();

  const studentList = useSelector((state) => state.studentList);
  const { error, students } = studentList;

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  useEffect(() => {
    if (adminInfo) {
      dispatch(listStudents());
    } else {
      history.push('/');
    }
  }, [dispatch, history, adminInfo]);

  // const acceptHandler = (id) => {
  //   dispatch(requestAccept(id));
  // };

  return (
    <div className='ml-5'>
      <h1>STUDENT LIST</h1>
      {error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Branch</th>
              <th>Batch</th>
              <th>Reason</th>
              <th>Request</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.RollNum}>
                <td>{student.RollNum}</td>
                <td>{student.Name}</td>
                <td>
                  <a href={`mailto:${student.EmailID}`}>{student.EmailID}</a>
                </td>
                <td>{student.Branch}</td>
                <td>{student.Batch}</td>
                <td>{student.GraceDesc}</td>
                {student.Requested === 'pending' ? (
                  <td>
                    <Button variant='warning' className='btn btn-sm'>
                      Pending
                    </Button>
                  </td>
                ) : student.Requested === 'accepted' ? (
                  <td>
                    <Button variant='success'>Accepted</Button>
                  </td>
                ) : student.Requested === 'rejected' ? (
                  <td>
                    <Button variant='warning'>Rejected</Button>
                  </td>
                ) : (
                  <td>
                    <Link>N/A</Link>
                  </td>
                )}
                {student.Requested === 'pending' && (
                  <td>
                    <CheckIcon
                      style={{ color: 'green' }}
                      // onClick={() => acceptHandler(student.RollNum)}
                    />
                  </td>
                )}
                {student.Requested === 'pending' && (
                  <td>
                    <ClearIcon style={{ color: 'red' }} />
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

export default AllStudentList;
