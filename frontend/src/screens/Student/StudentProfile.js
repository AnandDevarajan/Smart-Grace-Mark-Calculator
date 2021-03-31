import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import axios from 'axios';

const StudentProfile = ({ history }) => {
  const [value, onChange] = useState(new Date());
  const [dt, setDt] = useState(new Date().toLocaleString());
  useEffect(() => {
      let secTimer = setInterval( () => {
        setDt(new Date().toLocaleString())
      },1000)

      return () => clearInterval(secTimer);
  }, []);

  const [status, setStatus] = useState('');

  const studentSignin = useSelector((state) => state.studentSignin);
  const { studentInfo } = studentSignin;

  useEffect(() => {
    if (!studentInfo) {
      history.push('/');
    }
    axios
      .get(`/student/${studentInfo.result.RollNum}`)
      .then((response) => {
        setStatus(response.data.student.Requested);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [status]);

  return (
    <div className='ml-5'>
      <Row>
        <Col md={8}><h3>Welcome to Student Profile&nbsp;!!</h3></Col>  
        <Col><div className="mt-3 ml-5"><p>{dt}</p></div></Col>
      </Row> 
      <Row className="mt-5">
        <Col md={7} style={{backgroundColor : "#9FEED1" }}>
          
            <ListGroup variant='flush' className="mt-4 mb-4 ml-2">
              <ListGroup.Item>
                <h4>Name:&nbsp;&nbsp;&nbsp;<i>{studentInfo.result.Name}</i></h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Roll Number:&nbsp;&nbsp;&nbsp;<i>{studentInfo.result.RollNum}</i></h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Degree:&nbsp;&nbsp;&nbsp;<i>{studentInfo.result.Degree}</i></h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Branch:&nbsp;&nbsp;&nbsp;<i>{studentInfo.result.Branch}</i></h4>
              </ListGroup.Item>
              <ListGroup.Item><h4>Grace Mark Request:</h4>
                {' '}
                {status === 'pending' ? (
                  <Button className='btn btn-warning'>
                    Pending
                  </Button>
                ) : status === 'accepted' ? (
                  <Button className='btn btn-success'>
                    Accepted
                  </Button>
                ) : (
                  <Link className='btn btn-info my-3' to='/student/request'>
                   Click to Request
                  </Link>
                )}
              </ListGroup.Item>
            </ListGroup>
          
        </Col>
        <Col  style={{backgroundColor : "#9FEED1" }}><div className="mt-5 ml-5" ><Calendar onChange={onChange} value={value}/></div></Col>
        
      </Row>
    </div>
  );
};

export default StudentProfile;
