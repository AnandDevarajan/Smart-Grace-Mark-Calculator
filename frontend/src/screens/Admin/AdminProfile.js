import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import EmailIcon from "@material-ui/icons/Email";
import PersonIcon from "@material-ui/icons/Person";
import PhoneIcon from "@material-ui/icons/Phone";
import HomeIcon from "@material-ui/icons/Home";
import PublishIcon from "@material-ui/icons/Publish";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import CloseIcon from "@material-ui/icons/Close";
import { Row, Col, ListGroup, Image } from "react-bootstrap";
import axios from "axios";

const AdminProfile = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState("");
  const [value, onChange] = useState(new Date());

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
  }, [adminInfo, name, email, address, phone, status]);

  const publishResult = () => {
    const config = {
      headers: { Authorization: `Bearer ${adminInfo.token}` },
    };
    axios
      .get("/admin/publish/result", config)
      .then((response) => {
        setStatus("Published");
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
        setStatus(response.data.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log("changed", status);

  console.log(message);
  return (
    <div className="ml-5">
      <Row className="mt-5">
        <Col md={2} sm={4}>
          <Image
            className="mt-5 mr-5"
            src="https://static.thenounproject.com/png/371299-200.png"
            style={{
              height: "200px",
              width: "200px",
              objectFit: "contain",
            }}
          />
        </Col>
        <Col md={7} sm={4}>
          <ListGroup className="mt-3 mb-4 ml-5">
            <h4 className="text-center btn btn-block btn-success">
              Admin Profile
            </h4>
            <ListGroup.Item
              style={{ backgroundColor: "#1e212d", color: "#eeeeee" }}
            >
              <h4 style={{ textTransform: "capitalize" }}>
                <PersonIcon />
                :&nbsp;&nbsp;&nbsp;
                {name}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item
              style={{ backgroundColor: "#1e212d", color: "#eeeeee" }}
            >
              <h4 style={{ textTransform: "lowercase" }}>
                <EmailIcon />
                :&nbsp;&nbsp;&nbsp;{email}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item
              style={{ backgroundColor: "#1e212d", color: "#eeeeee" }}
            >
              <h4>
                <PhoneIcon />
                :&nbsp;&nbsp;&nbsp;
                {phone}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item
              style={{ backgroundColor: "#1e212d", color: "#eeeeee" }}
            >
              <h4 style={{ textTransform: "capitalize" }}>
                <HomeIcon />
                :&nbsp;&nbsp;&nbsp;{address}
              </h4>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3} sm={4}>
          <ListGroup className=" ml-5" style={{ marginTop: "75px" }}>
            <ListGroup.Item style={{ backgroundColor: "#1e212d" }}>
              <h6 className=" text-center text-white btn btn-sm btn-block btn-info">
                Actions
              </h6>
            </ListGroup.Item>
            <ListGroup.Item
              style={{ backgroundColor: "#1e212d", color: "#eeeeee" }}
            >
              <Link to={`/admin/edit/profile/${adminInfo.result.adminID}`}>
                <h6 style={{ textTransform: "Capitalize", color: "#eeeeee" }}>
                  <EditTwoToneIcon />
                  :&nbsp;&nbsp;Edit Profile
                </h6>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item
              style={{ backgroundColor: "#1e212d", color: "#eeeeee" }}
            >
              <h6 style={{ textTransform: "capitalize" }}>
                {status === "Not Published" && (
                  <button
                    className="btn btn-sm btn-success "
                    onClick={publishResult}
                    style={{ width: "155px" }}
                  >
                    Publish Results
                  </button>
                )}
                {status === "Published" && (
                  <>
                    <button
                      className="btn btn-sm btn-warning mr-5"
                      onClick={publishResult}
                      style={{ width: "81px" }}
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
              </h6>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default AdminProfile;
