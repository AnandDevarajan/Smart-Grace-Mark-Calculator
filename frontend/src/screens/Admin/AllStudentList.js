import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import './Admin.css';

import {
  listStudents,
  requestAccept,
  requestReject,
} from '../../actions/studentActions';
import { Link } from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import '../Home.css';

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

  const acceptHandler = (id) => {
    dispatch(requestAccept(id));
    dispatch(listStudents());
  };

  const rejectHandler = (id) => {
    dispatch(requestReject(id));
    dispatch(listStudents());
  };

  return (
    <div className='ml-5 align-items-center alllist_div'>
      <Link to='/admin/profile' className='goback'>
        <Button variant='light'>
          <ArrowBackIcon /> Go Back
        </Button>
      </Link>
      <h1 className='text-center list_heading'>STUDENT LIST</h1>
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
              <th>Course Marks</th>
              <th>Reason</th>
              <th>Grace</th>
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
                <td>
                  <LinkContainer
                    to={`/student/view/marklist/${student.RollNum}-${student.Branch}-${student.Batch}`}
                  >
                    <Button className='btn btn-sm btn-info'>View</Button>
                  </LinkContainer>
                </td>
                {student.GraceDesc === 'N/A' ? (
                  <td>-</td>
                ) : (
                  <td>{student.GraceDesc}</td>
                )}
                {student.Requested === 'accepted' ? (
                  <td>{student.GraceMark}</td>
                ) : (
                  <td>-</td>
                )}

                {student.Requested === 'pending' ? (
                  <td>
                    <Button
                      variant='warning'
                      className='btn btn-sm'
                      style={{ width: '100px' }}
                    >
                      Pending
                    </Button>
                  </td>
                ) : student.Requested === 'accepted' ? (
                  <td>
                    <Button
                      variant='success'
                      className='btn btn-sm'
                      style={{ width: '100px' }}
                    >
                      Accepted
                    </Button>
                  </td>
                ) : student.Requested === 'rejected' ? (
                  <td>
                    <Button
                      variant='danger'
                      className='btn btn-sm'
                      style={{ width: '100px' }}
                    >
                      Rejected
                    </Button>
                  </td>
                ) : (
                  <td>
                    <Link>-</Link>
                  </td>
                )}

                {student.Requested === 'pending' && (
                  <td>
                    <CheckIcon
                      className='icon'
                      style={{ color: 'green' }}
                      onClick={() => acceptHandler(student.RollNum)}
                    />
                  </td>
                )}
                {student.Requested === 'pending' && (
                  <td>
                    <ClearIcon
                      className='icon'
                      style={{ color: 'red' }}
                      onClick={() => rejectHandler(student.RollNum)}
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

export default AllStudentList;
