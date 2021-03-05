import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import { listAdviserBatch } from '../../actions/facultyActions';
import { listGracemarks } from '../../actions/gracemarkActions';
import { Link } from 'react-router-dom';
import '../Home.css';

const BatchStudents = ({ history, match }) => {
  const batch = match.params.id;
  const dispatch = useDispatch();
  const facultySignin = useSelector((state) => state.facultySignin);
  const { facultyInfo } = facultySignin;

  const adviserStudentList = useSelector((state) => state.adviserStudentList);
  const { error, students } = adviserStudentList;

  useEffect(() => {
    if (facultyInfo) {
      dispatch(listAdviserBatch(batch));
    } else {
      history.push('/');
    }
  }, [dispatch, history, facultyInfo]);

  return (
    <div className='ml-5 align-items-center'>
      <h1>
        {facultyInfo.result.Department}-{batch}
      </h1>
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
              <th>Status</th>
              <th>Grace</th>
              <th>View</th>
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

                {student.GraceDesc === 'N/A' ? (
                  <td>-</td>
                ) : (
                  <td>{student.GraceDesc}</td>
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
                {student.Requested === 'accepted' ? (
                  <td>{student.GraceMark}</td>
                ) : (
                  <td>
                    <Link>-</Link>
                  </td>
                )}
                <td>
                  <Button variant='info' className='btn btn-sm'>
                    Performance
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default BatchStudents;
