import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import EmailIcon from "@material-ui/icons/Email";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import PersonIcon from "@material-ui/icons/Person";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import CheckIcon from "@material-ui/icons/Check";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CloseIcon from "@material-ui/icons/Close";
import PhoneIcon from "@material-ui/icons/Phone";
import HomeIcon from "@material-ui/icons/Home";
import SchoolIcon from "@material-ui/icons/School";
import ClassIcon from "@material-ui/icons/Class";
import PublishIcon from "@material-ui/icons/Publish";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Container,
  Form,
} from "react-bootstrap";
import axios from "axios";

const FacultyProfile = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [value, onChange] = useState(new Date());
  const facultySignin = useSelector((state) => state.facultySignin);
  const { facultyInfo } = facultySignin;

  useEffect(() => {
    if (!facultyInfo) {
      history.push("/");
    }
    axios
      .get(`/faculty/${facultyInfo.result.FacultyID}`)
      .then((response) => {
        setName(response.data.faculty.Name);
        setEmail(response.data.faculty.EmailID);
        setDepartment(response.data.faculty.Department);
        setPhone(response.data.faculty.PhoneNum);
        setAddress(response.data.faculty.Address);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [facultyInfo, name, email, address, department, phone]);

  const deleteMyAccount = (id) => {
    if (window.confirm("Do you want to delete this account ?")) {
      axios.delete(`/faculty/delete/account/${id}`);
    } else {
      return (window.location.pathname = "/faculty/profile");
    }
    localStorage.removeItem("facultyInfo");
    window.location.pathname = "/";
  };

  return (
    <div
      className="ml-5 mt-3 align-items-center alllist_div"
      style={{ backgroundColor: "white" }}
    >
      <div className="card ml-5 px-3 overflow my_card">
        <div className="overflow">
          <h1 className="text-success">Faculty Profile</h1>
          <p className="lead mt-2">
            <AccountBoxIcon style={{ color: "#2196f3" }} /> Welcome{" "}
            <span className="text-info"> {name}</span>
          </p>
          <Row className="mt-4">
            <Col>
              <Link
                to={`/faculty/edit/profile/${facultyInfo.result.FacultyID}`}
                style={{ textDecoration: "None" }}
              >
                <EditTwoToneIcon />{" "}
                <Button className="btn btn-sm">Edit Profile</Button>
              </Link>
            </Col>
            <Col></Col>
            <Col>
              <DeleteForeverIcon
                className="icon"
                onClick={() => deleteMyAccount(facultyInfo.result.FacultyID)}
              />{" "}
              <Button
                className="btn btn-sm btn-danger"
                onClick={() => deleteMyAccount(facultyInfo.result.FacultyID)}
              >
                Delete My Account
              </Button>
            </Col>
          </Row>
          <h2 className="mt-4" style={{ textTransform: "Capitalize" }}>
            <PersonIcon style={{ color: "#2196f3" }} /> Faculty Details
          </h2>
          <table striped bordered hover responsive className="table table-sm">
            <thead>
              <tr>
                <th>
                  <FormatListNumberedIcon /> Faculty ID
                </th>

                <th>
                  <SchoolIcon /> Department
                </th>
                <th>
                  <ImportContactsIcon /> Course ID
                </th>
                <th>
                  <ClassIcon /> Advisor
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td width="365px">ID {facultyInfo.result.FacultyID}</td>
                <td width="365px">{department}</td>
                <td width="365px">{facultyInfo.result.CourseID}</td>
                {facultyInfo.result.ClassAdviser === "Yes" ? (
                  <td width="365px">
                    <CheckIcon style={{ color: "green" }} />
                    {facultyInfo.result.Batch}
                  </td>
                ) : (
                  <td>
                    <CloseIcon style={{ color: "red" }} />
                  </td>
                )}
              </tr>
            </tbody>
          </table>
          <h2 className="mt-4" style={{ textTransform: "Capitalize" }}>
            <ContactSupportIcon style={{ color: "#2196f3" }} /> Contact Details
          </h2>
          <table striped bordered hover responsive className="table table-sm">
            <thead>
              <tr>
                <th>
                  {" "}
                  <EmailIcon /> Email
                </th>
                <th className="hide-sm">
                  <PhoneIcon /> Phone Number
                </th>
                <th className="hide-sm">
                  <HomeIcon /> Address
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td width="365px">{email}</td>
                <td width="365px">+91 {phone}</td>
                <td width="365px">{address}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;
