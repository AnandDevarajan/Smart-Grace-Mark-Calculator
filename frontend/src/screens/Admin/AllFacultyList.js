import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import { listFaculties } from "../../actions/facultyActions";
import CheckIcon from "@material-ui/icons/Check";
import NotificationsIcon from "@material-ui/icons/Notifications";
import CloseIcon from "@material-ui/icons/Close";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import axios from "axios";
const AllFacultyList = ({ history }) => {
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  const facultyList = useSelector((state) => state.facultyList);
  const { error, faculties } = facultyList;

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  useEffect(() => {
    if (adminInfo) {
      dispatch(listFaculties());
    } else {
      history.push("/");
    }
  }, [dispatch, history, adminInfo]);

  console.log(faculties);

  const notifyFaculty = (id) => {
    setMessage(`Notification send to Faculty ID : ${id}`);
    const config = {
      headers: { Authorization: `Bearer ${adminInfo.token}` },
    };
    axios.get(`/admin/notify/faculty/${id}`, config).then((response) => {});
  };

  return (
    <div
      className="ml-5 align-items-center alllist_div"
      style={{ backgroundColor: "white" }}
    >
      <Link to="/admin/profile" className="goback">
        <Button variant="light">
          <ArrowBackIcon /> Go Back
        </Button>
      </Link>

      <div className="card  overflow my_card">
        {message != null && <Message variant="success">{message}</Message>}
        <h1 className="text-center list_heading text-info">Faculty LIST</h1>
        {error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Faculty ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Course ID</th>
                <th>Class Adviser</th>
                <th>Batch</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {faculties.map((faculty) => (
                <tr key={faculty.FacultyID}>
                  <td>{faculty.FacultyID}</td>
                  <td>{faculty.Name}</td>
                  <td>
                    <a href={`mailto:${faculty.EmailID}`}>{faculty.EmailID}</a>
                  </td>
                  <td>{faculty.PhoneNum}</td>
                  <td>{faculty.Department}</td>
                  <td>{faculty.CourseID}</td>
                  <td>
                    {faculty.ClassAdviser === "Yes" ? (
                      <CheckIcon style={{ color: "green" }} />
                    ) : (
                      <CloseIcon style={{ color: "red" }} />
                    )}
                  </td>
                  {faculty.Batch !== "N/A" ? (
                    <td>{faculty.Batch}</td>
                  ) : (
                    <td>-</td>
                  )}
                  {faculty.completion === "Yes" && (
                    <td>
                      {" "}
                      <DoneAllIcon
                        className="icon"
                        style={{ color: "green" }}
                      />
                    </td>
                  )}
                  {faculty.completion !== "Yes" && (
                    <td>
                      <NotificationsIcon
                        onClick={() => notifyFaculty(faculty.FacultyID)}
                        className="icon"
                        style={{ height: "20px", color: "#ff1414" }}
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

export default AllFacultyList;
