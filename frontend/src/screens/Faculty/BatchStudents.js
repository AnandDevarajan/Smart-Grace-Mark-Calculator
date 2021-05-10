import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import { listAdviserBatch } from "../../actions/facultyActions";
import { Link } from "react-router-dom";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PageviewIcon from "@material-ui/icons/Pageview";
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
    <div
      className="ml-5 align-items-center alllist_div signup_card"
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
                <th>Reason</th>
                <th>Status</th>
                <th>Grace</th>
                <th>Marks</th>
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
                      <td className="text-center">
                        {student.grace_status === "N/P" &&
                        student.Requested === "accepted" ? (
                          <AutorenewIcon
                            onClick={() =>
                              (window.location.pathname = `/student/view/marklist/${student.RollNum}-${student.Branch}-${student.Batch}`)
                            }
                            className="icon"
                            style={{ color: "#ffc93c" }}
                          />
                        ) : (
                          <PageviewIcon
                            onClick={() =>
                              (window.location.pathname = `/student/view/marklist/${student.RollNum}-${student.Branch}-${student.Batch}`)
                            }
                            className="icon"
                            style={{ color: "#1597bb" }}
                          />
                        )}
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default BatchStudents;
