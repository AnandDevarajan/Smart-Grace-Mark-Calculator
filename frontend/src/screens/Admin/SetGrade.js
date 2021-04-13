import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
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
  const [grs, setGrs] = useState([]);

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  useEffect(() => {
    if (!adminInfo) {
      history.push('/');
    }
    axios
      .all([
        axios.get(`/course/graderange/${cid}`),
        axios.get(`/course/get/report/${cid}`),
      ])
      .then(
        axios.spread((response1, response2) => {
          console.log('hi', response1, response2);
          setGrs(response1.data.grade);
          setMaxMark(response2.data.report[0].Max);
          setMinMark(response2.data.report[0].Min);
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(minMark, maxMark);
  const setGradeRange = (max, min) => {
    if (max >= 80) {
      setO(`${max}-${max - 5}`);
      setAp(`${max - 6}-${max - 10}`);
      setA(`${max - 11}-${max - 15}`);
      setBp(`${max - 16}-${max - 20}`);
      setB(`${max - 21}-${max - 30}`);
      setC(`${max - 31}-${max - 40}`);
      setP(`${max - 41}-${max - 65}`);
      setF(`${max - 66}-0`);
    } else if (max >= 60 && max < 80) {
      setO(`${max}-${max - 4}`);
      setAp(`${max - 5}-${max - 10}`);
      setA(`${max - 11}-${max - 14}`);
      setBp(`${max - 15}-${max - 20}`);
      setB(`${max - 21}-${max - 25}`);
      setC(`${max - 26}-${max - 30}`);
      setP(`${max - 31}-${max - 49}`);
      setF(`${max - 50}-0`);
    } else if (max >= 50 && max < 60) {
      setO(`${max}-${max - 3}`);
      setAp(`${max - 4}-${max - 8}`);
      setA(`${max - 9}-${max - 12}`);
      setBp(`${max - 13}-${max - 18}`);
      setB(`${max - 19}-${max - 23}`);
      setC(`${max - 24}-${max - 39}`);
      setP(`${max - 40}-${max - 47}`);
      setF(`${max - 48}-0`);
    } else {
      setO(`${max}-${max - 3}`);
      setAp(`${max - 4}-${max - 7}`);
      setA(`${max - 7}-${max - 12}`);
      setBp(`${max - 13}-${max - 16}`);
      setB(`${max - 17}-${max - 22}`);
      setC(`${max - 23}-${max - 29}`);
      setP(`${max - 30}-${max - 39}`);
      setF(`${max - 40}-0`);
    }
    axios
      .put(`/course/graderange/${cid}`, { O, Ap, A, Bp, B, C, P, F })
      .then((response) => {
        console.log(response);
        setGrs(response.data.grade);
      });
  };

  return (
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
              {/* <td>{O}</td>
              <td>{Ap}</td>
              <td>{A}</td>
              <td>{Bp}</td>
              <td>{B}</td>
              <td>{C}</td>
              <td>{P}</td>
              <td>{F}</td> */}
              <td>
                <button
                  className='btn btn-sm btn-success'
                  onClick={() => {
                    setGradeRange(maxMark, minMark);
                  }}
                >
                  Generate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SetGrade;
