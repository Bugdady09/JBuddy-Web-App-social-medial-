import "./Profile.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

function ProfileImageCover(props) {
  const [userProfileInfo, setUserProfileInfo] = useState([]);
  const [image, setimage] = useState("");
  const { id } = JSON.parse(localStorage.getItem("userinfo"));

  const onsubmitPostProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("u_id", id);
    if (image) {
      let userResponse = await axios.post(
        "http://127.0.0.1:8000/api/profilePic",
        formData
      );
      setUserProfileInfo(userResponse.data.user);
      swal({
        text: "You profile image uploaded successfully",
        icon: "success",
        button: "OK",
      });
    } else {
      swal({
        text: "Insert an image for upload",
        icon: "warning",
        buttons: "OK",
        dangerMode: true,
      });
    }
  };

  const onsubmitPostCover = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("u_id", id);
    if (image) {
      let userResponse = await axios.post(
        "http://127.0.0.1:8000/api/coverPic",
        formData
      );
      setUserProfileInfo(userResponse.data.user);
      swal({
        text: "You Cover image uploaded successfully",
        icon: "success",
        button: "OK",
      });
    } else {
      swal({
        text: "Insert an image for upload",
        icon: "warning",
        buttons: "OK",
        dangerMode: true,
      });
    }
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/b_users/${id}`)
      .then(function (response) {
        setUserProfileInfo(response.data.user);
        // if (response.data.success === true) {
        //   setAvailabel(true);
        // } else {
        //   setAvailabel(false);
        // }
        // console.log(posts);
        // console.log(response.data.success);
      });
  }, []);

  return (
    <>
      <div className="shadow-lg bg-white p-3 mb-5 rounded mt-4">
        <div className="image-cover-profile-flex">
          <img
            src={`http://127.0.0.1:8000/storage/uploadImages/${userProfileInfo.cover_image}`}
            alt=""
            className="image-cover"
          />
          <img
            src={`http://127.0.0.1:8000/storage/uploadImages/${userProfileInfo.profile_image}`}
            alt=""
            className="image-profile"
          />
        </div>
        <div className="p-2 text-dark">
          <h2>{userProfileInfo.name}</h2>
        </div>
      </div>
      <div className="shadow-lg bg-white text-dark p-3 mb-5 rounded">
        <Row>
          <Col>
            <Form.Group controlId="formFileSm">
              <Form.Label>Add a photo for upload</Form.Label>
              <Form.Control
                onChange={(e) => setimage(e.target.files[0])}
                name="image"
                type="file"
                size="sm"
                className="mb-3 border rounded"
              />
            </Form.Group>
          </Col>
          <Col className="d-flex">
            <Form.Group className="ml-auto">
              <Form.Label>Choose Action</Form.Label> <br />
              <Button
                onClick={onsubmitPostProfile}
                variant="outline-success"
                type="submit"
                className="mr-5"
              >
                Profile
              </Button>
              <Button
                onClick={onsubmitPostCover}
                variant="outline-success"
                type="submit"
                className="mr-3"
              >
                Cover
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ProfileImageCover;
