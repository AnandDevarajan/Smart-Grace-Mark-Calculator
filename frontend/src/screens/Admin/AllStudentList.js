import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import PageviewIcon from "@material-ui/icons/Pageview";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  listStudents,
  requestAccept,
  requestReject,
} from "../../actions/studentActions";
import { Link } from "react-router-dom";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import "../Home.css";

const AllStudentList = ({ history }) => {
  const dispatch = useDispatch();

  const studentList = useSelector((state) => state.studentList);
  const { error, students } = studentList;

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  useEffect(() => {
    if (adminInfo) {
      dispatch(listStudents());
    } else {
      history.push("/");
    }
  }, [dispatch, history, adminInfo]);

  const acceptHandler = (id) => {
    dispatch(requestAccept(id));
    dispatch(listStudents());
  };

  const rejectHandler = (id) => {
    dispatch(requestReject(id));
    dispatch(listStudents());
  };
  console.log(students);

  return (
    <div
      className="ml-5 align-items-center alllist_div"
      style={{ backgroundColor: "white" }}
    >
      <Link to="/admin/profile" className="goback">
        <Button variant="light" className="ml-5">
          <ArrowBackIcon /> Go Back
        </Button>
      </Link>
      <div className="card  overflow my_card">
        <h1 className="text-center list_heading text-info">STUDENT LIST</h1>
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
                <th>Marks</th>
                <th>Reason</th>
                <th>Grace</th>
                <th>Request</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.RollNum}>
                  <td>{student.RollNum}</td>
                  <td>{student.Name}</td>
                  <td>
                    <a href={`mailto:${student.EmailID}`}>{student.EmailID}</a>
                  </td>
                  <td>{student.Branch}</td>
                  <td>{student.Batch}</td>
                  <td className="text-center">
                    {student.cgpa_status === "N/P" ? (
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
                  {student.GraceDesc === "N/A" ? (
                    <td>-</td>
                  ) : (
                    <td>{student.GraceDesc}</td>
                  )}
                  {student.Requested === "accepted" ? (
                    <td>{student.GraceMark}</td>
                  ) : (
                    <td>-</td>
                  )}
                  <td>
                    {student.Requested === "pending" ? (
                      <span className="badge badge-pill badge-warning mr-3">
                        Pending
                      </span>
                    ) : student.Requested === "accepted" ? (
                      <span className="badge badge-pill badge-success mr-3">
                        Accepted
                      </span>
                    ) : student.Requested === "rejected" ? (
                      <span className="badge badge-pill badge-danger mr-3">
                        Rejected
                      </span>
                    ) : student.Requested === "Grace Added" ? (
                      <span className="badge badge-pill badge-success mr-3">
                        Grace Added
                      </span>
                    ) : (
                      <Link>-</Link>
                    )}
                  </td>
                  {student.Requested === "pending" && (
                    <td>
                      <CheckIcon
                        className="icon"
                        style={{ color: "green" }}
                        onClick={() => acceptHandler(student.RollNum)}
                      />
                    </td>
                  )}
                  {student.Requested === "pending" && (
                    <td>
                      <ClearIcon
                        className="icon"
                        style={{ color: "red" }}
                        onClick={() => rejectHandler(student.RollNum)}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default AllStudentList;
