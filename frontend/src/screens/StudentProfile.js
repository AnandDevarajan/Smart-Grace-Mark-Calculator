import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
const StudentProfile = () => {
  const studentSignin = useSelector((state) => state.studentSignin);
  const { studentInfo } = studentSignin;
  return (
    <div>
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
            </ListGroup>
          </Card>
        </Col>
        <Col md={4}></Col>
        <Col md={4}></Col>
      </Row>
      <Button></Button>
    </div>
  );
};

export default StudentProfile;
