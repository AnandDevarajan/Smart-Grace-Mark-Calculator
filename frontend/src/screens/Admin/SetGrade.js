import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import {
  gradeRangeDetails,
  updateGradeRange,
} from '../../actions/courseActions';
import { GRADE_RANGE_UPDATE_RESET } from '../../constants/courseConstants';
import { Table, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const SetGrade = ({ match, history }) => {
  let id = match.params.id;
  let cid = id.substring(0, 8);
  let cname = id.substring(9, id.length);
  const [maxMark, setMaxMark] = useState('');
  const [minMark, setMinMark] = useState('');

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
        <div className='ml-5 align-items-center alllist_div'>
          <Link to='/admin/course/report' className='goback'>
            <Button variant='light'>
              <ArrowBackIcon /> Go Back
            </Button>
          </Link>
          <h2 className='text-center list_heading'>Grade Range</h2>
          <Row className='align-items-center '>
            <Col className='text-left'>
              <Button style={{ width: '100%' }}>
                {cid} - {cname}
              </Button>
            </Col>
          </Row>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Course ID</th>

                <th>
                  <Button
                    className='btn btn-sm'
                    style={{ backgroundColor: '#289672', width: '46px' }}
                  >
                    O
                  </Button>
                </th>
                <th>
                  {' '}
                  <Button
                    className='btn btn-sm'
                    style={{ backgroundColor: '#29bb89', width: '46px' }}
                  >
                    A+
                  </Button>
                </th>
                <th>
                  {' '}
                  <Button
                    className='btn btn-sm'
                    style={{ backgroundColor: '#29bb89', width: '46px' }}
                  >
                    A
                  </Button>
                </th>
                <th>
                  {' '}
                  <Button
                    className='btn btn-sm btn-success'
                    style={{ width: '46px' }}
                  >
                    B+
                  </Button>
                </th>
                <th>
                  {' '}
                  <Button
                    className='btn btn-sm btn-success'
                    style={{ width: '46px' }}
                  >
                    B
                  </Button>
                </th>
                <th>
                  {' '}
                  <Button
                    className='btn btn-sm btn-warning'
                    style={{ width: '46px' }}
                  >
                    C
                  </Button>
                </th>
                <th>
                  {' '}
                  <Button
                    className='btn btn-sm btn-danger'
                    style={{ width: '46px' }}
                  >
                    P
                  </Button>
                </th>
                <th>
                  {' '}
                  <Button
                    className='btn btn-sm'
                    style={{ backgroundColor: '#be0000', width: '46px' }}
                  >
                    F
                  </Button>
                </th>
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
          <Link to={`/faculty/students/CSE`} className='goback'>
            <Button variant='light'>
              <ArrowBackIcon /> Go Back
            </Button>
          </Link>
          <h2 className='text-center list_heading'>Grade Range</h2>
          <Row className='align-items-center '>
            <Col className='text-left'>
              <Button style={{ width: '100%' }}>
                {cid}
              </Button>
            </Col>
          </Row>

          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Course ID</th>
                <th>
                  <Button
                    className='btn btn-sm'
                    style={{ backgroundColor: '#289672', width: '46px' }}
                  >
                    O
                  </Button>
                </th>
                <th>
                  {' '}
                  <Button
                    className='btn btn-sm'
                    style={{ backgroundColor: '#29bb89', width: '46px' }}
                  >
                    A+
                  </Button>
                </th>
                <th>
                  {' '}
                  <Button
                    className='btn btn-sm'
                    style={{ backgroundColor: '#29bb89', width: '46px' }}
                  >
                    A
                  </Button>
                </th>
                <th>
                  {' '}
                  <Button
                    className='btn btn-sm btn-success'
                    style={{ width: '46px' }}
                  >
                    B+
                  </Button>
                </th>
                <th>
                  {' '}
                  <Button
                    className='btn btn-sm btn-success'
                    style={{ width: '46px' }}
                  >
                    B
                  </Button>
                </th>
                <th>
                  {' '}
                  <Button
                    className='btn btn-sm btn-warning'
                    style={{ width: '46px' }}
                  >
                    C
                  </Button>
                </th>
                <th>
                  {' '}
                  <Button
                    className='btn btn-sm btn-danger'
                    style={{ width: '46px' }}
                  >
                    P
                  </Button>
                </th>
                <th>
                  {' '}
                  <Button
                    className='btn btn-sm'
                    style={{ backgroundColor: '#be0000', width: '46px' }}
                  >
                    F
                  </Button>
                </th>
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
