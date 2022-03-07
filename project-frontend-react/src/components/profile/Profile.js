import React, { useState, useEffect, useContext } from "react";
import "./Profile.css";
import { Row, Col, Dropdown, Card } from "react-bootstrap";
import axios from "axios";
import MakePosts from "./MakePosts";
import AllComments from "../comments/AllComments";
import ProfileImageCover from "./ProfileImageCover";
import Swal from "sweetalert2";
import { UserContext } from "../context/UseContext";
import { useHistory } from "react-router-dom";
import EditModel from "./EditModel";

function Profile(props) {
  const { isLogin } = useContext(UserContext);
  const [modalShow, setModalShow] = React.useState(false);
  let history = useHistory();
  if (!isLogin) {
    history.push("/signin");
  }

  const [posts, setPosts] = useState([]);
  const [available, setAvailabel] = useState(false);
  const [editpost, seteditpost] = useState("");

  const { id } = JSON.parse(localStorage.getItem("userinfo"));

  const setAllData = (data) => {
    setPosts(data);
  };

  useEffect(() => {
    if (!isLogin) {
      history.push("/signin");
    }
    axios
      .get(`http://127.0.0.1:8000/api/b_posts/${id}`)
      .then(function (response) {
        //console.log("image data", response.data.posts[0].profile_image);
        // console.log("profile data : ", response.data.posts);
        setPosts(response.data.posts);
        if (response.data.success === true) {
          setAvailabel(true);
        } else {
          setAvailabel(false);
        }
        //console.log(posts);
        // console.log(response.data.success);
      });
  }, []);

  const setModalShowhamdler = (post) => {
    setModalShow(true);
    seteditpost(post);
  };

  const deletePosthandler = async (id) => {
    Swal.fire({
      title: "Do you want to remove the post?",
      showDenyButton: true,
      confirmButtonText: `Remove`,
    }).then((result) => {
      //if want to delete the post then fire
      if (result.isConfirmed) {
        axios
          .delete(`http://127.0.0.1:8000/api/postUpdate/${id}`)
          .then(function (response) {
            setPosts(response.data.posts);
            //show tost message
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
              icon: "success",
              title: "Your post deleted",
              background: "#d8e2dc",
            });
          });
      }
    });
  };

  return (
    <div className="container">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          {/* cover profile , profile name  */}

          {/* image upload section */}
          <ProfileImageCover />

          {/* Create posts */}
          <MakePosts setdata={setAllData} />

          {/* own posts profile */}
          {available &&
            posts.map((post) => (
              <Card className="text-dark mb-4" key={post.id}>
                {post.share_Name && (
                  <Card.Header className="bg-secondary text-white">
                    <p className=" d-flex align-items-center ml-3 mr-3 pt-4">
                      <h5 className="ml-3 mr-3 pt-1">{post.name}</h5>
                      shared a post of{" "}
                      <h5 className="text-light rounded bg-dark p-2 ml-2">
                        {" "}
                        {post.share_Name}{" "}
                      </h5>
                    </p>
                  </Card.Header>
                )}
                <Card.Header>
                  <div className="d-flex align-items-center">
                    {!post.profile_image && (
                      <i className="fa fa-user img-icon"></i>
                    )}
                    {post.profile_image && (
                      <img
                        src={`http://127.0.0.1:8000/storage/uploadImages/${post.profile_image}`}
                        alt=""
                        className="img-icon"
                      />
                    )}
                    <h5 className="ml-3 mr-3 pt-1">{post.name}</h5>
                    <p className="ml-auto mt-3">
                      {new Date(post.created_at).toLocaleTimeString("en-GB", {
                        hour12: true,
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      |{" "}
                      {new Date(post.created_at).toLocaleDateString("en-GB", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                    <Dropdown className="ml-auto mt-3 mr-4">
                      <Dropdown.Toggle></Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => setModalShowhamdler(post)}
                        >
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => deletePosthandler(post.id)}
                        >
                          Remove
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Card.Text className="post-text-size">{post.post}</Card.Text>
                  {post.img && (
                    <img
                      src={`http://127.0.0.1:8000/storage/uploadImages/${post.img}`}
                      alt=""
                      className="post-image-home rounded"
                    />
                  )}
                  {/* add comment section */}
                  <AllComments
                    post_id={post.id}
                    share={post.share}
                    setAllData={setAllData}
                  />
                </Card.Body>
              </Card>
            ))}
        </Col>
      </Row>
      {/* show model for edit post */}
      <EditModel
        show={modalShow}
        onHide={() => setModalShow(false)}
        postData={editpost}
        setAllData={setAllData}
      />
    </div>
  );
}

export default Profile;
