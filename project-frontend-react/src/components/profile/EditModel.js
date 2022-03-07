import React, { useState } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function EditModel(props) {
  const { postData, setAllData } = props;
  //console.log(postData);
  const [post, setPost] = useState("");
  const [image, setimage] = useState("");
  const { id } = JSON.parse(localStorage.getItem("userinfo"));

  const onsubmitPostFrom = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("post", post);
    formData.append("image", image);
    formData.append("post_id", postData.id);
    formData.append("u_id", id);
    //return console.log(formData);
    // //console.log(post);
    // console.log("image is : ", image);
    // //console.log(id);
    // //return console.log(formData);
    // //formData.append("id", postData.id);
    // //return console.log(formData);
    if (post.trim() || image) {
      let userResponse = await axios.post(
        `http://127.0.0.1:8000/api/postUpdate`,
        formData
      );
      //console.log("rsponse data: ", userResponse.data.posts);
      console.log("rsponse data post: ", userResponse);
      //props.setdata(userResponse.data.posts);
      setAllData(userResponse.data.posts);
      sweetalertresponse("You post updated successfully", "success");
      setPost("");
      setimage("");
      props.onHide();
    } else {
      sweetalertresponse("You did not change anything to upload", "success");
      //console.log("nothind to post");
    }
  };

  const sweetalertresponse = (message, alertType) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: alertType,
      title: message,
      background: "#d8e2dc",
    });
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-secondary">Edit your post</Modal.Title>
      </Modal.Header>
      <div className="shadow-lg bg-white text-dark p-3 mb-5 rounded">
        <Form.Control
          defaultValue={postData.post}
          // value={post}
          onChange={(e) => setPost(e.target.value)}
          name="post"
          as="textarea"
          rows={2}
          placeholder="What's on your mind..."
        />
        <Row>
          <Col>
            <Form.Group controlId="formFileSm">
              <Form.Label>Add photo</Form.Label>
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
              <br />
              <Button variant="outline-success" onClick={onsubmitPostFrom}>
                Buddy Post
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </div>

      <Button onClick={props.onHide}>Close</Button>
    </Modal>
  );
}

export default EditModel;
