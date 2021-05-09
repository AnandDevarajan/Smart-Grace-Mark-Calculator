import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import EmailIcon from "@material-ui/icons/Email";
import PersonIcon from "@material-ui/icons/Person";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import PhoneIcon from "@material-ui/icons/Phone";
import NotificationsIcon from "@material-ui/icons/Notifications";
import EventIcon from "@material-ui/icons/Event";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import HomeIcon from "@material-ui/icons/Home";
import PublishIcon from "@material-ui/icons/Publish";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import CloseIcon from "@material-ui/icons/Close";
import Message from "../../components/Message";
import { Row, Col, ListGroup, Image, Container, Button } from "react-bootstrap";
import axios from "axios";
import "./Admin.css";

const AdminProfile = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState("");

  const gracemarkCreate = useSelector((state) => state.gracemarkCreate);
  const { success, error } = gracemarkCreate;

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  useEffect(() => {
    if (!adminInfo) {
      history.push("/");
    }
    axios
      .all([
        axios.get(`/admin/${adminInfo.result.adminID}`),
        axios.get(`/admin/status`),
      ])
      .then(
        axios.spread((response1, response2) => {
          console.log(response2.data.status);
          setName(response1.data.admin.Name);
          setEmail(response1.data.admin.EmailID);
          setPhone(response1.data.admin.PhoneNum);
          setAddress(response1.data.admin.Address);
          setStatus(response2.data.status);
        })
      );
  }, [adminInfo, name, email, address, phone.replace, status, message]);

  const publishResult = () => {
    const config = {
      headers: { Authorization: `Bearer ${adminInfo.token}` },
    };
    axios
      .get("/admin/publish/result", config)
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const resetPublish = () => {
    const config = {
      headers: { Authorization: `Bearer ${adminInfo.token}` },
    };
    axios
      .get("/admin/reset/publish", config)
      .then((response) => {
        setMessage(response.data.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log("stat", status);
  console.log("msg", message);

  const deleteMyAccount = (id) => {
    if (window.confirm("Do you want to delete this account ?")) {
      axios.delete(`/admin/delete/account/${id}`);
    } else {
      return (window.location.pathname = "/admin/profile");
    }
    localStorage.removeItem("adminInfo");
    window.location.pathname = "/";
  };

  return (
    <div
      className="ml-5 mt-3 align-items-center alllist_div profile_card"
      style={{ backgroundColor: "white" }}
    >
      <div className="card ml-5 px-3 overflow my_card">
        <div className="overflow">
          {status === "Not Published" &&
            message ===
              "Unable to Publish Results now. Mark allocation is yet to be completed" && (
              <Message variant="danger">
                <NotificationsIcon /> Unable to Publish Results now. Grade
                allocation is yet to be completed
              </Message>
            )}
          {status === "Published" && (
            <Message variant="success">
              <NotificationsIcon /> Results published
            </Message>
          )}
          <h1 className="text-success">Admin Profile</h1>
          <p className="lead mt-2">
            <AccountBoxIcon style={{ color: "#2196f3" }} /> Welcome{" "}
            <span className="text-info"> {name}</span>
          </p>
          <Row className="mt-4">
            <Col>
              <Link
                to={`/admin/edit/profile/${adminInfo.result.adminID}`}
                style={{ textDecoration: "None" }}
              >
                <EditTwoToneIcon />{" "}
                <Button className="btn btn-sm apply">Edit Profile</Button>
              </Link>
            </Col>
            <Col>
              {status === "Not Published" && (
                <Link onClick={publishResult}>
                  <PublishIcon className="mr-2" />
                  <button
                    className="btn btn-sm btn-info apply"
                    style={{ width: "120px" }}
                  >
                    Publish Results
                  </button>
                </Link>
              )}

              {status === "Published" && (
                <>
                  <PublishIcon className="mr-2" />
                  <button
                    className="btn btn-sm btn-warning mr-5 apply"
                    onClick={publishResult}
                    style={{ width: "120px" }}
                  >
                    Published
                  </button>
                  <CloseIcon
                    className="icon"
                    style={{ color: "red" }}
                    onClick={resetPublish}
                  />
                </>
              )}
            </Col>
            <Col>
              <DeleteForeverIcon
                className="icon"
                onClick={() => deleteMyAccount(adminInfo.result.adminID)}
              />{" "}
              <Button
                className="btn btn-sm btn-danger apply"
                onClick={() => deleteMyAccount(adminInfo.result.adminID)}
              >
                Delete My Account
              </Button>
            </Col>
          </Row>
          <h2 className="mt-4" style={{ textTransform: "Capitalize" }}>
            <PersonIcon style={{ color: "#2196f3" }} /> Admin Details
          </h2>
          <table striped bordered hover responsive className="table table-sm">
            <thead>
              <tr>
                <th>
                  <FormatListNumberedIcon /> Admin ID
                </th>

                <th>
                  <EventIcon /> DOB
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td width="365px">ID {adminInfo.result.adminID}</td>
                <td width="365px">{adminInfo.result.DOB.substring(0, 10)}</td>
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
                  <EmailIcon />
                  <span>Email</span>
                </th>
                <th className="hide-sm">
                  <PhoneIcon /> <span>Phone Number</span>
                </th>
                <th className="hide-sm np">
                  <HomeIcon />
                  <span>Address</span>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td width="365px">{email}</td>
                <td width="365px">+91 {phone}</td>
                <td width="365px" className="np">
                  {address}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
