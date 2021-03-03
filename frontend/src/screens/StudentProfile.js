import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
  }, []);

  return (
    <div className='ml-5'>
      <h3>Welcome to Student Profile</h3>
      <Row>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h4>{studentInfo.result.Name}</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>{studentInfo.result.RollNum}</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>{studentInfo.result.Degree}</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>{studentInfo.result.Branch}</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                {' '}
                {status === 'pending' ? (
                  <Button className='btn btn-warning'>
                    Grace mark request Pending
                  </Button>
                ) : status === 'accepted' ? (
                  <Button className='btn btn-success'>
                    Grace mark request Accepted
                  </Button>
                ) : (
                  <Link className='btn btn-info my-3' to='/student/request'>
                    Request for Grace Mark
                  </Link>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col md={4}></Col>
        <Col md={4}></Col>
      </Row>
    </div>
  );
};

export default StudentProfile;
