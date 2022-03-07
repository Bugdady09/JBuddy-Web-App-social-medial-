import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";

function MakePosts(props) {
  const [post, setPost] = useState("");
  const [image, setimage] = useState("");

  const { id } = JSON.parse(localStorage.getItem("userinfo"));

  const onsubmitPostFrom = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("post", post);
    formData.append("image", image);
    formData.append("u_id", id);

    if (post.trim() || image) {
      let userResponse = await axios.post(
        "http://127.0.0.1:8000/api/b_posts",
        formData
      );
      props.setdata(userResponse.data.posts);
      swal({
        text: "You post uploaded successfully",
        icon: "success",
        button: "OK",
      });

      setPost("");
    } else {
      swal({
        text: "Write a post or Choose an image for upload",
        icon: "warning",
        buttons: "OK",
        dangerMode: true,
      });
      //console.log("nothind to post");
    }
  };

  return (
    <div>
      <div className="shadow-lg bg-white text-dark p-3 mb-5 rounded">
        <form onSubmit={onsubmitPostFrom}>
          <Form.Control
            value={post}
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
                <Button variant="outline-success" type="submit">
                  Buddy Post
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </form>
      </div>
    </div>
  );
}

export default MakePosts;
