import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import {
  gradeRangeDetails,
  updateGradeRange,
} from '../../actions/courseActions';
import { GRADE_RANGE_UPDATE_RESET } from '../../constants/courseConstants';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

const SetGrade = ({ match, history }) => {
  let id = match.params.id;
  let cid = id.substring(0, 8);
  let cname = id.substring(9, id.length);
  const [maxMark, setMaxMark] = useState('');
  const [minMark, setMinMark] = useState('');
  const [O, setO] = useState('');
  const [Ap, setAp] = useState('');
  const [A, setA] = useState('');
  const [Bp, setBp] = useState('');
  const [B, setB] = useState('');
  const [C, setC] = useState('');
  const [P, setP] = useState('');
  const [F, setF] = useState('');
  const [generate, setGenerate] = useState(false);
  const [status, setStatus] = useState('');
  const [grs, setGrs] = useState([]);

  const dispatch = useDispatch();

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const facultySignin = useSelector((state) => state.facultySignin);
  const { facultyInfo } = facultySignin;

  const gradeRangeUpdate = useSelector((state) => state.gradeRangeUpdate);
  const { error, success } = gradeRangeUpdate;

  useEffect(() => {
    if (success) {
      dispatch({
        type: GRADE_RANGE_UPDATE_RESET,
      });
    } else if (adminInfo || facultyInfo) {
      axios
        .all([
          axios.get(`/course/graderange/${cid}`),
          axios.get(`/course/get/report/${cid}`),
        ])
        .then(
          axios.spread((response1, response2) => {
            console.log('hi', response1, response2);
            setGrs(response1.data.grade);
            setStatus(response1.data.grade[0].status);
            setMaxMark(response2.data.report[0].Max);
            setMinMark(response2.data.report[0].Min);
          })
        )
        .catch((error) => {
          console.log(error);
        });
    }
  }, [adminInfo, minMark, maxMark, grs, success]);
  console.log(minMark, maxMark);

  const setGradeRange = (max) => {
    dispatch(updateGradeRange(cid, max));
  };

  return (
    <>
      {adminInfo && (
        <div>
          <Link to='/admin/course/report'>
            <Button variant='light'>
              <ArrowBackIcon /> Go Back
            </Button>
          </Link>
          <h3 style={{ textTransform: 'capitalize' }}>
            Grade Range - <span>{cname}</span>
          </h3>
          <p className='text-center'></p>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Course ID</th>

                <th>O</th>
                <th>A+</th>
                <th>A</th>
                <th>B+</th>
                <th>B</th>
                <th>C</th>
                <th>P</th>
                <th>F</th>
                <th>Set Grade</th>
              </tr>
            </thead>
            <tbody>
              {grs.map((gr) => (
                <tr>
                  <td>{cid}</td>
                  <td>{gr.O}</td>
                  <td>{gr.Ap}</td>
                  <td>{gr.A}</td>
                  <td>{gr.Bp}</td>
                  <td>{gr.B}</td>
                  <td>{gr.C}</td>
                  <td>{gr.P}</td>
                  <td>{gr.F}</td>
                  <td>
                    <button
                      className='btn btn-sm btn-warning'
                      onClick={() => {
                        setGradeRange(maxMark);
                      }}
                    >
                      GENERATE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {facultyInfo && status === 'P' && (
        <div>
          <Link to={`/faculty/students/CSE`}>
            <Button variant='light'>
              <ArrowBackIcon /> Go Back
            </Button>
          </Link>
          <h3 style={{ textTransform: 'capitalize' }}>
            Grade Range - <span>{id}</span>
          </h3>

          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Course ID</th>
                <th>O</th>
                <th>A+</th>
                <th>A</th>
                <th>B+</th>
                <th>B</th>
                <th>C</th>
                <th>P</th>
                <th>F</th>
              </tr>
            </thead>
            <tbody>
              {grs.map((gr) => (
                <tr>
                  <td>{cid}</td>
                  <td>{gr.O}</td>
                  <td>{gr.Ap}</td>
                  <td>{gr.A}</td>
                  <td>{gr.Bp}</td>
                  <td>{gr.B}</td>
                  <td>{gr.C}</td>
                  <td>{gr.P}</td>
                  <td>{gr.F}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      {facultyInfo && status === 'N/P' && (
        <div>
          <Link to={`/faculty/students/CSE`}>
            <Button variant='light'>
              <ArrowBackIcon /> Go Back
            </Button>
          </Link>
          <h4 className='text-center'>GRADE RANGES NOT SET</h4>
        </div>
      )}
    </>
  );
};

export default SetGrade;
