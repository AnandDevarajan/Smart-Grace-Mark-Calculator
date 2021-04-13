import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import { gradeRangeDetails } from '../../actions/courseActions';
import { Table, Button } from 'react-bootstrap';
const CourseReport = ({ history }) => {
  const [reports, setReports] = useState([]);

  const dispatch = useDispatch();

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;
  const gradeRange = useSelector((state) => state.gradeRange);
  const { error, success } = gradeRange;

  useEffect(() => {
    if (!adminInfo) {
      history.push('/');
    }
    dispatch(AllgradeRangeDetails());
    axios
      .get('/course/report')
      .then((response) => {
        setReports(response.data.report);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [adminInfo, reports]);

  return (
    <div className='ml-5 align-items-center'>
      <Link to='/admin/profile'>
        <Button variant='light'>
          <ArrowBackIcon /> Go Back
        </Button>
      </Link>

      <h1 className='py-3 text-center'>Course Report</h1>

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
                {report.status === 'NP' && (
                  <Link
                    className='btn btn-sm btn-success'
                    to={`/admin/set/grade/${report.CourseID}-${report.CourseName}`}
                  >
                    Set Grade
                  </Link>
                )}
                {report.status === 'P' && (
                  <Link
                    className='btn btn-sm btn-success'
                    to={`/admin/set/grade/${report.CourseID}-${report.CourseName}`}
                  >
                    View Grade
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
