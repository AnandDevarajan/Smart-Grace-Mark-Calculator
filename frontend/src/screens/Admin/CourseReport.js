import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import { allGradeRangeDetails } from '../../actions/courseActions';
import { Table, Button } from 'react-bootstrap';
const CourseReport = ({ history }) => {
  const [reports, setReports] = useState([]);

  const dispatch = useDispatch();

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;
  const allGradeRange = useSelector((state) => state.allGradeRange);
  const { allgrade } = allGradeRange;

  useEffect(() => {
    if (!adminInfo) {
      history.push('/');
    }
    dispatch(allGradeRangeDetails());
    axios
      .get('/course/report')
      .then((response) => {
        setReports(response.data.report);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [adminInfo, reports]);

  console.log(reports);
  return (
    <div
      className='ml-5 align-items-center alllist_div'
      style={{ backgroundColor: 'white' }}
    >
      <Link to='/admin/profile' className='goback'>
        <Button variant='light'>
          <ArrowBackIcon /> Go Back
        </Button>
      </Link>

      <h1 className='text-center list_heading'>Course Report</h1>

      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Min </th>
            <th>Max</th>
            <th>Average</th>
            <th>Number of Students</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr>
              <td>{report.CourseID}</td>
              <td>{report.CourseName}</td>
              <td>{report.Min}</td>
              <td>{report.Max}</td>
              <td>
                {Number.isInteger(report.Average)
                  ? report.Average
                  : report.Average.toFixed(2)}
              </td>
              <td>{report.Num}</td>
              <td>
                {report.status === 'P' ? (
                  <Link
                    className='btn btn-sm btn-primary'
                    to={`/admin/set/grade/${report.CourseID}-${report.CourseName}`}
                  >
                    View Grade
                  </Link>
                ) : (
                  <Link
                    className='btn btn-sm btn-success'
                    style={{ width: '108px' }}
                    to={`/admin/set/grade/${report.CourseID}-${report.CourseName}`}
                  >
                    Set Grade
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CourseReport;
