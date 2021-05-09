import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import { listAdviserBatch } from "../../actions/facultyActions";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "../Home.css";

const BatchStudents = ({ history, match }) => {
  const batch = match.params.id;
  const dispatch = useDispatch();
  const facultySignin = useSelector((state) => state.facultySignin);
  const { facultyInfo } = facultySignin;

  const adviserStudentList = useSelector((state) => state.adviserStudentList);
  const { error, students } = adviserStudentList;

  useEffect(() => {
    if (facultyInfo) {
      dispatch(listAdviserBatch(batch));
    } else {
      history.push("/");
    }
  }, [dispatch, history, facultyInfo]);

  return (
    <div className="container-fluid d-flex justify-content-center main_card">
      <div
        className="ml-5 align-items-center alllist_div"
        style={{ backgroundColor: "white" }}
      >
        <Link to="/faculty/profile" className="goback">
          <Button variant="light">
            <ArrowBackIcon /> Go Back
          </Button>
        </Link>
        <div className="card ml-5 px-3 overflow my_card list_card">
          <h1 className="list_heading text-center text-info">
            {facultyInfo.result.Department}-{batch}
          </h1>
          {error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Branch</th>
                  <th>Batch</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Grace</th>
                  <th>Performance</th>
                </tr>
              </thead>
              <tbody>
                {students.map(
                  (student) =>
                    student.Branch === facultyInfo.result.Department && (
                      <tr key={student.RollNum}>
                        <td>{student.RollNum}</td>
                        <td>{student.Name}</td>
                        <td>
                          <a href={`mailto:${student.EmailID}`}>
                            {student.EmailID}
                          </a>
                        </td>
                        <td>{student.Branch}</td>
                        <td>{student.Batch}</td>

                        {student.GraceDesc === "N/A" ? (
                          <td>-</td>
                        ) : (
                          <td>{student.GraceDesc}</td>
                        )}

                        {student.Requested === "pending" ? (
                          <td>
                            <span className="badge badge-pill badge-warning">
                              Pending
                            </span>
                          </td>
                        ) : student.Requested === "accepted" ? (
                          <td>
                            <span className="badge badge-pill badge-success mr-3">
                              Accepted
                            </span>
                          </td>
                        ) : student.Requested === "rejected" ? (
                          <td>
                            <span className="badge badge-pill badge-danger mr-3">
                              Rejected
                            </span>
                          </td>
                        ) : (
                          <td>
                            <Link>-</Link>
                          </td>
                        )}
                        {student.Requested === "accepted" ? (
                          <td>{student.GraceMark}</td>
                        ) : (
                          <td>
                            <Link>-</Link>
                          </td>
                        )}
                        <td>
                          <LinkContainer
                            to={`/student/view/marklist/${student.RollNum}-${student.Branch}-${student.Batch}`}
                          >
                            <Button variant="info" className="btn btn-sm">
                              View
                            </Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatchStudents;
