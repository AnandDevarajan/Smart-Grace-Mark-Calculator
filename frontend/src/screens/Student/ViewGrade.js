import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
const ViewGrade = ({ match, history }) => {
  let id = match.params.id;
  console.log(id);
  const [status, setStatus] = useState("");
  const [marks, setMarks] = useState([]);

  const studentSignin = useSelector((state) => state.studentSignin);
  const { studentInfo } = studentSignin;

  useEffect(() => {
    if (!studentInfo) {
      history.push("/");
    }
 
    axios
      .all([
        axios.get(`/student/view/result/${id}`),
        axios.get(`/admin/status`),
      ])
      .then(
        axios.spread((response1, response2) => {
          console.log(response1, response2);
          setMarks(response1.data.markList);
          setStatus(response2.data.status);
        })
      );
  }, [studentInfo, status]);

  console.log(status);
  return (
    <>
      {status === "Published" ? (
        <div className="ml-5 align-items-center">
          <Link to="/student/profile">
            <Button variant="light">
              <ArrowBackIcon /> Go Back
            </Button>
          </Link>

          <h1 className="py-3 text-center">Mark List</h1>

          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Internals</th>
                <th>Marks</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((mark) => (
                <tr>
                  <td>{mark.CourseID}</td>
                  <td> {mark.CourseName}</td>
                  <td>{mark.Internals}</td>
                  <td>{mark.Marks}</td>
                  <td>{mark.Total}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div>
          <h1 className="text-center">Results Not Published</h1>
        </div>
      )}
    </>
  );
};

export default ViewGrade;
