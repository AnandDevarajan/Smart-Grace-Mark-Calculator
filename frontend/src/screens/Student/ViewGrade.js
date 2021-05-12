import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";

const ViewGrade = ({ match, history }) => {
  let id = match.params.id;
  console.log(id);
  const [status, setStatus] = useState("");
  const [marks, setMarks] = useState([]);
  const [cgpa, setCgpa] = useState("");

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
        axios.get(`/student/${studentInfo.result.RollNum}`),
      ])
      .then(
        axios.spread((response1, response2, response3) => {
          setMarks(response1.data.markList);
          setStatus(response2.data.status);
          setCgpa(response3.data.student.final_cgpa);
        })
      );
  }, [studentInfo, status]);

  console.log(status);
  return (
    <>
      {status === "Published" && (
        <div className="ml-5 align-items-center result-table result_card">
          <Link to="/student/profile">
            <Button variant="light go-back">
              <ArrowBackIcon /> Go Back
            </Button>
          </Link>
          <h1 className="text-center text-info result-text">Result</h1>
          <div className="card ml-5  overflow my_card">
            <Row>
              <Button className="mr-auto  ml-3 btn-light btn-outline-secondary">
                {studentInfo.result.RollNum}
              </Button>
              <Button className="ml-auto cgpa_btn mr-3"> Cgpa {cgpa}</Button>
            </Row>

            <Table striped bordered hover responsive className="table-sm ">
              <thead>
                <tr>
                  <th>Course ID</th>
                  <th>Course Name</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {marks.map((mark) => (
                  <tr>
                    <td>{mark.CourseID}</td>
                    <td> {mark.CourseName}</td>
                    <td className="text-center">
                      {mark.Final_Grade === "O" && (
                        <Button
                          className="btn btn-sm"
                          style={{ backgroundColor: "#289672", width: "46px" }}
                        >
                          O
                        </Button>
                      )}
                      {mark.Final_Grade === "A+" && (
                        <Button
                          className="btn btn-sm"
                          style={{ backgroundColor: "#29bb89", width: "46px" }}
                        >
                          A+
                        </Button>
                      )}
                      {mark.Final_Grade === "A" && (
                        <Button
                          className="btn btn-sm"
                          style={{ backgroundColor: "#29bb89", width: "46px" }}
                        >
                          A
                        </Button>
                      )}
                      {mark.Final_Grade === "B+" && (
                        <Button
                          className="btn btn-sm btn-success"
                          style={{ width: "46px" }}
                        >
                          B+
                        </Button>
                      )}
                      {mark.Final_Grade === "B" && (
                        <Button
                          className="btn btn-sm btn-success"
                          style={{ width: "46px" }}
                        >
                          B
                        </Button>
                      )}
                      {mark.Final_Grade === "C" && (
                        <Button
                          className="btn btn-sm btn-warning"
                          style={{ width: "46px" }}
                        >
                          C
                        </Button>
                      )}
                      {mark.Final_Grade === "P" && (
                        <Button
                          className="btn btn-sm btn-danger"
                          style={{ width: "46px" }}
                        >
                          P
                        </Button>
                      )}
                      {mark.Final_Grade === "F" && (
                        <Button
                          className="btn btn-sm"
                          style={{ backgroundColor: "#be0000", width: "46px" }}
                        >
                          F
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
                <tr></tr>
              </tbody>
            </Table>
          </div>
        </div>
      )}
      {status === "Not Published" && (
        <div className="result_card">
          <h1 className="text-center signup_card text-info">
            Results Not Published
          </h1>
        </div>
      )}
    </>
  );
};

export default ViewGrade;
