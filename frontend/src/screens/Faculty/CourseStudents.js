import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import { listCourseStudents } from '../../actions/studentActions';
import { addCourseMarks, listCourseMarks } from '../../actions/courseActions';
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
  const [intern, setIntern] = useState('');
  const [mark, setMark] = useState('');
  const [list, setList] = useState('');
  const [message, setMessage] = useState(null);
  let flag = 0;
  let flag1 = 0;
  let flag2 = 0;

  const dispatch = useDispatch();
  const courseStudentList = useSelector((state) => state.courseStudentList);
  const { students } = courseStudentList;

  const facultySignin = useSelector((state) => state.facultySignin);
  const { facultyInfo } = facultySignin;

  const [cid, setCid] = useState(facultyInfo.result.CourseID);

  const courseMarkList = useSelector((state) => state.courseMarkList);
  const { markList } = courseMarkList;

  const courseAddMark = useSelector((state) => state.courseAddMark);
  const { data, error } = courseAddMark;
  useEffect(() => {
    if (facultyInfo) {
      dispatch(listCourseStudents(department));
      dispatch(listCourseMarks(cid));
    } else {
      history.push('/');
    }
  }, [dispatch, history, facultyInfo, data]);

  const submitMarks = (id, internals, mark) => {
    if (internals === ' ' || mark === '') {
      setMessage(null);
      setMessage('Enter all the details');
    } else if (internals > 50 || mark > 50) {
      setMessage(null);
      setMessage('Invalid details');
    } else {
      let total = parseInt(internals) + parseInt(mark);
      dispatch(addCourseMarks(id, cid, internals, mark, total));
    }
  };

  console.log('error', error);
  console.log('data', data);
  console.log('Students', students);
  console.log('marks', markList);
  return (
    <div className='ml-5 align-items-center'>
      <Link to='/faculty/profile'>
        <Button variant='light'>
          <ArrowBackIcon /> Go Back
        </Button>
      </Link>
      <h1>STUDENT LIST - {facultyInfo.result.CourseID}</h1>
      {data !== 'Successfully Updated ' && (
        <Message variant='info'>{data}</Message>
      )}
      {message && <Message variant='info'>{message}</Message>}
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
          {students.map((student) => {
            return (
              <tr key={student.RollNum}>
                <td>{student.RollNum}</td>
                <td>{student.Name}</td>
                <td>{student.Branch}</td>
                <td>{student.Batch}</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default CourseStudents;
