import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import { courseStudentMark } from '../../actions/studentActions';
import { updateCoursemark } from '../../actions/courseActions';
import { Link } from 'react-router-dom';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import '../Home.css';
import EditIcon from '@material-ui/icons/Edit';

const CourseStudents = ({ history, match }) => {
  const [message, setMessage] = useState(null);
  const [internals, setInternals] = useState('');
  const [marks, setMarks] = useState('');
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const facultySignin = useSelector((state) => state.facultySignin);
  const { facultyInfo } = facultySignin;

  const courseDetails = useSelector((state) => state.courseDetails);
  const { error, markList } = courseDetails;

  const courseStudentMarkList = useSelector(
    (state) => state.courseStudentMarkList
  );
  const { students } = courseStudentMarkList;
  const [cid, setCid] = useState(facultyInfo.result.CourseID);

  useEffect(() => {
    if (facultyInfo) {
      dispatch(courseStudentMark(cid));
    } else {
      history.push('/');
    }
  }, [dispatch, history, facultyInfo, edit]);

  const submitMarks = (id, internals, marks) => {
    if (internals === ' ' || marks === '') {
      setMessage(null);
      setMessage('Enter all the details');
    } else if (internals > 50 || marks > 50) {
      setMessage(null);

      setMessage('Invalid details');
    } else {
      dispatch(updateCoursemark(id, cid, internals, marks));
      window.location.pathname = `/faculty/students/${facultyInfo.result.Department}`;
    }
  };

  return (
    <>
      <div className='ml-5 align-items-center'>
        <Link to='/faculty/profile'>
          <Button variant='light'>
            <ArrowBackIcon /> Go Back
          </Button>
        </Link>
        <Row className='align-items-center'>
          <Col>
            <h1>STUDENT LIST - {facultyInfo.result.CourseID}</h1>
          </Col>
          <Col className='text-right'>
            <Link to={`/admin/set/grade/${facultyInfo.result.CourseID}`}>
              <Button>View Grade Ranges</Button>
            </Link>
          </Col>
        </Row>
        {message && <Message variant='info'>{message}</Message>}
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr style={{ color: 'black' }}>
              <th>Roll No</th>
              <th>Name</th>
              <th>Branch</th>
              <th>Batch</th>
              <th>Internals</th>
              <th>Marks</th>
              <th>Total </th>
              <th></th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.RollNum}>
                <td>{student.RollNum}</td>
                <td>{student.Name}</td>
                <td>{student.Branch}</td>
                <td>{student.Batch}</td>
                <td>
                  {student.Internals === 'N/P' ? (
                    <input onChange={(e) => setInternals(e.target.value)} />
                  ) : (
                    <td>{student.Internals}</td>
                  )}
                </td>
                <td>
                  {student.Marks === 'N/P' ? (
                    <input onChange={(e) => setMarks(e.target.value)} />
                  ) : (
                    <td>{student.Marks}</td>
                  )}
                </td>
                <td>
                  <td>{student.Total}</td>
                </td>
                {student.Total === 'N/P' ? (
                  <td>
                    <CheckBoxIcon
                      className='icon'
                      style={{ color: 'green' }}
                      onClick={() => {
                        submitMarks(student.RollNum, internals, marks);
                      }}
                    />
                  </td>
                ) : (
                  <td>
                    {' '}
                    <LinkContainer
                      to={`/faculty/course/mark/edit/${student.RollNum}`}
                    >
                      <EditIcon className='icon' />
                    </LinkContainer>
                  </td>
                )}
                <td>
                  <td>{student.Grade}</td>
                </td>
                <td>
                  {student.Grade === 'N/P' ? (
                    <Button className='btn-sm btn-success'>
                      Calculate Grade
                    </Button>
                  ) : (
                    <td></td>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default CourseStudents;
